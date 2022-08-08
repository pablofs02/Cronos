import { en_años } from "../modo/editor.js";
import { activar_barra_lateral, actualizar_barra_h, altura_actual, bajar_barra, desactivar_barra_lateral, longitud_visualizador, posición_actual } from "../utilidad/desplazamiento.js";

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

export default function configurar_visualizador() {
	escuchar_escalador();
	escuchar_vestana();
}

function hay_grupos() {
	const periodos = document.getElementById("periodos").childNodes;
	for (let i = 0; i < periodos.length; i++)
		if (periodos[i].getAttribute("grupo") != "_")
			return true;
	return false;
}

let periodos_visitados = [];
let periodos_chocados = [];

const grupos = {};

let altura_grupo_anterior = 0;

export function cargar_visualizador(tempo) {
	limpiar_mostrador();

	if (tempo.periodos)
		añadir_periodos(tempo.periodos);
	if (tempo.eventos)
		añadir_eventos(tempo.eventos);

	actualizar_visualizador();
}

export function actualizar_visualizador() {
	añadir_margen();
	actualizar_barra_h(propiedades.proporción);
	definir_posición();
	actualizar_posición();
	definir_longitud();
	actualizar_longitud();
	definir_altitud();
	comprobar_altura();
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

export function elevar_elementos() {
	const periodos = mostrador_periodos.childNodes;
	for (let i = 0; i < periodos.length; i++) {
		const periodo = periodos[i];
		const posición_base = periodo.getAttribute("altura") * 22;
		const long_panel = document.getElementById("mostrador").clientHeight;
		const long_total = (Number(altura_máxima()) + 1) * 22;
		const dif_tot_pan = long_total - long_panel;
		const desplazamiento = altura_actual() / 100 * dif_tot_pan;
		const posición_desplazada = posición_base - desplazamiento;
		periodo.style.bottom = posición_desplazada + "px";
	}
}

function escuchar_escalador() {
	const aumentar = document.getElementById("aumentar");
	aumentar.addEventListener("click", () => {
		if (propiedades.proporción > 10) {
			propiedades.proporción -= 10;
			ajustar_todo();
		}
	});

	const disminuir = document.getElementById("disminuir");
	disminuir.addEventListener("click", () => {
		if (propiedades.proporción < 100) {
			propiedades.proporción += 10;
			ajustar_todo();
		}
	});
}

function escuchar_vestana() {
	window.addEventListener("resize", () =>
		ajustar_todo());
}

function ajustar_todo() {
	actualizar_barra_h(propiedades.proporción);
	actualizar_longitud();
	actualizar_posición();
	desplazar_elementos();
	comprobar_altura();
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
		const inicio = en_años(JSON.parse(periodo.getAttribute("inicio")));
		const dif_max_min = propiedades.máximo - propiedades.mínimo;
		const dif_min_per = inicio - propiedades.mínimo;
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
		const inicio = en_años(JSON.parse(periodo.getAttribute("inicio")));
		const fin = en_años(JSON.parse(periodo.getAttribute("fin")));
		const dif_fecha_periodo = fin - inicio;
		const dif_fecha_total = propiedades.máximo - propiedades.mínimo;
		const ancho = 100 / dif_fecha_total * dif_fecha_periodo;
		console.log(dif_fecha_periodo);
		periodo.setAttribute("ancho", ancho);
	}
}

function vaciar_chocados() {
	periodos_chocados = periodos_chocados.slice(-1, -1);
}

function vaciar_visitados() {
	periodos_visitados = periodos_visitados.slice(-1, -1);
}

function definir_altitud() {
	const periodos = mostrador_periodos.childNodes;
	const nombres = Object.keys(grupos);
	for (let i = 0; i < nombres.length; i++) {
		const listado = grupos[nombres[i]];
		for (let j = 0; j < listado.length; j++) {
			const periodo = periodos[listado[j]];
			const altitud = calcular_altitud(periodo);
			vaciar_chocados();
			periodos_visitados.push(periodo);
			periodo.setAttribute("altura", altitud);
		}
		altura_grupo_anterior = Number(altura_máxima()) + 1;
		vaciar_visitados();
	}
	actualizar_altitud();
}

function calcular_altitud(periodo) {
	listar_choques(periodo);
	return primer_espacio(altura_grupo_anterior);
}

