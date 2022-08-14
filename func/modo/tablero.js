import { cargar_editor } from "./editor.js";
import { listar_tempos, guardar_tempo, borrar_tempo } from "../util/almacenamiento.js";
import { mostrar_info } from "../ventanas/info.js";
import { cargar_vista } from "./vista.js";

const base = "Cronos";
const tabla = "Tempos";

export function cargar_tablero() {
	sessionStorage.setItem("modo", "tablero");
	if (!estar_cargado_tablero_en_panel())
		cargar_tablero_en_panel();
	if (!estar_cargado_botones_tablero())
		cargar_botones_tablero();
	configurar_tablero();
}

function estar_cargado_botones_tablero() {
	return document.getElementById("cargar_tempo");
}

function cargar_botones_tablero() {
	const botones = document.getElementById("botones");
	const periodo = document.createElement("button");
	periodo.id = "cargar_tempo";
	periodo.textContent = "Cargar Tempo";
	periodo.classList.add("botón");
	botones.appendChild(periodo);
	const entrada = document.createElement("input");
	entrada.id = "cargar_real";
	entrada.classList.add("oculto");
	entrada.type = "file";
	entrada.accept = ".json";
	entrada.multiple = true;
	botones.appendChild(entrada);
	const evento = document.createElement("button");
	evento.id = "descargar_todo";
	evento.textContent = "Descargar Todo";
	evento.classList.add("botón");
	botones.appendChild(evento);
	const tempo = document.createElement("button");
	tempo.id = "borrar_todo";
	tempo.textContent = "Borrar Todo";
	tempo.classList.add("botón");
	botones.appendChild(tempo);
}

function cargar_tablero_en_panel() {
	limpiar_panel();
	const panel = document.getElementById("panel");
	const tablero = document.createElement("div");
	tablero.id = "tablero";
	panel.appendChild(tablero);
}

function limpiar_panel() {
	document.getElementById("panel").children[1].remove();
	const botones = document.getElementById("botones");
	while (botones.firstChild)
		botones.firstChild.remove();
}

function estar_cargado_tablero_en_panel() {
	return document.getElementById("tablero");
}

function configurar_tablero() {
	definir_botones_panel();
	listar_tempos(base, tabla).then(lista => {
		if (lista.length)
			colocar_lista(lista);
		else {
			colocar_vacío();
			const tablero = document.getElementById("tablero");
			tablero.classList.add("tablero_vacía");
		}
	});
	escuchar_ventana();
}

export function traducir_tablero(tablero) {
	traducir_botones(tablero.botones);
}

function traducir_botones(botones) {
	const cargar_tempo = document.getElementById("cargar_tempo");
	cargar_tempo.textContent = botones.cargar;
	const descargar_todo = document.getElementById("descargar_todo");
	descargar_todo.textContent = botones.descargar;
	const borrar_todo = document.createElement("borrar_todo");
	borrar_todo.textContent = botones.borrar;
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

function definir_botones_panel() {
	definir_cargar_archivo();
	definir_descargar_todo();
	definir_botón_borrar_todo();
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

function definir_descargar_todo() {
	document.getElementById("descargar_todo").addEventListener("click", () =>
		listar_tempos(base, tabla).then(lista => {
			for (let i = 0; i < lista.length; i++)
				descargar_objeto(JSON.stringify(lista[i]), lista[i].nombre);
		}));
}

function definir_botón_borrar_todo() {
	document.getElementById("borrar_todo").addEventListener("click", () =>
		listar_tempos(base, tabla).then(lista =>
			confirmar_todo(lista)));
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

function crear_botones(tempo) {
	const opciones = document.createElement("div");
	opciones.classList.add("opciones_tempo");
	opciones.appendChild(crear_editar(tempo));
	opciones.appendChild(crear_borrar(tempo));
	opciones.appendChild(crear_ver(tempo));
	opciones.appendChild(crear_descargar(tempo));
	return opciones;
}

function crear_editar(tempo) {
	const editar = document.createElement("div");
	editar.classList.add("editar");
	editar.innerHTML = "<i class=\"fa-solid fa-pen-to-square\"></i>";
	editar.addEventListener("click", () => {
		editar_tempo(tempo);
		ocultar_ocultador();
	});
	return editar;
}

function crear_borrar(tempo) {
	const borrar = document.createElement("div");
	borrar.classList.add("eliminar");
	borrar.innerHTML = "<i class=\"fa-solid fa-trash-can\"></i>";
	borrar.addEventListener("click", () => {
		confirmar(tempo);
		ocultar_ocultador();
	});
	return borrar;
}

function crear_ver(tempo) {
	const ver = document.createElement("div");
	ver.classList.add("ver");
	ver.innerHTML = "<i class=\"fa-solid fa-eye\"></i>";
	ver.addEventListener("click", () => {
		ver_tempo(tempo);
		ocultar_ocultador();
	});
	return ver;
}

function crear_descargar(tempo) {
	const descargar = document.createElement("div");
	descargar.classList.add("descargar");
	descargar.innerHTML = "<i class=\"fa-solid fa-download\"></i>";
	descargar.addEventListener("click", () => {
		descargar_objeto(JSON.stringify(tempo), tempo.nombre);
		ocultar_ocultador();
	});
	return descargar;
}

function ocultar_ocultador() {
	const ocultador = document.getElementById("ocultador");
	ocultador.classList.add("oculto");
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
		borrar_tempo(base, tabla, tempo);
		location.reload();
	}
}

function confirmar_todo(lista) {
	if (confirm("¿Estás seguro de que deseas borrar todos los tempos?"))
		if (confirm("¿De verdad que estás seguro de que deseas borrar TODOS los tempos?")) {
			borrar_todo(lista);
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
			guardar_tempo(base, tabla, JSON.parse(texto)));
}

function descargar_objeto(objeto, nombre) {
	const element = document.createElement("a");
	element.setAttribute("href", "data:text/plain," + encodeURIComponent(objeto));
	element.setAttribute("download", nombre + ".json");
	element.click();
}

function borrar_todo(lista) {
	for (let i = 0; i < lista.length; i++)
		borrar_tempo(base, tabla, lista[i]);
}