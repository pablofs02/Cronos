import { cargar_visualizador } from "../panel/visualizador.js";
import { guardar_tempo, tomar_tempo } from "../utilidad/almacenamiento.js";

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

comprobar_reserva();

function comprobar_reserva() {
	if (localStorage.getItem("tempo")) {
		tempo = tomar_tempo(localStorage.getItem("tempo"));
		cargar_visualizador(tempo);
	} else {
		tempo = {
			nombre: "Predeterminado",
			comentario: "Tempo por defecto",
			contenido: {
				periodos: [],
				eventos: []
			}
		};
		cargar_visualizador(tempo);
	};
}

formulario_periodo.addEventListener("submit", (e) => {
	e.preventDefault();
	const periodo = {
		nombre: e.target.nombre.value,
		comentario: e.target.comentario.value,
		fecha: {
			inicio: e.target.inicio.value,
			fin: e.target.fin.value
		}
	};
	if (e.target["inicio-AC"].checked) {
		periodo.inicio = -periodo.inicio;
	}
	if (e.target["fin-AC"].checked) {
		periodo.fin = -periodo.fin;
	}
	tempo.contenido.periodos.push(periodo);
	cargar_visualizador(tempo);
	formulario_periodo.reset();
});
periodo_nuevo.addEventListener("click", () => {
	nuevo_periodo.classList.remove("oculto");
	if (!nuevo_evento.classList.contains("oculto")) {
		nuevo_evento.classList.add("oculto");
		formulario_evento.reset();
	}
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
	if (e.target["fecha-AC"].checked) {
		evento.fecha = -evento.fecha;
	}
	tempo.contenido.evento.push(evento);
	cargar_visualizador(tempo);
	formulario_evento.reset();
});
evento_nuevo.addEventListener("click", () => {
	nuevo_evento.classList.remove("oculto");
	if (!nuevo_periodo.classList.contains("oculto")) {
		nuevo_periodo.classList.add("oculto");
		formulario_periodo.reset();
	}
});
cerrar_evento.addEventListener("click", () => {
	nuevo_evento.classList.add("oculto");
	formulario_evento.reset();
});

const formulario_guardado = document.getElementById("formulario_guardado");
const cerrar_guardado = document.getElementById("cerrar_guardado");
const nuevo_tempo = document.getElementById("nuevo_tempo");
const botón_guardar_tempo = document.getElementById("guardar_tempo");

formulario_guardado.addEventListener("submit", (e) => {
	e.preventDefault();
	if (e.target.nombre.value)
		tempo.nombre = e.target.nombre.value;
	if (e.target.comentario.value)
		tempo.comentario = e.target.comentario.value;
	guardar_tempo(base, tabla, tempo);
	formulario_guardado.reset();
	nuevo_tempo.classList.add("oculto");
});
botón_guardar_tempo.addEventListener("click", () => {
	nuevo_tempo.classList.toggle("oculto");
});
cerrar_guardado.addEventListener("click", () => {
	nuevo_tempo.classList.add("oculto");
	formulario_guardado.reset();
});