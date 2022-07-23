const visualizador = document.getElementById("visualizador");

export default function cargar_visualizador(línea_temporal) {
	limpiar_visualizador();

	añadir_periodos(línea_temporal.contenido.periodos);
	añadir_eventos(línea_temporal.contenido.eventos);

	actualizar_visualizador();
}

function actualizar_visualizador() {
	// Actualizar elementos para que ocupen el espacio justo.
}

function añadir_periodos(periodos) {
	periodos.forEach(periodo => {
		const nodo_periodo = crear_periodo(periodo);
		visualizador.appendChild(nodo_periodo);
	});
}

function añadir_eventos(eventos) {
	eventos.forEach(evento => {
		const nodo_evento = crear_evento(evento);
		visualizador.appendChild(nodo_evento);
	});
}

function crear_periodo(periodo) {
	const nodo = document.createElement("div");
	return nodo;
}

function crear_evento(evento) {
	const nodo = document.createElement("div");
	return nodo;
}

function limpiar_visualizador() {
	while (visualizador.firstChild) {
		visualizador.firstChild.remove();
	}
}

// Para pruebas.
cargar_visualizador({ contenido: { periodos: [], eventos: [] } });