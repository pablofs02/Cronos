import { cargar_visualizador } from "../panel/visualizador.js";

const formulario_periodo = document.getElementById("insertar-periodo");
const periodo_nuevo = document.getElementById("añadir-periodo");
const cerrar_periodo = document.getElementById("cerrar-periodo-nuevo");
const nuevo_periodo = document.getElementById("nuevo_periodo");

const formulario_evento = document.getElementById("insertar-evento");
const evento_nuevo = document.getElementById("añadir-evento");
const cerrar_evento = document.getElementById("cerrar-evento-nuevo");
const nuevo_evento = document.getElementById("nuevo_evento");

const base = "Cronos";
const tabla = "líneas_temporales";
let línea = null;

mirar_reserva();

function mirar_reserva() {
	if (localStorage.getItem("línea")) {
		línea = localStorage.getItem("línea");
		cargar_visualizador(JSON.parse(línea));
	} else {
		línea = {
			nombre: "actual",
			comentario: "esta es una línea de prueba",
			contenido: {
				periodos: [{
					nombre: "Nombre del Periodo 1",
					comentario: "Comentario del periodo que voy a hacer largo para que se vea claramente si funciona.",
					fecha: {
						inicio: 10,
						fin: 30
					}
				}, {
					nombre: "¡Periodo 2!",
					comentario: "Comentario del periodo que voy a hacer largo para que se vea claramente si funciona.",
					fecha: {
						inicio: 32,
						fin: 58
					}
				}],
				eventos: []
			}
		};
		localStorage.setItem("línea", JSON.stringify(línea));
		cargar_visualizador(línea);
	};
}

function guardar_dato(dato) {
	const nuevo = JSON.parse(línea);
	nuevo.contenido.periodos.push(dato);
	cargar_visualizador(nuevo);
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
	guardar_dato(periodo);
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
	guardar_dato(base, tabla, evento);
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