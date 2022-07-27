import { actualizar_barra_h } from "./desplazamiento.js";

// ¿Añadir división por campos en una misma línea temporal?
const mostrador_periodos = document.getElementById("periodos");
const mostrador_eventos = document.getElementById("eventos");

const propiedades = {
	proporción: 100,
	inicio: 0,
	final: 10
};

const aumentar = document.getElementById("aumentar");
const disminuir = document.getElementById("disminuir");

aumentar.addEventListener("click", () => {
	if (propiedades.proporción < 100) {
		propiedades.proporción += 10;
		actualizar_barra_h(propiedades.proporción);
	}
});

disminuir.addEventListener("click", () => {
	if (propiedades.proporción > 10) {
		propiedades.proporción -= 10;
		actualizar_barra_h(propiedades.proporción);
	}
});

export function cargar_visualizador(línea_temporal) {
	limpiar_visualizador();

	añadir_periodos(línea_temporal.contenido.periodos);
	añadir_eventos(línea_temporal.contenido.eventos);

	actualizar_visualizador();
}

export function actualizar_visualizador() {
	actualizar_barra_h(propiedades.proporción);
}

function añadir_periodos(periodos) {
	periodos.forEach(periodo => {
		const nodo_periodo = crear_periodo(periodo);
		mostrador_periodos.appendChild(nodo_periodo);
	});
}

function añadir_eventos(eventos) {
	eventos.forEach(evento => {
		const nodo_evento = crear_evento(evento);
		mostrador_eventos.appendChild(nodo_evento);
	});
}

function crear_periodo(periodo) {
	const nodo = document.createElement("div");
	nodo.textContent = periodo.nombre;
	nodo.title = periodo.comentario;
	nodo.setAttribute("class", "periodo");
	nodo.style.bottom = 0;
	return nodo;
}

function crear_evento(evento) {
	const nodo = document.createElement("div");
	nodo.setAttribute("class", "evento");
	nodo.title = evento.comentario;
	return nodo;
}

function limpiar_visualizador() {
	while (mostrador_periodos.firstChild) {
		mostrador_periodos.firstChild.remove();
	}
	while (mostrador_eventos.firstChild) {
		mostrador_eventos.firstChild.remove();
	}
}

// Para pruebas.
cargar_visualizador(
	{
		contenido: {
			periodos: [{
				nombre: "Nombre del Periodo",
				comentario: "Comentario del periodo que voy a hacer largo para que se vea claramente si funciona.",
				fecha: {
					inicio: 10,
					fin: 30
				}
			}],
			eventos: [{
				nombre: "Nombre del Evento",
				comentario: "Comentario del evento que voy a hacer largo para que se vea claramente si funciona.",
				fecha: 20
			}]
		}
	});