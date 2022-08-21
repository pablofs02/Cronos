function actualizar_posición() {
	const periodos = document.getElementById("periodos").children;
	for (let i = 0; i < periodos.length; i++) {
		const periodo = periodos[i];
		const posición_relativa = periodo.getAttribute("posición");
		const posición_absoluta = longitud_visor() / 100 * posición_relativa;
		const distancia = posición_absoluta * (100 / escala);
		periodo.setAttribute("pos_x", distancia);
		periodo.style.left = distancia + "px";
	}
}

function definir_posición() {
	const periodos = document.getElementById("periodos").children;
	for (let i = 0; i < periodos.length; i++) {
		const periodo = periodos[i];
		const inicio = en_años(JSON.parse(periodo.getAttribute("inicio")));
		const dif_max_min = en_años(máximo) - en_años(mínimo);
		const dif_min_per = inicio - en_años(mínimo);
		const distancia = 100 / dif_max_min * dif_min_per;
		periodo.setAttribute("posición", distancia);
	}
}

export function desplazar_elementos() {
	const periodos = document.getElementById("periodos").children;
	for (let i = 0; i < periodos.length; i++) {
		const periodo = periodos[i];
		const posición_base = periodo.getAttribute("pos_x");
		const longitud_total = longitud_visor() * 100 / escala;
		const desplazamiento = posición_actual() / 100 * longitud_total;
		const exceso = posición_actual() / 100 * longitud_visor();
		const posición_desplazada = posición_base - desplazamiento + exceso;
		periodo.style.left = posición_desplazada + "px";
	}
}