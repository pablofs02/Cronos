import { crear_div } from "../util/elementos.js";
import { tomar_tempo } from "../util/almacenamiento.js";
import { escuchar_desplazadores, actualizar_barra_h, cargar_desplazador } from "./partes/desplazador.js";
import { añadir_eventos, añadir_periodos, cargar_mostrador } from "./partes/mostrador.js";
import { cargar_regla } from "./partes/regla.js";
import { cargar_escalador, escala, escuchar_escalador } from "./partes/escalador.js";
import { añadir_margen, definir_límites } from "./posicionador/extremos.js";
import { actualizar_posición, definir_posición, desplazar_elementos } from "./posicionador/horizontal.js";
import { actualizar_longitud, definir_longitud } from "./posicionador/longitud.js";
import { comprobar_altura, definir_altitud } from "./posicionador/vertical.js";

export function cargar_visor() {
	if (!estar_cargado_visor_en_panel()) {
		limpiar_panel();
		const panel = document.getElementById("panel");
		const visor = crear_div("visor");
		visor.appendChild(cargar_mostrador());
		visor.appendChild(cargar_regla());
		visor.appendChild(cargar_desplazador());
		visor.appendChild(cargar_escalador());
		panel.appendChild(visor);

		escuchar_desplazadores();
		escuchar_escalador();
	}
}

function estar_cargado_visor_en_panel() {
	return document.getElementById("visor");
}

function limpiar_panel() {
	document.getElementById("panel").children[1].remove();
	const botones = document.getElementById("botones");
	while (botones.firstChild)
		botones.firstChild.remove();
}

export function configurar_visor() {
	escuchar_escalador();
	escuchar_vestana();
}

export function traducir_visor(visor) {
	traducir_botones(visor.botones);
}

function traducir_botones(botones) {
	const editar_tempo = document.getElementById("editar_tempo");
	editar_tempo.textContent = botones.editor;
}

export function visualizar_tempo(tempo) {
	limpiar_mostrador();
	escuchar_desplazadores();

	if (tempo.periodos.length || tempo.eventos.length) {
		definir_límites(tempo);

		if (tempo.periodos)
			añadir_periodos(tempo.periodos);
		if (tempo.eventos)
			añadir_eventos(tempo.eventos);

		actualizar_visor();
	}
}

export async function cargar_tempo() {
	if (sessionStorage.getItem("tempo")) {
		const tempo = await tomar_tempo(sessionStorage.getItem("tempo"));
		visualizar_tempo(tempo);
		return tempo;
	} else
		throw new Error("No hay ningún tempo seleccionado para editar.");
}

export function actualizar_visor() {
	añadir_margen();
	actualizar_barra_h(escala);
	definir_posición();
	actualizar_posición();
	definir_longitud();
	actualizar_longitud();
	definir_altitud();
	comprobar_altura();
}

function escuchar_vestana() {
	window.addEventListener("resize", () =>
		ajustar_todo());
}

export function ajustar_todo() {
	actualizar_barra_h(escala);
	actualizar_longitud();
	actualizar_posición();
	desplazar_elementos();
	comprobar_altura();
}

function limpiar_mostrador() {
	while (document.getElementById("periodos").firstChild)
		document.getElementById("periodos").firstChild.remove();
	while (document.getElementById("eventos").firstChild)
		document.getElementById("eventos").firstChild.remove();
}