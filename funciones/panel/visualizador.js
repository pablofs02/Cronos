import { actualizar_barra_h, longitud_visualizador, posición_actual } from "../utilidad/desplazamiento.js";

const inicio = document.getElementById("inicio");
inicio.addEventListener("click", () =>
	location.assign("index.html"));

const mostrador_periodos = document.getElementById("periodos");
const mostrador_eventos = document.getElementById("eventos");

const propiedades = {
	proporción: 100,
	máximo: null,
	mínimo: null
};

const aumentar = document.getElementById("aumentar");
const disminuir = document.getElementById("disminuir");

aumentar.addEventListener("click", () => {
	if (propiedades.proporción > 10) {
		propiedades.proporción -= 10;
		actualizar_barra_h(propiedades.proporción);
		actualizar_longitud();
		actualizar_posición();
		desplazar_elementos();
	}
});

disminuir.addEventListener("click", () => {
	if (propiedades.proporción < 100) {
		propiedades.proporción += 10;
		actualizar_barra_h(propiedades.proporción);
		actualizar_longitud();
		actualizar_posición();
		desplazar_elementos();
	}
});

export function cargar_visualizador(tempo) {
	limpiar_mostrador();

	if (tempo.contenido) {
		if (tempo.contenido.periodos)
			añadir_periodos(tempo.contenido.periodos);
		if (tempo.contenido.eventos)
			añadir_eventos(tempo.contenido.eventos);
	}

	actualizar_visualizador();
}

export function actualizar_visualizador() {
	actualizar_barra_h(propiedades.proporción);
	definir_posición();
	actualizar_posición();
	definir_longitud();
	actualizar_longitud();
}

export function desplazar_elementos() {
	const periodos = mostrador_periodos.childNodes;
	for (let i = 0; i < periodos.length; i++) {
		const periodo = periodos[i];
		const posición_base = periodo.getAttribute("pos_x");
		const longitud_total = longitud_visualizador() * 100 / propiedades.proporción;
		const desplazamiento = posición_actual() / 100 * longitud_total;
		const exceso = posición_actual() / 100 * longitud_visualizador();
		const posición_desplazada = posición_base - desplazamiento + exceso;
		periodo.style.left = posición_desplazada + "px";
	}
}

function actualizar_posición() {
	const periodos = mostrador_periodos.childNodes;
	for (let i = 0; i < periodos.length; i++) {
		const periodo = periodos[i];
		const posición_relativa = periodo.getAttribute("posición");
		const posición_absoluta = longitud_visualizador() / 100 * posición_relativa;
		const distancia = posición_absoluta * (100 / propiedades.proporción);
		periodo.setAttribute("pos_x", distancia);
		periodo.style.left = distancia + "px";
	}
}

function definir_posición() {
	const periodos = mostrador_periodos.childNodes;
	for (let i = 0; i < periodos.length; i++) {
		const periodo = periodos[i];
		const dif_max_min = propiedades.máximo - propiedades.mínimo;
		const dif_min_per = periodo.getAttribute("inicio") - propiedades.mínimo;
		const distancia = 100 / dif_max_min * dif_min_per;;
		periodo.setAttribute("posición", distancia);
	}
}

function actualizar_longitud() {
	const periodos = mostrador_periodos.childNodes;
	for (let i = 0; i < periodos.length; i++) {
		const periodo = periodos[i];
		const ancho_relativo = periodo.getAttribute("ancho");
		const ancho_escalado = ancho_relativo / propiedades.proporción * 100;
		const ancho_pantalla = longitud_visualizador();
		const ancho_absoluto = ancho_escalado / 100 * ancho_pantalla;
		periodo.style.width = ancho_absoluto + "px";
	}
}

function definir_longitud() {
	const periodos = mostrador_periodos.childNodes;
	for (let i = 0; i < periodos.length; i++) {
		const periodo = periodos[i];
		const inicio = periodo.getAttribute("inicio");
		const fin = periodo.getAttribute("fin");
		const dif_fecha_periodo = fin - inicio;
		const dif_fecha_total = propiedades.máximo - propiedades.mínimo;
		const ancho = 100 / dif_fecha_total * dif_fecha_periodo;
		periodo.setAttribute("ancho", ancho);
	}
}

function crear_periodo(periodo) {
	const nodo = document.createElement("div");
	nodo.textContent = periodo.nombre;
	nodo.title = periodo.comentario;
	nodo.setAttribute("class", "periodo");
	nodo.setAttribute("inicio", periodo.fecha.inicio);
	nodo.setAttribute("fin", periodo.fecha.fin);
	nodo.style.bottom = 0;
	return nodo;
}

function crear_evento(evento) {
	const nodo = document.createElement("div");
	nodo.title = evento.comentario;
	nodo.setAttribute("class", "evento");
	nodo.setAttribute("fecha", evento.fecha);
	return nodo;
}

function añadir_periodos(periodos) {
	const fragmento = document.createDocumentFragment();
	periodos.forEach(periodo => {
		const nodo_periodo = crear_periodo(periodo);
		fragmento.appendChild(nodo_periodo);
		actualizar_límites(periodo);
	});
	mostrador_periodos.appendChild(fragmento);
}

function añadir_eventos(eventos) {
	const fragmento = document.createDocumentFragment();
	eventos.forEach(evento => {
		const nodo_evento = crear_evento(evento);
		fragmento.appendChild(nodo_evento);
		actualizar_límites(evento);
	});
	mostrador_eventos.appendChild(fragmento);
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

function limpiar_mostrador() {
	while (mostrador_periodos.firstChild) {
		mostrador_periodos.firstChild.remove();
	}
	while (mostrador_eventos.firstChild) {
		mostrador_eventos.firstChild.remove();
	}
}