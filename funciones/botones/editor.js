import { guardar_dato, listar_datos, tomar_dato } from "../almacenamiento.js";

const periodo = document.getElementById("insertar-periodo");
const periodo_nuevo = document.getElementById("añadir-periodo");
const cerrar_periodo = document.getElementById("cerrar-periodo-nuevo");
const nuevo_periodo = document.getElementById("nuevo_periodo");

const evento = document.getElementById("insertar-evento");
const evento_nuevo = document.getElementById("añadir-evento");
const cerrar_evento = document.getElementById("cerrar-evento-nuevo");
const nuevo_evento = document.getElementById("nuevo_evento");

const base = "Cronos";
const tabla = "líneas_temporales";

listar_datos(base, tabla);

periodo.addEventListener("submit", (e) => {
	e.preventDefault();
	const dato = {
		nombre: e.target.nombre.value,
		comentario: e.target.comentario.value,
		inicio: e.target.inicio.value,
		fin: e.target.fin.value
	};
	if (e.target["inicio-AC"].checked) {
		dato.inicio = -dato.inicio;
	}
	if (e.target["fin-AC"].checked) {
		dato.fin = -dato.fin;
	}
	guardar_dato(base, tabla, dato);
	periodo.reset();
});
periodo_nuevo.addEventListener("click", () => {
	nuevo_periodo.classList.remove("oculto");
	if (!nuevo_evento.classList.contains("oculto")) {
		nuevo_evento.classList.add("oculto");
		evento.reset();
	}
});
cerrar_periodo.addEventListener("click", () => {
	nuevo_periodo.classList.add("oculto");
	periodo.reset();
});

evento.addEventListener("submit", (e) => {
	e.preventDefault();
	const dato = {
		nombre: e.target.nombre.value,
		comentario: e.target.comentario.value,
		fecha: e.target.fecha.value,
	};
	if (e.target["fecha-AC"].checked) {
		dato.fecha = -dato.fecha;
	}
	guardar_dato(base, tabla, dato);
	evento.reset();
});
evento_nuevo.addEventListener("click", () => {
	nuevo_evento.classList.remove("oculto");
	if (!nuevo_periodo.classList.contains("oculto")) {
		nuevo_periodo.classList.add("oculto");
		periodo.reset();
	}
});
cerrar_evento.addEventListener("click", () => {
	nuevo_evento.classList.add("oculto");
	evento.reset();
});