import { cargar_visualizador } from "../panel/visualizador.js";
import { cambiar_tempo, tomar_tempo } from "../utilidad/almacenamiento.js";

const formulario_periodo = document.getElementById("insertar_periodo");
const periodo_nuevo = document.getElementById("añadir_periodo");
const cerrar_periodo = document.getElementById("cerrar_periodo_nuevo");
const nuevo_periodo = document.getElementById("nuevo_periodo");

const formulario_evento = document.getElementById("insertar_evento");
const evento_nuevo = document.getElementById("añadir_evento");
const cerrar_evento = document.getElementById("cerrar_evento_nuevo");
const nuevo_evento = document.getElementById("nuevo_evento");

const base = "Cronos";
const tabla = "Tempos";
let tempo = {};

cargar_tempo();

function cargar_tempo() {
	if (localStorage.getItem("tempo")) {
		tomar_tempo(base, tabla, localStorage.getItem("tempo")).then(tempo_almacenado => {
			tempo = tempo_almacenado;
			cargar_visualizador(tempo);
		});
	} else
		console.error("No hay ningún tempo seleccionado para editar.");
}

formulario_periodo.addEventListener("submit", (e) => {
	e.preventDefault();
	const periodo = {
		nombre: e.target.nombre.value,
		comentario: e.target.comentario.value,
		inicio: e.target.inicio.value,
		fin: e.target.fin.value
	};
	if (e.target["inicio-AC"].checked)
		periodo.inicio = -periodo.inicio;
	if (e.target["fin-AC"].checked)
		periodo.fin = -periodo.fin;
	tempo.periodos.push(periodo);
	cargar_visualizador(tempo);
	cambiar_tempo(base, tabla, tempo);
	formulario_periodo.reset();
});

periodo_nuevo.addEventListener("click", () => {
	cerrar_ventanas();
	nuevo_periodo.classList.remove("oculto");
});

cerrar_periodo.addEventListener("click", () => {
	nuevo_periodo.classList.add("oculto");
	formulario_periodo.reset();
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
	cambiar_tempo(base, tabla, tempo);
	formulario_evento.reset();
});

evento_nuevo.addEventListener("click", () => {
	cerrar_ventanas();
	nuevo_evento.classList.remove("oculto");
});

cerrar_evento.addEventListener("click", () => {
	nuevo_evento.classList.add("oculto");
	formulario_evento.reset();
});

function cerrar_ventanas() {
	nuevo_evento.classList.add("oculto");
	formulario_evento.reset();
	nuevo_periodo.classList.add("oculto");
	formulario_periodo.reset();
}