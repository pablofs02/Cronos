import { actualizar_barra_h, longitud_desplazamiento } from "./desplazamiento.js";

// ¿Añadir división por campos en una misma línea temporal?
const mostrador_periodos = document.getElementById("periodos");
const mostrador_eventos = document.getElementById("eventos");

const propiedades = {
	proporción: 100,
	máximo: null,
	máximo: null,
	posición: 0
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
	actualizar_posición();
	actualizar_longitud();
}

function actualizar_posición() {

}

function actualizar_longitud() {
	const periodos = mostrador_periodos.childNodes;
	for (let i = 0; i < periodos.length; i++) {
		const periodo = periodos[i];
		const inicio = periodo.getAttribute("inicio");
		const fin = periodo.getAttribute("fin");
		const desplazador = longitud_desplazamiento();
		const dif_fecha_periodo = fin - inicio;
		const dif_max_min = propiedades.máximo - propiedades.mínimo;
		const ancho = desplazador / dif_max_min * dif_fecha_periodo + "px";
		periodo.style.width = ancho;
	}

	const eventos = mostrador_eventos.childNodes;
	for (let i = 0; i < eventos.length; i++) {
		const evento = periodos[i];
	}
}

function añadir_periodos(periodos) {
	periodos.forEach(periodo => {
		const nodo_periodo = crear_periodo(periodo);
		nodo_periodo.setAttribute("inicio", periodo.fecha.inicio);
		nodo_periodo.setAttribute("fin", periodo.fecha.fin);
		mostrador_periodos.appendChild(nodo_periodo);
		actualizar_límites(periodo);
	});
}

function añadir_eventos(eventos) {
	eventos.forEach(evento => {
		const nodo_evento = crear_evento(evento);
		nodo_evento.setAttribute("fecha", evento.fecha);
		mostrador_eventos.appendChild(nodo_evento);
		actualizar_límites(evento);
	});
}

function actualizar_límites(objeto) {
	actualizar_mínimos(objeto.fecha);
	actualizar_máximos(objeto.fecha);
}

function actualizar_mínimos(fecha) {
	let valor;
	if (fecha.inicio) {
		valor = fecha.inicio;
	} else {
		valor = fecha;
	}
	if (!propiedades.mínimo) {
		propiedades.mínimo = valor;
	} else if (propiedades.mínimo > valor) {
		propiedades.mínimo = valor;
	}
}

function actualizar_máximos(fecha) {
	let valor;
	if (fecha.fin) {
		valor = fecha.fin;
	} else {
		valor = fecha;
	}
	if (!propiedades.máximo) {
		propiedades.máximo = valor;
	} else if (propiedades.máximo < valor) {
		propiedades.máximo = valor;
	}
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
			eventos: [{
				nombre: "Nombre del Evento",
				comentario: "Comentario del evento que voy a hacer largo para que se vea claramente si funciona.",
				fecha: 20
			}]
		}
	});