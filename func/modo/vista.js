import { cargar_visor, cargar_en_visualizador } from "../visor/visor.js";
import { tomar_tempo } from "../util/almacenamiento.js";

const base = "Cronos";
const tabla = "Tempos";

export function cargar_vista() {
	if (!estar_cargado_visor_en_panel()) {
		cargar_visor();
		cargar_botones_vista();
	} else if (!estar_cargado_botones_vista())
		cargar_botones_vista();
	configurar_vista();
}

function configurar_vista() {
	cargar_tempo();
	escuchar_botones();
}

function estar_cargado_visor_en_panel() {
	return document.getElementById("visor");
}

function estar_cargado_botones_vista() {
	return document.getElementById("modo_editor");
}

function cargar_botones_vista() {
	const nodo = document.getElementById("botones");
	nodo.appendChild(cargar_bot_editar());
}

function cargar_bot_editar() {
	const nodo = document.createElement("button");
	nodo.classList.add("botón");
	nodo.id = "modo_editor";
	nodo.textContent = "Editar";
	return nodo;
}

export function cargar_tempo() {
	const nombre_tempo = sessionStorage.getItem("tempo");
	tomar_tempo(base, tabla, nombre_tempo).then((tempo) => {
		cargar_en_visualizador(tempo);
	});
	escuchar_botones();
}

function escuchar_botones() {
	const editar = document.getElementById("modo_editor");
	editar.addEventListener("click", () =>
		location.assign("editar.html"));
}