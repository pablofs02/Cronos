import { en_años } from "../../util/elementos.js";
import { longitud_visor } from "../partes/desplazador.js";
import { escala } from "../partes/escalador.js";
import { máximo, mínimo } from "./extremos.js";

export function actualizar_longitud() {
	const periodos = document.getElementById("periodos").children;
	for (let i = 0; i < periodos.length; i++) {
		const periodo = periodos[i];
		const ancho_relativo = periodo.getAttribute("ancho");
		const ancho_escalado = ancho_relativo / escala * 100;
		const ancho_pantalla = longitud_visor();
		const ancho_absoluto = ancho_escalado / 100 * ancho_pantalla;
		periodo.style.width = ancho_absoluto + "px";
	}
}

export function definir_longitud() {
	const periodos = document.getElementById("periodos").children;
	for (let i = 0; i < periodos.length; i++) {
		const periodo = periodos[i];
		const inicio = en_años(JSON.parse(periodo.getAttribute("inicio")));
		const fin = en_años(JSON.parse(periodo.getAttribute("fin")));
		const dif_fecha_periodo = fin - inicio;
		const dif_fecha_total = en_años(máximo) - en_años(mínimo);
		const ancho = 100 / dif_fecha_total * dif_fecha_periodo;
		periodo.setAttribute("ancho", ancho);
	}
}