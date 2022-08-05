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

const periodos_visitados = [];

const aumentar = document.getElementById("aumentar");
const disminuir = document.getElementById("disminuir");

aumentar.addEventListener("click", () => {
	if (propiedades.proporción > 10) {
		propiedades.proporción -= 10;
		ajustar_todo();
	}
});

disminuir.addEventListener("click", () => {
	if (propiedades.proporción < 100) {
		propiedades.proporción += 10;
		ajustar_todo();
	}
});

window.addEventListener("resize", () =>
	ajustar_todo());

export function cargar_visualizador(tempo) {
	limpiar_mostrador();

	if (tempo.periodos)
		añadir_periodos(tempo.periodos);
	if (tempo.eventos)
		añadir_eventos(tempo.eventos);

	actualizar_visualizador();
}

export function actualizar_visualizador() {
	actualizar_barra_h(propiedades.proporción);
	definir_posición();
	actualizar_posición();
	definir_longitud();
	actualizar_longitud();
	definir_altitud();
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

function ajustar_todo() {
	actualizar_barra_h(propiedades.proporción);
	actualizar_longitud();
	actualizar_posición();
	desplazar_elementos();
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
		const distancia = 100 / dif_max_min * dif_min_per;
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

let periodos_chocados = [];

function vaciar_bufer() {
	periodos_chocados = periodos_chocados.slice(-1, -1);
}

function definir_altitud() {
	const periodos = mostrador_periodos.childNodes;
	for (let i = 0; i < periodos.length; i++) {
		const periodo = periodos[i];
		const altitud = calcular_altitud(periodo);
		periodos_visitados.push(periodo);
		periodo.setAttribute("altura", altitud);
		vaciar_bufer();
	}
	actualizar_altitud();
}

function calcular_altitud(periodo) {
	listar_choques(periodo);
	return primer_espacio(0);
}

function primer_espacio(menor) {
	for (let i = 0; i < periodos_chocados.length; i++)
		if (periodos_chocados[i].getAttribute("altura") == menor)
			return primer_espacio(menor + 1);
	return menor;
}

function listar_choques(periodo) {
	for (let i = 0; i < periodos_visitados.length; i++) {
		const periodo_v = periodos_visitados[i];
		if (chocan(periodo, periodo_v)) {
			periodos_chocados.push(periodo_v);
		}
	}
}

function chocan(periodo, periodo_v) {
	return pertenece_inicio(periodo, periodo_v) || pertenece_final(periodo, periodo_v);
}

function pertenece_inicio(periodo, periodo_v) {
	return Number(periodo.getAttribute("inicio")) > Number(periodo_v.getAttribute("inicio")) && Number(periodo.getAttribute("inicio")) < Number(periodo_v.getAttribute("fin"));
}

function pertenece_final(periodo, periodo_v) {
	return Number(periodo.getAttribute("fin")) < Number(periodo_v.getAttribute("fin")) && Number(periodo.getAttribute("fin")) > Number(periodo_v.getAttribute("inicio"));
}

function actualizar_altitud() {
	const periodos = mostrador_periodos.childNodes;
	for (let i = 0; i < periodos.length; i++) {
		const periodo = periodos[i];
		const altitud = periodo.getAttribute("altura");
		periodo.style.bottom = altitud * 22 + "px";
	}
}

function crear_periodo(periodo) {
	const nodo = document.createElement("div");
	nodo.textContent = periodo.nombre;
	nodo.title = periodo.nombre + "\n" + periodo.comentario;
	nodo.setAttribute("class", "periodo");
	nodo.setAttribute("inicio", periodo.inicio);
	nodo.setAttribute("fin", periodo.fin);
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
	actualizar_mínimos(objeto);
	actualizar_máximos(objeto);
}

function actualizar_mínimos(objeto) {
	let valor;
	if (objeto.inicio)
		valor = objeto.inicio;
	else
		valor = objeto.fecha;
	if (!propiedades.mínimo)
		propiedades.mínimo = valor;
	else if (propiedades.mínimo > valor)
		propiedades.mínimo = valor;
}

function actualizar_máximos(objeto) {
	let valor;
	if (objeto.fin)
		valor = objeto.fin;
	else
		valor = objeto.fecha;
	if (!propiedades.máximo)
		propiedades.máximo = valor;
	else if (propiedades.máximo < valor)
		propiedades.máximo = valor;
}

function limpiar_mostrador() {
	while (mostrador_periodos.firstChild)
		mostrador_periodos.firstChild.remove();
	while (mostrador_eventos.firstChild)
		mostrador_eventos.firstChild.remove();
}