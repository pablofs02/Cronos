import { desplazar_elementos, elevar_elementos } from "../panel/visor.js";

let desplazador_h = null;
let barra_h = null;

let desplazador_v = null;
let barra_v = null;

let agarrando_h = false;
let posición_inicial_barra_h = 0;
let posición_inicial_x = 0;

let agarrando_v = false;
let posición_inicial_barra_v = 0;
let posición_inicial_y = 0;

export function longitud_visualizador() {
	return desplazador_h.clientWidth;
}

export function actualizar_barra_h(proporción) {
	barra_h.style.width = (desplazador_h.clientWidth / 100) * proporción + "px";
	comprobar_límites_h();
}

export function activar_barra_lateral() {
	desplazador_v.classList.remove("oculto");
}

export function desactivar_barra_lateral() {
	desplazador_v.classList.add("oculto");
}

export function escuchar_desplazadores() {
	desplazador_h = document.getElementById("desplazador_horizontal");
	barra_h = document.getElementById("barra_horizontal");

	desplazador_v = document.getElementById("desplazador_vertical");
	barra_v = document.getElementById("barra_vertical");

	desplazador_h.addEventListener("mousedown", (ratón) => {
		if (!sobre_barra_h(ratón)) {
			barra_h.style.left = ratón.offsetX - (barra_h.clientWidth / 2) + "px";
			comprobar_límites_h();
			desplazar_elementos();
		}
		posición_inicial_barra_h = desunizar(barra_h.style.left);
		agarrando_h = true;
		document.body.style.cursor = "grabbing";
	});

	desplazador_v.addEventListener("mousedown", (ratón) => {
		if (!sobre_barra_v(ratón)) {
			barra_v.style.bottom = (desplazador_v.clientHeight - ratón.offsetY) - (barra_v.clientHeight / 2) + "px";
			comprobar_límites_v();
			elevar_elementos();
		}
		posición_inicial_barra_v = desunizar(barra_v.style.bottom);
		agarrando_v = true;
		document.body.style.cursor = "grabbing";
	});

	document.body.addEventListener("mousedown", (ratón) => {
		if (agarrando_h) {
			posición_inicial_x = ratón.pageX;
		}
		if (agarrando_v) {
			posición_inicial_y = ratón.pageY;
		}
	});

	document.body.addEventListener("mousemove", (ratón) => {
		if (agarrando_h) {
			const diferencia_ratón_x = ratón.pageX - posición_inicial_x;
			const movimiento_x = Number(posición_inicial_barra_h) + Number(diferencia_ratón_x);
			barra_h.style.left = movimiento_x + "px";
			comprobar_límites_h();
			desplazar_elementos();
		}
		if (agarrando_v) {
			const diferencia_ratón_y = -(ratón.pageY - posición_inicial_y);
			const movimiento_y = Number(posición_inicial_barra_v) + Number(diferencia_ratón_y);
			barra_v.style.bottom = movimiento_y + "px";
			comprobar_límites_v();
			elevar_elementos();
		}
	});

	document.body.addEventListener("mouseup", () => {
		if (agarrando_h) {
			agarrando_h = false;
			document.body.style.cursor = "";
		}
		if (agarrando_v) {
			agarrando_v = false;
			document.body.style.cursor = "";
		}
	});

	desplazador_h.addEventListener("touchstart", (dedo) => {
		if (!sobre_barra_h_dedo(dedo)) {
			const compensación = dedo.touches[0].pageX - desplazador_h.getBoundingClientRect().left;
			barra_h.style.left = compensación - (barra_h.clientWidth / 2) + "px";
			comprobar_límites_h();
			desplazar_elementos();
		}
		posición_inicial_barra_h = desunizar(barra_h.style.left);
		agarrando_h = true;
	});

	desplazador_v.addEventListener("touchstart", (dedo) => {
		if (!sobre_barra_v_dedo(dedo)) {
			const compensación = dedo.touches[0].clientY - desplazador_v.getBoundingClientRect().top;
			barra_v.style.bottom = compensación - (barra_v.clientHeight / 2) + "px";
			comprobar_límites_v();
			elevar_elementos();
		}
		posición_inicial_barra_v = desunizar(barra_v.style.bottom);
		agarrando_v = true;
		document.body.style.cursor = "grabbing";
	});

	document.body.addEventListener("touchstart", (dedo) => {
		if (agarrando_h) {
			posición_inicial_x = dedo.touches[0].pageX;
		}
		if (agarrando_v) {
			posición_inicial_y = dedo.touches[0].pageY;
		}
	});

	document.body.addEventListener("touchmove", (dedo) => {
		if (agarrando_h) {
			const diferencia_x = dedo.touches[0].pageX - posición_inicial_x;
			const movimiento_x = Number(posición_inicial_barra_h) + Number(diferencia_x);
			barra_h.style.left = movimiento_x + "px";
			comprobar_límites_h();
			desplazar_elementos();
		}
		if (agarrando_v) {
			const diferencia_y = -(dedo.touches[0].pageY - posición_inicial_y);
			const movimiento_y = Number(posición_inicial_barra_v) + Number(diferencia_y);
			barra_v.style.bottom = movimiento_y + "px";
			comprobar_límites_v();
			elevar_elementos();
		}
	});
}

