import { cargar_visor, cargar_tempo, visualizar_tempo } from "../../visor/visor.js";
import { modificar_ventana } from "../../ventanas/formulario.js";
import { cargar_botones_editor, traducir_botones } from "./botones.js";
import { cerrar_ventanas, escuchar_ventanas, mostrar_ventana_evento, mostrar_ventana_periodo } from "./ventanas.js";
import { crear_botón } from "../../util/elementos.js";
import { corregir_extremos, mínimo } from "../../visor/posicionador/extremos.js";

export let tempo_actual;
let elemento;

export function cargar_editor() {
	sessionStorage.setItem("modo", "editor");
	cargar_visor();
	cargar_botones_editor();
	escuchar_ventanas();
	cargar_tempo().then(tempo_almacenado => {
		tempo_actual = tempo_almacenado;
		escuchar_elementos();
	});
}

export function traducir_editor(editor) {
	traducir_botones(editor.botones);
}

export function crear_periodo(info) {
	const periodo = {
		nombre: info.nombre.value,
		comentario: info.comentario.value,
		inicio: { año: Number(info.inicio_año.value) },
		fin: { año: Number(info.fin_año.value) },
		grupo: info.grupo.value
	};
	if (info.inicio_mes.value) {
		periodo.inicio.mes = Number(info.inicio_mes.value);
		if (info.inicio_día.value)
			periodo.inicio.día = Number(info.inicio_día.value);
	}
	if (info.fin_mes.value) {
		periodo.fin.mes = Number(info.fin_mes.value);
		if (info.fin_día.value)
			periodo.fin.día = Number(info.fin_día.value);
	}
	if (info["inicio-AC"].checked)
		periodo.inicio.año = -periodo.inicio.año;
	if (info["fin-AC"].checked)
		periodo.fin.año = -periodo.fin.año;
	return periodo;
}

export function crear_evento(info) {
	const evento = {
		nombre: info.nombre.value,
		comentario: info.comentario.value,
		fecha: { año: Number(info.fecha_año.value) },
	};
	if (info.fecha_mes.value) {
		periodo.fecha.mes = Number(info.fecha_mes.value);
		if (info.fecha_día.value)
			periodo.fecha.día = Number(info.fecha_día.value);
	}
	if (info["fecha-AC"].checked)
		evento.fecha = -evento.fecha;
	return evento;
}

export function escuchar_elementos() {
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
	const eliminar = crear_botón("borrar_periodo", "Eliminar");
	eliminar.addEventListener("click", () =>
		preguntar_si_borrar_periodo());
	document.getElementById("periodo").appendChild(eliminar);
}

function editar_evento(evento) {
	modificar_ventana("evento", { título: "Editando Evento", info: evento });
	mostrar_ventana_evento();
	elemento = evento;
	document.getElementById("evento").classList.add("editando");
}

function preguntar_si_borrar_periodo() {
	if (confirm("¿Seguro que quieres borrar este periodo?"))
		borrar_periodo_actual();
}

export function borrar_periodo_actual() {
	const periodos = tempo_actual.periodos;
	const posición = periodos.indexOf(elemento);
	tempo_actual.periodos = periodos.slice(0, posición).concat(periodos.slice(posición + 1));
	corregir_extremos(elemento);
	visualizar_tempo(tempo_actual);
	escuchar_elementos();
	cerrar_ventanas();
}

export function borrar_evento_actual() {
	const eventos = tempo_actual.eventos;
	const posición = eventos.indexOf(elemento);
	tempo_actual.periodos = eventos.slice(0, posición).concat(eventos.slice(posición + 1));
}