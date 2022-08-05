export function ordenar_elementos(tempo) {
	tempo.periodos = ordenar_periodos(tempo.periodos);
	tempo.eventos = ordenar_eventos(tempo.eventos);
	return tempo;
}

function ordenar_periodos(periodos) {
	return periodos.sort((p1, p2) => { return p1.inicio - p2.inicio; });
}

function ordenar_eventos(eventos) {
	return eventos.sort((e1, e2) => { return e1.inicio - e2.inicio; });
}