import { cargar_visor, cargar_en_visualizador } from "../panel/visor.js";
import { tomar_tempo } from "../util/almacenamiento.js";

const base = "Cronos";
const tabla = "Tempos";

export function cargar_vista_en_panel() {
	if (!estar_cargado_visor_en_panel())
		cargar_visor();
	else if (!estar_cargado_botones_vista())
		cargar_botones_vista();
	configurar_vista();
}

export function cargar_vista() {
	const panel = document.getElementById("panel");
	panel.appendChild(cargar_botones());
}

function cargar_botones() {
	const nodo = document.createElement("div");
	nodo.classList.add("botones");
	nodo.appendChild(cargar_bot_editar());
	return nodo;
}

function cargar_bot_editar() {
	const nodo = document.createElement("button");
	nodo.classList.add("botón");
	nodo.id = "editar_tempo";
	nodo.textContent = "Editar Tempo";
	return nodo;
}

export function configurar_visualización() {
	const nombre_tempo = sessionStorage.getItem("tempo");
	tomar_tempo(base, tabla, nombre_tempo).then((tempo) => {
		cargar_en_visualizador(tempo);
	});
	escuchar_botones();
}

function escuchar_botones() {
	const editar = document.getElementById("editar_tempo");
	editar.addEventListener("click", () =>
		location.assign("editar.html"));
}