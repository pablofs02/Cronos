export function ordenar_elementos(tempo) {
	tempo.periodos = ordenar_periodos(tempo.periodos);
	tempo.eventos = ordenar_eventos(tempo.eventos);
	return tempo;
}

function ordenar_periodos(periodos) {
	return periodos.sort((p1, p2) => {
		const por_inicio = p1.inicio - p2.inicio;
		if (por_inicio)
			return por_inicio;
		const por_nombre = p1.nombre.toLocaleLowerCase() > p2.nombre.toLocaleLowerCase() ? 1 : -1;
		return por_nombre;
	});
}

function ordenar_eventos(eventos) {
	return eventos.sort((e1, e2) => { return e1.inicio - e2.inicio; });
}