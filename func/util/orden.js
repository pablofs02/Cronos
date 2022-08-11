import { en_años } from "../modo/editor.js";

export function ordenar_elementos(tempo) {
	tempo.periodos = ordenar_periodos(tempo.periodos);
	tempo.eventos = ordenar_eventos(tempo.eventos);
	return tempo;
}

function ordenar_periodos(periodos) {
	return periodos.sort((p1, p2) => {
		if (p1.grupo && p2.grupo) {
			if (p1.grupo.toLowerCase() > p2.grupo.toLowerCase())
				return 1;
			else if (p1.grupo.toLowerCase() < p2.grupo.toLowerCase())
				return -1;
		} else if (!p1.grupo && p2.grupo)
			return 1;
		else if (p1.grupo && !p2.grupo)
			return -1;

		const por_inicio = en_años(p1.inicio) - en_años(p2.inicio);
		if (por_inicio)
			return por_inicio;
		const por_nombre = p1.nombre.toLowerCase() > p2.nombre.toLowerCase() ? 1 : -1;
		return por_nombre;
	});
}

function ordenar_eventos(eventos) {
	return eventos.sort((e1, e2) => { return e1.inicio - e2.inicio; });
}