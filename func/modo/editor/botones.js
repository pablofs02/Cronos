import { tomar_tempo } from "../../util/almacenamiento.js";
import { mostrar_ventana_tempo } from "../../util/cabecera.js";
import { crear_botón } from "../../util/elementos.js";
import { modificar_ventana } from "../../ventanas/formulario.js";
import { cerrar_ventanas, mostrar_ventana_evento, mostrar_ventana_periodo } from "./ventanas.js";

export function cargar_botones_editor() {
	if (!estar_cargado_botones_editor()) {
		limpiar_botones();
		const botones = document.getElementById("botones");
		botones.appendChild(cargar_botón_añadir_periodo());
		botones.appendChild(cargar_botón_añadir_evento());
		botones.appendChild(cargar_botón_editar_info_tempo());
	}
}

function limpiar_botones() {
	const botones = document.getElementById("botones");
	while (botones.firstChild)
		botones.firstChild.remove();
}

export function traducir_botones(botones) {
	const añadir_periodo = document.getElementById("añadir_periodo");
	añadir_periodo.textContent = botones.periodo;
	const añadir_evento = document.getElementById("añadir_evento");
	añadir_evento.textContent = botones.evento;
	const editar_tempo = document.getElementById("editar_tempo");
	editar_tempo.textContent = botones.tempo;
}

function cargar_botón_añadir_periodo() {
	const botón = crear_botón("añadir_periodo", "Crear Periodo");
	botón.addEventListener("click", () =>
		abrir_ventana_añadir_periodo());
	return botón;
}

function abrir_ventana_añadir_periodo() {
	cerrar_ventanas();
	modificar_ventana("periodo", { título: "Nuevo Periodo" });
	mostrar_ventana_periodo();
}

function cargar_botón_añadir_evento() {
	const botón = crear_botón("añadir_evento", "Crear Evento");
	botón.addEventListener("click", () =>
		abrir_ventana_añadir_evento());
	return botón;
}

function abrir_ventana_añadir_evento() {
	cerrar_ventanas();
	modificar_ventana("evento", { título: "Nuevo Evento" });
	mostrar_ventana_evento();
}

function cargar_botón_editar_info_tempo() {
	const botón = crear_botón("editar_tempo", "Editar Tempo");
	botón.addEventListener("click", () =>
		abrir_ventana_editar_info_tempo());
	return botón;
}

function abrir_ventana_editar_info_tempo() {
	if (document.getElementById("tempo").classList.contains("oculto"))
		cerrar_ventanas();
	tomar_tempo(sessionStorage.getItem("tempo")).then(tempo => {
		modificar_ventana("tempo", { título: "Editar Tempo", info: { nombre: tempo.nombre, comentario: tempo.comentario } });
		mostrar_ventana_tempo();
		document.getElementById("tempo").classList.add("editando");
	});
}

function estar_cargado_botones_editor() {
	return document.getElementById("añadir_periodo");
}