function primer_espacio(menor) {
	for (let i = 0; i < periodos_chocados.length; i++)
		if (periodos_chocados[i].getAttribute("altura") == menor)
			return primer_espacio(Number(menor) + 1);
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

function chocan(periodo_1, periodo_2) {
	return choque_frontal(periodo_1, periodo_2) || choque_trasero(periodo_1, periodo_2) || choque_total(periodo_1, periodo_2);
}

function choque_total(periodo_1, periodo_2) {
	const inicio_1 = Number(en_años(JSON.parse(periodo_1.getAttribute("inicio"))));
	const inicio_2 = Number(en_años(JSON.parse(periodo_2.getAttribute("inicio"))));
	const fin_1 = Number(en_años(JSON.parse(periodo_1.getAttribute("fin"))));
	const fin_2 = Number(en_años(JSON.parse(periodo_2.getAttribute("fin"))));
	return inicio_1 == inicio_2 && fin_1 == fin_2;
}

function choque_frontal(periodo_1, periodo_2) {
	const inicio_1 = Number(en_años(JSON.parse(periodo_1.getAttribute("inicio"))));
	const inicio_2 = Number(en_años(JSON.parse(periodo_2.getAttribute("inicio"))));
	const fin_2 = Number(en_años(JSON.parse(periodo_2.getAttribute("fin"))));
	return inicio_1 > inicio_2 && inicio_1 < fin_2;
}

function choque_trasero(periodo_1, periodo_2) {
	const inicio_2 = Number(en_años(JSON.parse(periodo_2.getAttribute("inicio"))));
	const fin_1 = Number(en_años(JSON.parse(periodo_1.getAttribute("fin"))));
	const fin_2 = Number(en_años(JSON.parse(periodo_2.getAttribute("fin"))));
	return fin_1 < fin_2 && fin_1 > inicio_2;
}

function actualizar_altitud() {
	const periodos = mostrador_periodos.childNodes;
	for (let i = 0; i < periodos.length; i++) {
		const periodo = periodos[i];
		const altitud = periodo.getAttribute("altura");
		periodo.style.bottom = altitud * 22 + "px";
	}
}

function comprobar_altura() {
	if ((Number(altura_máxima()) + 1) * 22 - 2 > límite_altura()) {
		activar_barra_lateral();
		actualizar_barra_lateral();
	} else
		desactivar_barra_lateral();
	bajar_barra();
	elevar_elementos();
}

function actualizar_barra_lateral() {
	const barra = document.getElementById("barra_vertical");
	const longitud = document.getElementById("desplazador_vertical").clientHeight;
	const altura_visible = (Number(altura_máxima()) + 1) * 22 - 2;
	barra.style.height = longitud * límite_altura() / altura_visible + "px";
}

function límite_altura() {
	return document.getElementById("mostrador").clientHeight;
}

function altura_máxima() {
	const periodos = document.getElementById("periodos").childNodes;
	let máximo = 0;
	for (let i = 0; i < periodos.length; i++) {
		const altura = periodos[i].getAttribute("altura");
		if (Number(altura) > máximo)
			máximo = altura;
	}
	return máximo;
}

function crear_periodo(periodo, id) {
	const nodo = document.createElement("div");
	nodo.textContent = periodo.nombre;
	if (periodo.comentario)
		nodo.title = periodo.nombre + "\n" + periodo.comentario;
	else
		nodo.title = periodo.nombre;
	nodo.setAttribute("class", "periodo");
	nodo.setAttribute("inicio", JSON.stringify(periodo.inicio));
	nodo.setAttribute("fin", JSON.stringify(periodo.fin));
	if (periodo.grupo) {
		nodo.setAttribute("grupo", periodo.grupo);
		agregar_a_grupo(periodo.grupo, id);
	} else {
		nodo.setAttribute("grupo", "_");
		agregar_a_grupo("_", id);
	}
	nodo.style.bottom = 0;
	return nodo;
}

function agregar_a_grupo(grupo, id) {
	if (grupos[grupo]) {
		grupos[grupo].push(id);
	} else {
		grupos[grupo] = [id];
	}
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
	for (let i = 0; i < periodos.length; i++) {
		const periodo = periodos[i];
		const nodo_periodo = crear_periodo(periodo, i);
		fragmento.appendChild(nodo_periodo);
		actualizar_límites(periodo);
	};
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
		valor = en_años(objeto.inicio);
	else
		valor = en_años(objeto.fecha);
	if (!propiedades.mínimo)
		propiedades.mínimo = valor;
	else if (Number(propiedades.mínimo) > valor)
		propiedades.mínimo = valor;
}

function actualizar_máximos(objeto) {
	let valor;
	if (objeto.fin)
		valor = en_años(objeto.fin);
	else
		valor = en_años(objeto.fecha);
	if (!propiedades.máximo)
		propiedades.máximo = valor;
	else if (Number(propiedades.máximo) < valor)
		propiedades.máximo = valor;
}

function añadir_margen() {
	const rango = (propiedades.máximo - propiedades.mínimo);
	// propiedades.máximo = Number(propiedades.máximo) + 0.05 * rango;
	if (hay_grupos())
		propiedades.mínimo -= 0.14 * rango;
	// else
	// propiedades.mínimo -= 0.05 * rango;
}

function limpiar_mostrador() {
	while (mostrador_periodos.firstChild)
		mostrador_periodos.firstChild.remove();
	while (mostrador_eventos.firstChild)
		mostrador_eventos.firstChild.remove();
}