import { borrar_tempo, guardar_tempo, listar_tempos } from "../../util/almacenamiento.js";
import { crear_botón } from "../../util/elementos.js";
import { cargar_editor } from "../editor/editor.js";
import { cargar_vista } from "../vista.js";

export function cargar_botones_tablero() {
	if (!estar_cargado_botones_tablero()) {
		const botones = document.getElementById("botones");
		botones.appendChild(cargar_botón_cargar_tempo());
		botones.appendChild(cargar_botón_descargar_todo());
		botones.appendChild(cargar_botón_borrar_todo());
	}
}

function cargar_botón_cargar_tempo() {
	const botón = crear_botón_cargar_tempo();
	botón.addEventListener("click", () =>
		abrir_ventana_de_subida());
	return botón;
}

function crear_botón_cargar_tempo() {
	return crear_botón("cargar_tempo", "Cargar Tempo");
}

function cargar_botón_subida() {
	const entrada = document.createElement("input");
	entrada.type = "file";
	entrada.accept = ".json";
	entrada.multiple = true;
	return entrada;
}

function abrir_ventana_de_subida() {
	const subida = cargar_botón_subida();
	subida.click();
	subida.addEventListener("change", archivos =>
		almacenar_archivos(archivos.target.files));
}

function almacenar_archivos(archivos) {
	for (let i = 0; i < archivos.length; i++)
		archivos[i].text().then(texto =>
			guardar_tempo(JSON.parse(texto)));
}

function cargar_botón_descargar_todo() {
	const botón = crear_botón("descargar_todo", "Descargar Todo");
	botón.addEventListener("click", () =>
		listar_tempos().then(lista => {
			for (let i = 0; i < lista.length; i++)
				descargar_objeto(JSON.stringify(lista[i]), lista[i].nombre);
		}));
	return botón;
}

function cargar_botón_borrar_todo() {
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