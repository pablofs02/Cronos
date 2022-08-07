import { cargar_visualizador } from "../panel/visualizador.js";
import { cambiar_tempo, tomar_tempo } from "../utilidad/almacenamiento.js";
import { crear_ventana, modificar_ventana } from "../utilidad/formulario.js";

const base = "Cronos";
const tabla = "Tempos";
let tempo = {};
let elemento;

export default function configurar_editor() {
	cargar_tempo();
	crear_ventanas();
	setTimeout(() => {
		escuchar_elementos();
	}, 200);
	escuchar_formularios();
}

function escuchar_formularios() {
	const botón_nuevo_periodo = document.getElementById("añadir_periodo");
	const formulario_periodo = document.getElementById("formulario_periodo");
	const cerrar_periodo = document.getElementById("cerrar_periodo");

	const botón_nuevo_evento = document.getElementById("añadir_evento");
	const formulario_evento = document.getElementById("formulario_evento");
	const cerrar_evento = document.getElementById("cerrar_evento");

	formulario_periodo.addEventListener("submit", (e) => {
		e.preventDefault();
		const periodo = {
			nombre: e.target.nombre.value,
			comentario: e.target.comentario.value,
			inicio: e.target.inicio.value,
			fin: e.target.fin.value,
			grupo: e.target.grupo.value
		};
		if (e.target["inicio-AC"].checked)
			periodo.inicio = -periodo.inicio;
		if (e.target["fin-AC"].checked)
			periodo.fin = -periodo.fin;
		if (periodo.inicio < periodo.fin) {
			tempo.periodos.push(periodo);
			cargar_visualizador(tempo);
			if (editando_periodo())
				borrar_periodo_anterior();
			cambiar_tempo(base, tabla, tempo);
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

	formulario_evento.addEventListener("submit", (e) => {
		e.preventDefault();
		const evento = {
			nombre: e.target.nombre.value,
			comentario: e.target.comentario.value,
			fecha: e.target.fecha.value,
		};
		if (e.target["fecha-AC"].checked)
			evento.fecha = -evento.fecha;
		tempo.evento.push(evento);
		cargar_visualizador(tempo);
		if (editando_evento())
			borrar_evento_anterior();
		cambiar_tempo(base, tabla, tempo);
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

const botón_editar_tempo = document.getElementById("editar_tempo");
botón_editar_tempo.addEventListener("click", () => {
	tomar_tempo(base, tabla, sessionStorage.getItem("tempo")).then(tempo => {
		modificar_ventana("tempo", { título: "Editar Tempo", info: { nombre: tempo.nombre, comentario: tempo.comentario } });
		const ventana_tempo = document.getElementById("tempo");
		ventana_tempo.classList.add("editando");
		ventana_tempo.classList.remove("oculto");
	});
});

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
		tomar_tempo(base, tabla, sessionStorage.getItem("tempo")).then(tempo_almacenado => {
			tempo = tempo_almacenado;
			cargar_visualizador(tempo);
		});
	} else
		throw new Error("No hay ningún tempo seleccionado para editar.")
}

function crear_ventanas() {
	const ventana_periodo = {
		id: "periodo",
		título: "Nuevo Periodo",
		info: ["nombre", "comentario", "inicio", "fin", "grupo"]
	};
	document.body.appendChild(crear_ventana(ventana_periodo));

	const ventana_evento = {
		id: "evento",
		título: "Nuevo Evento",
		info: ["nombre", "comentario", "fecha"]
	};
	document.body.appendChild(crear_ventana(ventana_evento));
}

function escuchar_elementos() {
	escuchar_periodos();
	escuchar_eventos();
}

function escuchar_periodos() {
	const nodo_periodos = document.getElementById("periodos").childNodes;
	const periodos = tempo.periodos;
	for (let i = 0; i < nodo_periodos.length; i++)
		escuchar_periodo(nodo_periodos[i], periodos[i]);
}

function escuchar_periodo(nodo, periodo) {
	nodo.addEventListener("click", () =>
		editar_periodo(periodo));
}

function escuchar_eventos() {
	const nodo_eventos = document.getElementById("eventos").childNodes;
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