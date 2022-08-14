import { cargar_visor, visualizar_tempo_actual } from "../visor/visor.js";
import { cargar_editor } from "./editor.js";

export function cargar_vista() {
	sessionStorage.setItem("modo", "vista");
	cargar_visor();
	cargar_botones_vista();
	visualizar_tempo_actual();
}

function cargar_botones_vista() {
	if (!estar_cargado_botones_vista()) {
		const botones = document.getElementById("botones");
		botones.appendChild(crear_botón_editar());
	}
}

function crear_botón_editar() {
	const botón = document.createElement("button");
	botón.classList.add("botón");
	botón.id = "modo_editor";
	botón.textContent = "Editar";
	botón.addEventListener("click", () =>
		cargar_editor());
	return botón;
}

function estar_cargado_botones_vista() {
	return document.getElementById("modo_editor");
}