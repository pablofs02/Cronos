import { cargar_editor } from "../editor/editor.js";
import { listar_tempos, guardar_tempo, borrar_tempo } from "../../util/almacenamiento.js";
import { mostrar_info } from "../../ventanas/info.js";
import { cargar_vista } from "../vista.js";
import { cargar_botones_tablero, crear_botones, traducir_botones } from "./botones.js";
import { crear_div } from "../../util/elementos.js";

export function cargar_tablero() {
	sessionStorage.setItem("modo", "tablero");
	cargar_tablero_en_panel();
	cargar_botones_tablero();
	definir_cargar_archivo();
	poner_tempos_en_tablero();
	escuchar_ventana();
}

function poner_tempos_en_tablero() {
	const tablero = document.getElementById("tablero").children;
	if (!tablero.length)
		listar_tempos().then(lista => {
			if (lista.length)
				colocar_lista(lista);
			else {
				colocar_vacío();
				const tablero = document.getElementById("tablero");
				tablero.classList.add("tablero_vacío");
			}
		});
}

function cargar_tablero_en_panel() {
	if (!estar_cargado_tablero_en_panel()) {
		limpiar_panel();
		const panel = document.getElementById("panel");
		panel.appendChild(crear_div("tablero"));
	}
}

function limpiar_panel() {
	document.getElementById("panel").children[1].remove();
	const botones = document.getElementById("botones");
	while (botones.firstChild)
		botones.firstChild.remove();
}

export function traducir_tablero(tablero) {
	traducir_botones(tablero.botones);
}

function escuchar_ventana() {
	const ocultador = document.getElementById("ocultador");
	window.addEventListener("resize", () => {
		ajustar_imágenes();
		ocultador.classList.add("oculto");
		document.getElementById("info").classList.add("oculto");
		if (window.innerHeight > 600)
			hacer_rejilla();
		else
			deshacer_rejilla();
	});
}

function colocar_vacío() {
	const tablero = document.getElementById("tablero");
	const contenedor = document.createElement("div");
	contenedor.classList.add("sin_tempos");
	const icono = document.createElement("div");
	icono.innerHTML = "<i class=\"fa-solid fa-circle-xmark\"></i>";
	contenedor.appendChild(icono);
	const texto = document.createElement("div");
	texto.textContent = "No tienes ningún tempo almacenado.";
	contenedor.appendChild(texto);
	tablero.appendChild(contenedor);
}

function deshacer_rejilla() {
	const lista = document.querySelectorAll(".elemento_tablero");
	for (let i = 0; i < lista.length; i++)
		lista[i].lastChild.style.display = "none";
}

function hacer_rejilla() {
	const lista = document.querySelectorAll(".elemento_tablero");
	for (let i = 0; i < lista.length; i++)
		lista[i].lastChild.style.display = "grid";
}

function definir_cargar_archivo() {
	const cargar = document.getElementById("cargar_real");
	document.getElementById("cargar_tempo").addEventListener("click", () =>
		cargar.click());
	cargar.addEventListener("change", archivos => {
		almacenar_archivos(archivos.target.files);
		location.reload();
	});
}

function colocar_lista(lista) {
	if (lista) {
		const tablero = document.getElementById("tablero");
		const fragmento = document.createDocumentFragment();
		for (let i = 0; i < lista.length; i++) {
			const tempo = lista[i];
			const nodo = crear_elemento(tempo);

			const opciones = crear_opciones(tempo);
			nodo.appendChild(opciones);

			nodo.children[0].addEventListener("click", () =>
				mostrar_info(tempo));
			nodo.children[1].addEventListener("click", () =>
				mostrar_info(tempo));

			fragmento.appendChild(nodo);
		}
		tablero.appendChild(fragmento);

		ajustar_imágenes();
	}
}

function crear_opciones(tempo) {
	const fragmento = document.createDocumentFragment();
	const botones = crear_botones(tempo);
	fragmento.appendChild(crear_desplegable(botones));
	fragmento.appendChild(botones);
	return fragmento;
}

function crear_desplegable(botones) {
	const ocultador = document.getElementById("ocultador");
	const contenedor = document.createElement("div");
	contenedor.classList.add("contenedor_desplegable_tempo");
	const desplegable = document.createElement("div");
	desplegable.innerHTML = "<i class=\"fa-solid fa-ellipsis-vertical\"></i>";
	desplegable.classList.add("desplegable_tempo");
	contenedor.addEventListener("click", () => {
		ocultador.classList.remove("oculto");
		botones.style.display = "flex";
	});
	ocultador.addEventListener("click", () => {
		if (window.innerHeight < 600) {
			botones.style.display = "none";
			ocultador.classList.add("oculto");
		}
	});
	contenedor.appendChild(desplegable);
	return contenedor;
}

function crear_elemento(tempo) {
	const nodo = document.createElement("div");
	nodo.classList.add("elemento_tablero");
	nodo.appendChild(crear_imagen(tempo));
	nodo.appendChild(crear_texto(tempo));
	return nodo;
}

function crear_imagen(tempo) {
	const imagen = document.createElement("img");
	if (tempo.imagen)
		imagen.setAttribute("src", tempo.imagen);
	else
		imagen.setAttribute("src", "archivos/logo.png");
	imagen.setAttribute("alt", "Imagen del tempo " + tempo.nombre);
	return imagen;
}

function crear_texto(tempo) {
	const texto = document.createElement("div");
	texto.classList.add("texto_tempo");
	texto.appendChild(crear_título(tempo));
	texto.appendChild(crear_comentario(tempo));
	return texto;
}

function crear_título(tempo) {
	const título = document.createElement("h3");
	título.textContent = tempo.nombre;
	return título;
}

function crear_comentario(tempo) {
	const comentario = document.createElement("p");
	comentario.textContent = tempo.comentario;
	return comentario;
}

function ajustar_imágenes() {
	const elemento = document.querySelectorAll(".elemento_tablero");
	for (let i = 0; i < elemento.length; i++) {
		const imagen = elemento[i].firstChild;
		const altura = imagen.clientHeight;
		imagen.style.width = altura + "px";
	}
}

function editar_tempo(tempo) {
	sessionStorage.setItem("tempo", tempo.nombre);
	cargar_editor();
}

function confirmar(tempo) {
	if (confirm("¿Estás seguro de que deseas borrarlo?")) {
		borrar_tempo(tempo);
		location.reload();
	}
}

function ver_tempo(tempo) {
	sessionStorage.setItem("tempo", tempo.nombre);
	cargar_vista();
}

function almacenar_archivos(archivos) {
	for (let i = 0; i < archivos.length; i++)
		archivos[i].text().then(texto =>
			guardar_tempo(JSON.parse(texto)));
}

function descargar_objeto(objeto, nombre) {
	const element = document.createElement("a");
	element.setAttribute("href", "data:text/plain," + encodeURIComponent(objeto));
	element.setAttribute("download", nombre + ".json");
	element.click();
}

function borrar_todo(lista) {
	for (let i = 0; i < lista.length; i++)
		borrar_tempo(lista[i]);
}

function estar_cargado_tablero_en_panel() {
	return document.getElementById("tablero");
}