export function posición_actual() {
	const longitud_absoluta = desplazador_h.clientWidth;
	const longitud_relativa = longitud_absoluta - desunizar(barra_h.style.width);
	const posición_relativa = desunizar(barra_h.style.left);
	const posición_absoluta = longitud_absoluta / longitud_relativa * posición_relativa;
	const posición_absoluta_sobre_100 = 100 / longitud_absoluta * posición_absoluta;
	return posición_absoluta_sobre_100;
}

export function altura_actual() {
	const longitud_absoluta = desplazador_v.clientHeight;
	const longitud_relativa = longitud_absoluta - desunizar(barra_v.style.height);
	const posición_relativa = desunizar(barra_v.style.bottom);
	const posición_absoluta = longitud_absoluta / longitud_relativa * posición_relativa;
	const posición_absoluta_sobre_100 = 100 / longitud_absoluta * posición_absoluta;
	return posición_absoluta_sobre_100;
}

export function desunizar(variable) {
	return variable.substring(0, variable.length - 2);
}

export function bajar_barra() {
	barra_v.style.bottom = "0px";
}

function comprobar_límites_h() {
	if (límite_izquierdo())
		barra_h.style.left = "0px";
	if (límite_derecho())
		barra_h.style.left = desplazador_h.clientWidth - barra_h.clientWidth + "px";
}

function comprobar_límites_v() {
	if (límite_inferior())
		barra_v.style.bottom = "0px";
	if (límite_superior())
		barra_v.style.bottom = desplazador_v.clientHeight - barra_v.clientHeight + "px";
}

function límite_izquierdo() {
	const posición_barra = Number(desunizar(barra_h.style.left));
	const mínimo_barra = 0;
	return posición_barra < mínimo_barra;
}

function límite_derecho() {
	const posición_barra = Number(desunizar(barra_h.style.left));
	const máximo_barra = Number(desplazador_h.clientWidth - barra_h.clientWidth);
	return posición_barra > máximo_barra;
}

function límite_inferior() {
	const posición_barra = Number(desunizar(barra_v.style.bottom));
	const mínimo_barra = 0;
	return posición_barra < mínimo_barra;
}

function límite_superior() {
	const posición_barra = Number(desunizar(barra_v.style.bottom));
	const máximo_barra = Number(desplazador_v.clientHeight - barra_v.clientHeight);
	return posición_barra > máximo_barra;
}

function sobre_barra_h(ratón) {
	const izquierda = desunizar(barra_h.style.left);
	const derecha = Number(izquierda) + Number(barra_h.clientWidth);
	const pos_ratón = ratón.offsetX;
	return pos_ratón > izquierda && pos_ratón < derecha;
}

function sobre_barra_h_dedo(dedo) {
	const izquierda = desunizar(barra_h.style.left);
	const derecha = Number(izquierda) + Number(barra_h.clientWidth);
	const pos_dedo = dedo.touches[0].pageX - desplazador_h.getBoundingClientRect().left;
	return pos_dedo > izquierda && pos_dedo < derecha;
}

function sobre_barra_v(ratón) {
	const inferior = desunizar(barra_v.style.bottom);
	const superior = Number(inferior) + Number(barra_v.clientHeight);
	const pos_ratón = desplazador_v.clientHeight - ratón.offsetY;
	return pos_ratón > inferior && pos_ratón < superior;
}

function sobre_barra_v_dedo(dedo) {
	const inferior = desunizar(barra_v.style.bottom);
	const superior = Number(inferior) + Number(barra_v.clientHeight);
	const compensación = dedo.touches[0].pageY - desplazador_v.getBoundingClientRect().top;
	const pos_dado = desplazador_v.clientHeight - compensación;
	return pos_dado > inferior && pos_dado < superior;
}