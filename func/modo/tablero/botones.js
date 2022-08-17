import { listar_tempos } from "../../util/almacenamiento.js";
import { crear_botón } from "../../util/elementos.js";

export function cargar_botones_tablero() {
	if (!estar_cargado_botones_tablero()) {
		const botones = document.getElementById("botones");
		botones.appendChild(crear_botón_cargar_tempo());
		botones.appendChild(crear_botón_descargar_todo());
		botones.appendChild(crear_botón_borrar_todo());
	}
}

function crear_botón_cargar_tempo() {
	const fragmento = document.createDocumentFragment();
	fragmento.appendChild(crear_botón_cargar_falso());
	fragmento.appendChild(crear_botón_cargar_real());
	return fragmento;
}

function crear_botón_cargar_falso() {
	return crear_botón("cargar_tempo", "Cargar Tempo");
}

function crear_botón_cargar_real() {
	const entrada = document.createElement("input");
	entrada.id = "cargar_real";
	entrada.classList.add("oculto");
	entrada.type = "file";
	entrada.accept = ".json";
	entrada.multiple = true;
	return entrada;
}

function crear_botón_descargar_todo() {
	const botón = crear_botón("descargar_todo", "Descargar Todo");
	botón.addEventListener("click", () =>
		listar_tempos().then(lista => {
			for (let i = 0; i < lista.length; i++)
				descargar_objeto(JSON.stringify(lista[i]), lista[i].nombre);
		}));
	return botón;
}

function crear_botón_borrar_todo() {
	const botón = crear_botón("borrar_todo", "Borrar Todo");
	botón.addEventListener("click", () =>
		listar_tempos().then(lista =>
			confirmar_todo(lista)));
	return botón;
}

function confirmar_todo(lista) {
	if (confirm("¿Estás seguro de que deseas borrar todos los tempos?"))
		if (confirm("¿De verdad que estás seguro de que deseas borrar TODOS los tempos?")) {
			borrar_todo(lista);
			location.reload();
		}
}

function estar_cargado_botones_tablero() {
	return document.getElementById("cargar_tempo");
}

export function crear_botones(tempo) {
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

export function traducir_botones(botones) {
	const cargar_tempo = document.getElementById("cargar_tempo");
	cargar_tempo.textContent = botones.cargar;
	const descargar_todo = document.getElementById("descargar_todo");
	descargar_todo.textContent = botones.descargar;
	const borrar_todo = document.createElement("borrar_todo");
	borrar_todo.textContent = botones.borrar;
}