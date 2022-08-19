import { cargar_editor } from "../editor/editor.js";

export function cargar_botones_vista() {
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