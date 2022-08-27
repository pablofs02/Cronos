import { en_años } from "../../util/elementos.js";
import { activar_barra_lateral, actualizar_barra_lateral, altura_actual, bajar_barra, desactivar_barra_lateral } from "../partes/desplazador.js";
import { actualizar_etiqueta_grupo, crear_etiqueta_grupo, grupos } from "./grupos.js";

let periodos_visitados = [];
let periodos_chocados = [];
let altura_grupo_anterior = 0;

export function definir_altitud() {
	const periodos = document.getElementById("periodos").children;
	const nombres = Object.keys(grupos);
	let primer_grupo = true;
	for (let i = 0; i < nombres.length; i++) {
		const listado = grupos[nombres[i]];
		const etiqueta = crear_etiqueta_grupo(nombres[i], altura_máxima(), primer_grupo);
		primer_grupo = false;
		for (let j = 0; j < listado.length; j++) {
			const periodo = periodos[listado[j]];
			if (periodo) {
				const altitud = calcular_altitud(periodo);
				vaciar_chocados();
				periodos_visitados.push(periodo);
				periodo.setAttribute("altura", altitud);
			}
		}
		altura_grupo_anterior = Number(altura_máxima()) + 1;
		if (nombres[i] != "_")
			actualizar_etiqueta_grupo(etiqueta, altura_grupo_anterior);
		vaciar_visitados();
	}
	periodos_visitados = [];
	periodos_chocados = [];
	altura_grupo_anterior = 0;
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

export function comprobar_altura() {
	if ((Number(altura_máxima()) + 1) * 22 - 2 > límite_altura()) {
		activar_barra_lateral();
		actualizar_barra_lateral();
	} else
		desactivar_barra_lateral();
	bajar_barra();
	elevar_elementos();
}

export function límite_altura() {
	return document.getElementById("mostrador").clientHeight;
}

export function altura_máxima() {
	const periodos = document.getElementById("periodos").children;
	let máximo = 0;
	for (let i = 0; i < periodos.length; i++) {
		const altura = periodos[i].getAttribute("altura");
		if (Number(altura) > máximo)
			máximo = altura;
	}
	return máximo;
}

function actualizar_altitud() {
	const periodos = document.getElementById("periodos").children;
	for (let i = 0; i < periodos.length; i++) {
		const periodo = periodos[i];
		const altitud = periodo.getAttribute("altura");
		periodo.style.bottom = altitud * 22 + "px";
	}
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
	if (!(periodo_1 && periodo_2))
		return false;
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

export function elevar_elementos() {
	const periodos = document.getElementById("periodos").children;
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

function vaciar_visitados() {
	periodos_visitados = periodos_visitados.slice(-1, -1);
}

function vaciar_chocados() {
	periodos_chocados = periodos_chocados.slice(-1, -1);
}