import { cargar_visor, cargar_tempo } from "../../visor/visor.js";
import { modificar_ventana } from "../../ventanas/formulario.js";
import { cargar_botones_editor, traducir_botones } from "./botones.js";
import { escuchar_formularios } from "./ventanas.js";

let tempo_actual;
let elemento;

export function cargar_editor() {
	sessionStorage.setItem("modo", "editor");
	cargar_visor();
	cargar_botones_editor();
	escuchar_formularios();
	cargar_tempo().then(tempo_almacenado => {
		tempo_actual = tempo_almacenado;
		escuchar_elementos();
	});
}

export function traducir_editor(editor) {
	traducir_botones(editor.botones);
}

function crear_periodo(e) {
	const periodo = {
		nombre: e.target.nombre.value,
		comentario: e.target.comentario.value,
		inicio: { año: Number(e.target.inicio_año.value) },
		fin: { año: Number(e.target.fin_año.value) },
		grupo: e.target.grupo.value
	};
	if (e.target.inicio_mes.value) {
		periodo.inicio.mes = Number(e.target.inicio_mes.value);
		if (e.target.inicio_día.value)
			periodo.inicio.día = Number(e.target.inicio_día.value);
	}
	if (e.target.fin_mes.value) {
		periodo.fin.mes = Number(e.target.fin_mes.value);
		if (e.target.fin_día.value)
			periodo.fin.día = Number(e.target.fin_día.value);
	}
	if (e.target["inicio-AC"].checked)
		periodo.inicio.año = -periodo.inicio.año;
	if (e.target["fin-AC"].checked)
		periodo.fin.año = -periodo.fin.año;
	return periodo;
}

function crear_evento(e) {
	const evento = {
		nombre: e.target.nombre.value,
		comentario: e.target.comentario.value,
		fecha: { año: Number(e.target.fecha_año.value) },
	};
	if (e.target.fecha_mes.value) {
		periodo.fecha.mes = Number(e.target.fecha_mes.value);
		if (e.target.fecha_día.value)
			periodo.fecha.día = Number(e.target.fecha_día.value);
	}
	if (e.target["fecha-AC"].checked)
		evento.fecha = -evento.fecha;
	return evento;
}

function escuchar_elementos() {
	escuchar_periodos();
	escuchar_eventos();
}

function escuchar_periodos() {
	const nodo_periodos = document.getElementById("periodos").children;
	const periodos = tempo_actual.periodos;
	for (let i = 0; i < nodo_periodos.length; i++)
		escuchar_periodo(nodo_periodos[i], periodos[i]);
}

function escuchar_periodo(nodo, periodo) {
	nodo.addEventListener("click", () =>
		editar_periodo(periodo));
}

function escuchar_eventos() {
	const nodo_eventos = document.getElementById("eventos").children;
	const eventos = tempo_actual.eventos;
	for (let i = 0; i < nodo_eventos.length; i++)
		escuchar_evento(nodo_eventos[i], eventos[i]);
}

function escuchar_evento(nodo, evento) {
	nodo.addEventListener("click", () =>
		editar_evento(evento));
}

function editar_periodo(periodo) {
	modificar_ventana("periodo", { título: "Editando Periodo", info: periodo });
	mostrar_ventana_periodo();
	elemento = periodo;
	document.getElementById("periodo").classList.add("editando");
}

function editar_evento(evento) {
	modificar_ventana("evento", { título: "Editando Evento", info: evento });
	mostrar_ventana_evento();
	elemento = evento;
	document.getElementById("evento").classList.add("editando");
}

function editando_periodo() {
	return document.getElementById("periodo").classList.contains("editando");
}

function editando_evento() {
	return document.getElementById("evento").classList.contains("editando");
}

function borrar_periodo_anterior() {
	const periodos = tempo_actual.periodos;
	const posición = periodos.indexOf(elemento);
	tempo_actual.periodos = periodos.slice(0, posición).concat(periodos.slice(posición + 1));
}

function borrar_evento_anterior() {
	const eventos = tempo_actual.eventos;
	const posición = eventos.indexOf(elemento);
	tempo_actual.periodos = eventos.slice(0, posición).concat(eventos.slice(posición + 1));
}