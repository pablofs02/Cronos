import { cargar_visualizador } from "../panel/visualizador.js";
import { tomar_tempo } from "../util/almacenamiento.js";

const base = "Cronos";
const tabla = "Tempos";

export function cargar_editor() {
	cargar_botones();
}

function cargar_botones() {
	const nodo = document.createElement("div");
	nodo.classList.add("botones");
	nodo.appendChild(cargar_bot_editar());
}

function cargar_bot_editar() {
	const nodo = document.createElement("button");
	nodo.classList.add("botón");
	nodo.id = "editar_tempo";
	nodo.textContent = "Editar Tempo";
	return nodo;
}

export default function configurar_visualización() {
	const nombre_tempo = localStorage.getItem("tempo");
	tomar_tempo(base, tabla, nombre_tempo).then((tempo) => {
		cargar_visualizador(tempo);
	});
	escuchar_botones();
}

function escuchar_botones() {
	const editar = document.getElementById("editar_tempo");
	editar.addEventListener("click", () =>
		location.assign("editar.html"));
}