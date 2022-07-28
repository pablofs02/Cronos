const desplazador_h = document.getElementById("desplazador_horizontal");
const barra_h = document.getElementById("barra_horizontal");

const desplazador_v = document.getElementById("desplazador_vertical");
const barra_v = document.getElementById("barra_vertical");

let agarrando_h = false;
let posición_inicial_barra_h = 0;
let posición_inicial_ratón_x = 0;

let agarrando_v = false;
let posición_inicial_barra_v = 0;
let posición_inicial_ratón_y = 0;

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

desplazador_h.addEventListener("mousedown", (ratón) => {
	if (!sobre_barra_h(ratón)) {
		barra_h.style.left = ratón.offsetX - (barra_h.clientWidth / 2) + "px";
		comprobar_límites_h();
	}
	posición_inicial_barra_h = desunizar(barra_h.style.left);
	agarrando_h = true;
	document.body.style.cursor = "grabbing";
});

desplazador_v.addEventListener("mousedown", (ratón) => {
	if (!sobre_barra_v(ratón)) {
		barra_v.style.bottom = (desplazador_v.clientHeight - ratón.offsetY) - (barra_v.clientHeight / 2) + "px";
		comprobar_límites_v();
	}

	posición_inicial_barra_v = desunizar(barra_v.style.bottom);
	agarrando_v = true;
	document.body.style.cursor = "grabbing";
});

document.body.addEventListener("mousedown", (ratón) => {
	if (agarrando_h) {
		posición_inicial_ratón_x = ratón.pageX;
	}
	if (agarrando_v) {
		posición_inicial_ratón_y = ratón.pageY;
	}
});

document.body.addEventListener("mousemove", (ratón) => {
	if (agarrando_h) {
		const diferencia_ratón_x = ratón.pageX - posición_inicial_ratón_x;
		const movimiento_x = Number(posición_inicial_barra_h) + Number(diferencia_ratón_x);
		barra_h.style.left = movimiento_x + "px";
		comprobar_límites_h();
	}
	if (agarrando_v) {
		const diferencia_ratón_y = -(ratón.pageY - posición_inicial_ratón_y);
		const movimiento_y = Number(posición_inicial_barra_v) + Number(diferencia_ratón_y);
		barra_v.style.bottom = movimiento_y + "px";
		comprobar_límites_v();
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

export function longitud_desplazamiento() {
	return desplazador_h.clientWidth;
}

function desunizar(variable) {
	return variable.substring(0, variable.length - 2);
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

function sobre_barra_v(ratón) {
	const inferior = desunizar(barra_v.style.bottom);
	const superior = Number(inferior) + Number(barra_v.clientHeight);
	const pos_ratón = desplazador_v.clientHeight - ratón.offsetY;
	return pos_ratón > inferior && pos_ratón < superior;
}