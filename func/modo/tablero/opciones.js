import { borrar_tempo } from "../../util/almacenamiento.js";
import { cargar_editor } from "../editor/cargador.js";
import { cargar_vista } from "../vista/cargador.js";

export function crear_botones(tempo, elemento) {
	const opciones = document.createElement("div");
	opciones.classList.add("opciones_tempo");
	opciones.appendChild(crear_editar(tempo));
	opciones.appendChild(crear_borrar(tempo, elemento));
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

function crear_borrar(tempo, elemento) {
	const borrar = document.createElement("div");
	borrar.classList.add("eliminar");
	borrar.innerHTML = "<i class=\"fa-solid fa-trash-can\"></i>";
	borrar.addEventListener("click", () => {
		if (confirmar(tempo))
			elemento.remove();
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
		return true;
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

function ocultar_ocultador() {
	const ocultador = document.getElementById("ocultador");
	ocultador.classList.add("oculto");
}