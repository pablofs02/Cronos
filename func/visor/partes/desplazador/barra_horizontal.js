import { desunizar } from "../../../util/elementos.js";
import { desplazar_elementos } from "../../posicionador/horizontal.js";

let desplazador, barra;

let agarrando = false;
let posición_inicial_barra = 0;
let posición_inicial = 0;

export function escuchar_barra_horizontal() {
	desplazador = document.getElementById("desplazador_horizontal");
	barra = document.getElementById("barra_horizontal");

	desplazador.addEventListener("mousedown", ratón => {
		if (!sobre_barra_h(ratón)) {
			barra.style.left = ratón.offsetX - (barra.clientWidth / 2) + "px";
			comprobar_límites_h();
			desplazar_elementos();
		}
		posición_inicial_barra = desunizar(barra.style.left);
		agarrando = true;
		document.body.style.cursor = "grabbing";
	});

	document.body.addEventListener("mousedown", ratón => {
		if (agarrando) {
			posición_inicial = ratón.pageX;
		}
	});

	desplazador.addEventListener("touchstart", dedo => {
		if (!sobre_barra_h_dedo(dedo)) {
			const compensación = dedo.touches[0].pageX - desplazador.getBoundingClientRect().left;
			barra.style.left = compensación - (barra.clientWidth / 2) + "px";
			comprobar_límites_h();
			desplazar_elementos();
		}
		posición_inicial_barra = desunizar(barra.style.left);
		agarrando = true;
	});

	document.body.addEventListener("mousemove", ratón => {
		if (agarrando) {
			const diferencia_ratón_x = ratón.pageX - posición_inicial;
			const movimiento_x = Number(posición_inicial_barra) + Number(diferencia_ratón_x);
			barra.style.left = movimiento_x + "px";
			comprobar_límites_h();
			desplazar_elementos();
		}
	});

	document.body.addEventListener("mouseup", () => {
		if (agarrando) {
			agarrando = false;
			document.body.style.cursor = "";
		}
	});

	document.body.addEventListener("touchstart", dedo => {
		if (agarrando) {
			posición_inicial = dedo.touches[0].pageX;
		}
	});

	document.body.addEventListener("touchmove", dedo => {
		if (agarrando) {
			const diferencia_x = dedo.touches[0].pageX - posición_inicial;
			const movimiento_x = Number(posición_inicial_barra) + Number(diferencia_x);
			barra.style.left = movimiento_x + "px";
			comprobar_límites_h();
			desplazar_elementos();
		}
	});
}

function sobre_barra_h(ratón) {
	const izquierda = desunizar(barra.style.left);
	const derecha = Number(izquierda) + Number(barra.clientWidth);
	const pos_ratón = ratón.offsetX;
	return pos_ratón > izquierda && pos_ratón < derecha;
}

function sobre_barra_h_dedo(dedo) {
	const izquierda = desunizar(barra.style.left);
	const derecha = Number(izquierda) + Number(barra.clientWidth);
	const pos_dedo = dedo.touches[0].pageX - desplazador.getBoundingClientRect().left;
	return pos_dedo > izquierda && pos_dedo < derecha;
}

function límite_izquierdo() {
	const posición_barra = Number(desunizar(barra.style.left));
	const mínimo_barra = 0;
	return posición_barra < mínimo_barra;
}

function límite_derecho() {
	const posición_barra = Number(desunizar(barra.style.left));
	const máximo_barra = Number(desplazador.clientWidth - barra.clientWidth);
	return posición_barra > máximo_barra;
}

function comprobar_límites_h() {
	if (límite_izquierdo())
		barra.style.left = "0px";
	if (límite_derecho())
		barra.style.left = desplazador.clientWidth - barra.clientWidth + "px";
}

export function posición_actual() {
	const longitud_absoluta = desplazador.clientWidth;
	const longitud_relativa = longitud_absoluta - desunizar(barra.style.width);
	const posición_relativa = desunizar(barra.style.left);
	const posición_absoluta = longitud_absoluta / longitud_relativa * posición_relativa;
	const posición_absoluta_sobre_100 = 100 / longitud_absoluta * posición_absoluta;
	return posición_absoluta_sobre_100;
}

export function longitud_visor() {
	return desplazador.clientWidth;
}

export function actualizar_barra_h(escalador) {
	barra.style.width = (desplazador.clientWidth / 100) * escalador + "px";
	comprobar_límites_h();
}