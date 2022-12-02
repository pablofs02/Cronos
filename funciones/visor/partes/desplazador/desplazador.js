import { crear_div } from "../../../util/elementos.js";
import { escuchar_barra_horizontal } from "./barra_horizontal.js";
import { escuchar_desplazador_vertical } from "./barra_vertical.js";

export function escuchar_desplazadores() {
	escuchar_barra_horizontal();
	escuchar_desplazador_vertical();
}

export function cargar_desplazador() {
	const desplazador = crear_div("desplazador");
	desplazador.appendChild(crear_desplazador("horizontal"));
	desplazador.appendChild(crear_desplazador("vertical"));
	return desplazador;
}

function crear_desplazador(x) {
	const nodo = crear_div("desplazador_" + x);
	if (x === "vertical") nodo.classList.add("oculto");
	nodo.appendChild(crear_div("barra_" + x));
	nodo.appendChild(crear_div("barra_" + x + "_protector"));
	return nodo;
}