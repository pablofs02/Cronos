let desplazador_h = null;
let barra_h = null;

let agarrando_h = false;
let posición_inicial_barra_h = 0;
let posición_inicial_x = 0;

export function escuchar_barra_horizontal() {
	desplazador_h = document.getElementById("desplazador_horizontal");
	barra_h = document.getElementById("barra_horizontal");

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

	document.body.addEventListener("mousedown", (ratón) => {
		if (agarrando_h) {
			posición_inicial_x = ratón.pageX;
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

	document.body.addEventListener("mousemove", (ratón) => {
		if (agarrando_h) {
			const diferencia_ratón_x = ratón.pageX - posición_inicial_x;
			const movimiento_x = Number(posición_inicial_barra_h) + Number(diferencia_ratón_x);
			barra_h.style.left = movimiento_x + "px";
			comprobar_límites_h();
			desplazar_elementos();
		}
	});

	document.body.addEventListener("mouseup", () => {
		if (agarrando_h) {
			agarrando_h = false;
			document.body.style.cursor = "";
		}
	});

	document.body.addEventListener("touchstart", (dedo) => {
		if (agarrando_h) {
			posición_inicial_x = dedo.touches[0].pageX;
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
	});
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

function comprobar_límites_h() {
	if (límite_izquierdo())
		barra_h.style.left = "0px";
	if (límite_derecho())
		barra_h.style.left = desplazador_h.clientWidth - barra_h.clientWidth + "px";
}

export function posición_actual() {
	const longitud_absoluta = desplazador_h.clientWidth;
	const longitud_relativa = longitud_absoluta - desunizar(barra_h.style.width);
	const posición_relativa = desunizar(barra_h.style.left);
	const posición_absoluta = longitud_absoluta / longitud_relativa * posición_relativa;
	const posición_absoluta_sobre_100 = 100 / longitud_absoluta * posición_absoluta;
	return posición_absoluta_sobre_100;
}

export function longitud_visor() {
	return desplazador_h.clientWidth;
}

export function actualizar_barra_h(proporción) {
	barra_h.style.width = (desplazador_h.clientWidth / 100) * proporción + "px";
	comprobar_límites_h();
}