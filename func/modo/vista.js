import { cargar_visor, cargar_en_visualizador } from "../visor/visor.js";
import { tomar_tempo } from "../util/almacenamiento.js";

const base = "Cronos";
const tabla = "Tempos";

export function cargar_vista() {
	if (!estar_cargado_visor_en_panel())
		cargar_visor();
	else if (!estar_cargado_botones_vista())
		cargar_botones_vista();
	configurar_vista();
}

function cargar_botones_vista() {
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