const desplazador = document.getElementById("desplazador");
const barra = document.getElementById("barra");

let agarrando = false;
let posición_inicial_barra = 0;
let posición_inicial_ratón = 0;
let diferencia_ratón = 0;

desplazador.addEventListener("mousedown", (ratón) => {
	if (!sobre_barra(ratón))
		barra.style.left = ratón.offsetX - (barra.clientWidth / 2) + "px";
	posición_inicial_barra = desunizar(barra.style.left);
	agarrando = true;
	document.body.style.cursor = "grabbing";
});

document.body.addEventListener("mousedown", (ratón) => {
	posición_inicial_ratón = ratón.pageX;
});

document.body.addEventListener("mousemove", (ratón) => {
	if (agarrando) {
		diferencia_ratón = ratón.pageX - posición_inicial_ratón;
		const movimiento = Number(posición_inicial_barra) + Number(diferencia_ratón);
		barra.style.left = movimiento + "px";

		if (límite_izquierdo())
			barra.style.left = "0px";
		else if (límite_derecho())
			barra.style.left = desplazador.clientWidth - barra.clientWidth + "px";
	}
});

document.body.addEventListener("mouseup", () => {
	agarrando = false;
	document.body.style.cursor = "";
});

function desunizar(variable) {
	return variable.substring(0, variable.length - 2);
}

function límite_izquierdo() {
	const posición_barra = Number(posición_inicial_barra) + Number(diferencia_ratón);
	return posición_barra < 0;
}

function límite_derecho() {
	const posición_barra_futura = Number(posición_inicial_barra) + Number(diferencia_ratón);
	const posición_barra = Number(desunizar(barra.style.left));
	const máximo_barra = Number(desplazador.clientWidth - barra.clientWidth);
	return posición_barra_futura > máximo_barra || posición_barra > máximo_barra;
}

function sobre_barra(ratón) {
	const izquierda = desunizar(barra.style.left);
	const derecha = Number(izquierda) + Number(barra.clientWidth);
	return ratón.offsetX > izquierda && ratón.offsetX < derecha;
}