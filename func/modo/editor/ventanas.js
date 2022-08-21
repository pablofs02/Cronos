import { guardar_tempo } from "../../util/almacenamiento.js";
import { en_años } from "../../util/elementos.js";
import { actualizar_límites, actualizar_máximo, actualizar_mínimo, visualizar_tempo } from "../../visor/visor.js";
import { borrar_evento_anterior, borrar_periodo_anterior, crear_evento, crear_periodo, tempo_actual } from "./editor.js";

export function escuchar_ventanas() {
	escuchar_ventana_periodo();
	escuchar_ventana_evento();
}

export function cerrar_ventanas() {
	ocultar_ventanas();
	restablecer();
}

export function mostrar_ventana_periodo() {
	const ventana_periodo = document.getElementById("periodo");
	ventana_periodo.classList.remove("oculto");
}

export function mostrar_ventana_evento() {
	const ventana_evento = document.getElementById("evento");
	ventana_evento.classList.remove("oculto");
}

function ocultar_ventanas() {
	ocultar_ventana_periodo();
	ocultar_ventana_evento();
}

function ocultar_ventana_periodo() {
	const ventana_periodo = document.getElementById("periodo");
	ventana_periodo.classList.add("oculto");
	ventana_periodo.classList.remove("editando");
}

function ocultar_ventana_evento() {
	const ventana_evento = document.getElementById("evento");
	ventana_evento.classList.add("oculto");
	ventana_evento.classList.remove("editando");
}

function restablecer() {
	restablecer_periodo();
	restablecer_evento();
}

function restablecer_periodo() {
	const formulario_periodo = document.getElementById("formulario_periodo");
	formulario_periodo.reset();
}

function restablecer_evento() {
	const formulario_evento = document.getElementById("formulario_evento");
	formulario_evento.reset();
}

function escuchar_ventana_periodo() {
	escuchar_formulario_periodo();
	escuchar_cerrar_periodo();
}

function escuchar_formulario_periodo() {
	const formulario_periodo = document.getElementById("formulario_periodo");
	formulario_periodo.addEventListener("submit", (entrada) => {
		entrada.preventDefault();
		const periodo = crear_periodo(entrada.target);
		if (en_años(periodo.fin) > en_años(periodo.inicio)) {
			tempo_actual.periodos.push(periodo);
			visualizar_tempo(tempo_actual);
			if (editando_periodo())
				borrar_periodo_anterior();
			actualizar_mínimo({ inicio: { año: entrada.target.inicio_año.value, mes: entrada.target.inicio_mes.value, día: entrada.target.inicio_día.value } });
			actualizar_máximo({ fin: { año: entrada.target.fin_año.value, mes: entrada.target.fin_mes.value, día: entrada.target.fin_día.value } });
			guardar_tempo(tempo_actual);
			restablecer_periodo();
		} else
			alert("¡El fin del periodo no puede se anterior al inicio!");
	});
}

function escuchar_cerrar_periodo() {
	const cerrar_periodo = document.getElementById("cerrar_periodo");
	cerrar_periodo.addEventListener("click", () => {
		ocultar_ventana_periodo();
		restablecer_periodo();
	});
}

function escuchar_ventana_evento() {
	escuchar_formulario_evento();
	escuchar_cerrar_evento();
}

function escuchar_formulario_evento() {
	const formulario_evento = document.getElementById("formulario_evento");
	formulario_evento.addEventListener("submit", (entrada) => {
		entrada.preventDefault();
		const evento = crear_evento(entrada.target);
		tempo_actual.eventos.push(evento);
		visualizar_tempo(tempo_actual);
		if (editando_evento())
			borrar_evento_anterior();
		guardar_tempo(tempo_actual);
		restablecer_evento();
	});
}

function escuchar_cerrar_evento() {
	const cerrar_evento = document.getElementById("cerrar_evento");
	cerrar_evento.addEventListener("click", () => {
		ocultar_ventana_evento();
		restablecer_evento();
	});
}

function editando_periodo() {
	return document.getElementById("periodo").classList.contains("editando");
}

function editando_evento() {
	return document.getElementById("evento").classList.contains("editando");
}