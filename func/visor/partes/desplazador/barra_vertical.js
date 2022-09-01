import { desunizar } from "../../../util/elementos.js";
import { elevar_elementos } from "../../posicionador/vertical.js";

let desplazador = null;
let barra = null;

let agarrando = false;
let posición_inicial_barra = 0;
let posición_inicial = 0;

export function activar_barra_lateral() {
	desplazador.classList.remove("oculto");
}

export function desactivar_barra_lateral() {
	desplazador.classList.add("oculto");
}

export function escuchar_desplazador_vertical() {
	desplazador = document.getElementById("desplazador_vertical");
	barra = document.getElementById("barra_vertical");

	desplazador.addEventListener("mousedown", ratón => {
		if (!sobre_barra_v(ratón)) {
			barra.style.bottom = (desplazador.clientHeight - ratón.offsetY) - (barra.clientHeight / 2) + "px";
			comprobar_límites_v();
			elevar_elementos();
		}
		posición_inicial_barra = desunizar(barra.style.bottom);
		agarrando = true;
		document.body.style.cursor = "grabbing";
	});

	document.body.addEventListener("mousedown", ratón => {
		if (agarrando) {
			posición_inicial = ratón.pageY;
		}
	});

	document.body.addEventListener("mousemove", ratón => {
		if (agarrando) {
			const diferencia_ratón_y = -(ratón.pageY - posición_inicial);
			const movimiento_y = Number(posición_inicial_barra) + Number(diferencia_ratón_y);
			barra.style.bottom = movimiento_y + "px";
			comprobar_límites_v();
			elevar_elementos();
		}
	});

	document.body.addEventListener("mouseup", () => {
		if (agarrando) {
			agarrando = false;
			document.body.style.cursor = "";
		}
	});

	desplazador.addEventListener("touchstart", dedo => {
		if (!sobre_barra_v_dedo(dedo)) {
			const compensación = dedo.touches[0].clientY - desplazador.getBoundingClientRect().top;
			barra.style.bottom = compensación - (barra.clientHeight / 2) + "px";
			comprobar_límites_v();
			elevar_elementos();
		}
		posición_inicial_barra = desunizar(barra.style.bottom);
		agarrando = true;
		document.body.style.cursor = "grabbing";
	});

	document.body.addEventListener("touchstart", dedo => {
		if (agarrando) {
			posición_inicial = dedo.touches[0].pageY;
		}
	});

	document.body.addEventListener("touchmove", dedo => {
		if (agarrando) {
			const diferencia_y = -(dedo.touches[0].pageY - posición_inicial);
			const movimiento_y = Number(posición_inicial_barra) + Number(diferencia_y);
			barra.style.bottom = movimiento_y + "px";
			comprobar_límites_v();
			elevar_elementos();
		}
	});
}

export function altura_actual() {
	const longitud_absoluta = desplazador.clientHeight;
	const longitud_relativa = longitud_absoluta - desunizar(barra.style.height);
	const posición_relativa = desunizar(barra.style.bottom);
	const posición_absoluta = longitud_absoluta / longitud_relativa * posición_relativa;
	const posición_absoluta_sobre_100 = 100 / longitud_absoluta * posición_absoluta;
	return posición_absoluta_sobre_100;
}

export function bajar_barra() {
	barra.style.bottom = "0px";
}

function comprobar_límites_v() {
	if (límite_inferior())
		barra.style.bottom = "0px";
	if (límite_superior())
		barra.style.bottom = desplazador.clientHeight - barra.clientHeight + "px";
}

function límite_inferior() {
	const posición_barra = Number(desunizar(barra.style.bottom));
	const mínimo_barra = 0;
	return posición_barra < mínimo_barra;
}

function límite_superior() {
	const posición_barra = Number(desunizar(barra.style.bottom));
	const máximo_barra = Number(desplazador.clientHeight - barra.clientHeight);
	return posición_barra > máximo_barra;
}

function sobre_barra_v(ratón) {
	const inferior = desunizar(barra.style.bottom);
	const superior = Number(inferior) + Number(barra.clientHeight);
	const pos_ratón = desplazador.clientHeight - ratón.offsetY;
	return pos_ratón > inferior && pos_ratón < superior;
}

function sobre_barra_v_dedo(dedo) {
	const inferior = desunizar(barra.style.bottom);
	const superior = Number(inferior) + Number(barra.clientHeight);
	const compensación = dedo.touches[0].pageY - desplazador.getBoundingClientRect().top;
	const pos_dado = desplazador.clientHeight - compensación;
	return pos_dado > inferior && pos_dado < superior;
}

export function actualizar_barra_lateral() {
	const barra = document.getElementById("barra_vertical");
	const longitud = document.getElementById("desplazador_vertical").clientHeight;
	const altura_visible = (Number(altura_máxima()) + 1) * 22 - 2;
	barra.style.height = longitud * límite_altura() / altura_visible + "px";
}