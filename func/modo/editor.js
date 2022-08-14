import { cargar_visor, cargar_en_visualizador } from "../visor/visor.js";
import { guardar_tempo, tomar_tempo } from "../util/almacenamiento.js";
import { modificar_ventana } from "../ventanas/formulario.js";

let tempo = {};
let elemento;

export function cargar_editor() {
	sessionStorage.setItem("modo", "editor");
	if (!estar_cargado_visor_en_panel())
		cargar_editor_en_panel();
	else if (!estar_cargado_botones_editor())
		cargar_botones_editor();
	configurar_editor();
}

function cargar_editor_en_panel() {
	cargar_visor();
	cargar_botones_editor();
}

function estar_cargado_botones_editor() {
	return document.getElementById("añadir_periodo");
}

function cargar_botones_editor() {
	limpiar_botones();
	const botones = document.getElementById("botones");
	botones.appendChild(cargar_bot_periodo());
	botones.appendChild(cargar_bot_evento());
	botones.appendChild(cargar_bot_tempo());
}

function estar_cargado_visor_en_panel() {
	return document.getElementById("visor");
}

function limpiar_botones() {
	const botones = document.getElementById("botones");
	while (botones.firstChild)
		botones.firstChild.remove();
}

function cargar_bot_periodo() {
	const nodo = document.createElement("button");
	nodo.classList.add("botón");
	nodo.id = "añadir_periodo";
	nodo.textContent = "Crear Periodo";
	return nodo;
}

function cargar_bot_evento() {
	const nodo = document.createElement("button");
	nodo.classList.add("botón");
	nodo.id = "añadir_evento";
	nodo.textContent = "Crear Evento";
	return nodo;
}

function cargar_bot_tempo() {
	const nodo = document.createElement("button");
	nodo.classList.add("botón");
	nodo.id = "editar_tempo";
	nodo.textContent = "Editar Tempo";
	return nodo;
}

export function configurar_editor() {
	cargar_tempo();
	setTimeout(() => {
		escuchar_elementos();
	}, 200);
	escuchar_formularios();
	escuchar_formulario_tempo();
}

export function en_años(fecha) {
	let tiempo = fecha.año;
	if (fecha.mes)
		tiempo += Number(fecha.mes / 12);
	if (fecha.día)
		tiempo += Number(fecha.día / 365);
	return tiempo;
}

export function traducir_editor(editor) {
	traducir_botones(editor.botones);
}

function traducir_botones(botones) {
	const añadir_periodo = document.getElementById("añadir_periodo");
	añadir_periodo.textContent = botones.periodo;
	const añadir_evento = document.getElementById("añadir_evento");
	añadir_evento.textContent = botones.evento;
	const editar_tempo = document.getElementById("editar_tempo");
	editar_tempo.textContent = botones.tempo;
}

function escuchar_formularios() {
	escuchar_formulario_periodo();
	escuchar_formulario_evento();
}

function escuchar_formulario_periodo() {
	const botón_nuevo_periodo = document.getElementById("añadir_periodo");
	const formulario_periodo = document.getElementById("formulario_periodo");
	const cerrar_periodo = document.getElementById("cerrar_periodo");

	formulario_periodo.addEventListener("submit", (e) => {
		e.preventDefault();
		const periodo = crear_periodo(e);
		if (en_años(periodo.fin) > en_años(periodo.inicio)) {
			tempo.periodos.push(periodo);
			cargar_en_visualizador(tempo);
			if (editando_periodo())
				borrar_periodo_anterior();
			guardar_tempo(tempo);
			setTimeout(() => {
				location.reload();
			}, 200);
			restablecer_periodo();
		} else
			alert("¡El fin del periodo no puede se anterior al inicio!");
	});

	botón_nuevo_periodo.addEventListener("click", () => {
		cerrar_ventanas();
		modificar_ventana("periodo", { título: "Nuevo Periodo" });
		mostrar_ventana_periodo();
	});

	cerrar_periodo.addEventListener("click", () => {
		ocultar_ventana_periodo();
		restablecer_periodo();
	});
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

function escuchar_formulario_evento() {
	const botón_nuevo_evento = document.getElementById("añadir_evento");
	const formulario_evento = document.getElementById("formulario_evento");
	const cerrar_evento = document.getElementById("cerrar_evento");

	formulario_evento.addEventListener("submit", (e) => {
		e.preventDefault();
		const evento = crear_evento(e);
		tempo.eventos.push(evento);
		cargar_en_visualizador(tempo);
		if (editando_evento())
			borrar_evento_anterior();
		guardar_tempo(tempo);
		setTimeout(() => {
			location.reload();
		}, 200);
		restablecer_evento();
	});

	botón_nuevo_evento.addEventListener("click", () => {
		cerrar_ventanas();
		modificar_ventana("evento", { título: "Nuevo Evento" });
		mostrar_ventana_evento();
	});

	cerrar_evento.addEventListener("click", () => {
		ocultar_ventana_evento();
		restablecer_evento();
	});
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

function escuchar_formulario_tempo() {
	const botón_editar_tempo = document.getElementById("editar_tempo");
	botón_editar_tempo.addEventListener("click", () => {
		tomar_tempo(sessionStorage.getItem("tempo")).then(tempo => {
			modificar_ventana("tempo", { título: "Editar Tempo", info: { nombre: tempo.nombre, comentario: tempo.comentario } });
			const ventana_tempo = document.getElementById("tempo");
			ventana_tempo.classList.add("editando");
			ventana_tempo.classList.remove("oculto");
		});
	});
}

function cerrar_ventanas() {
	ocultar_ventanas();
	restablecer();
}

function restablecer() {
	restablecer_periodo();
	restablecer_evento();
}

function mostrar_ventana_periodo() {
	const ventana_periodo = document.getElementById("periodo");
	ventana_periodo.classList.remove("oculto");
}

function mostrar_ventana_evento() {
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

function restablecer_periodo() {
	const formulario_periodo = document.getElementById("formulario_periodo");
	formulario_periodo.reset();
}

function restablecer_evento() {
	const formulario_evento = document.getElementById("formulario_evento");
	formulario_evento.reset();
}

function cargar_tempo() {
	if (sessionStorage.getItem("tempo")) {
		tomar_tempo(sessionStorage.getItem("tempo")).then(tempo_almacenado => {
			tempo = tempo_almacenado;
			cargar_en_visualizador(tempo);
		});
	} else
		throw new Error("No hay ningún tempo seleccionado para editar.");
}

function escuchar_elementos() {
	escuchar_periodos();
	escuchar_eventos();
}

function escuchar_periodos() {
	const nodo_periodos = document.getElementById("periodos").children;
	const periodos = tempo.periodos;
	for (let i = 0; i < nodo_periodos.length; i++)
		escuchar_periodo(nodo_periodos[i], periodos[i]);
}

function escuchar_periodo(nodo, periodo) {
	nodo.addEventListener("click", () =>
		editar_periodo(periodo));
}

function escuchar_eventos() {
	const nodo_eventos = document.getElementById("eventos").children;
	const eventos = tempo.eventos;
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
	const periodos = tempo.periodos;
	const posición = periodos.indexOf(elemento);
	tempo.periodos = periodos.slice(0, posición).concat(periodos.slice(posición + 1));
}

function borrar_evento_anterior() {
	const eventos = tempo.eventos;
	const posición = eventos.indexOf(elemento);
	tempo.periodos = eventos.slice(0, posición).concat(eventos.slice(posición + 1));
}