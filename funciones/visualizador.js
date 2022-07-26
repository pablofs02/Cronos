// ¿Añadir división por campos en una misma línea temporal?
const visualizador = document.getElementById("visualizador");

function cargar_visualizador(línea_temporal) {
	limpiar_visualizador();

	añadir_periodos(línea_temporal.contenido.periodos);
	añadir_eventos(línea_temporal.contenido.eventos);

	actualizar_visualizador();
}
// ¡Mostrar los diferentes elementos en el visualizador!
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
	nodo.textContent = periodo.nombre;
	nodo.title = periodo.comentario;
	nodo.setAttribute("class", "periodo");
	nodo.style.width = "200px";
	nodo.style.left = "10px";
	nodo.style.bottom = 0;
	return nodo;
}

function crear_evento(evento) {
	const nodo = document.createElement("div");
	nodo.textContent = evento.nombre;
	nodo.title = evento.comentario;
	nodo.setAttribute("class", "evento");
	nodo.style.bottom = "20px";
	nodo.style.left = "25px";
	return nodo;
}

function limpiar_visualizador() {
	while (visualizador.firstChild) {
		visualizador.firstChild.remove();
	}
}

// Para pruebas.
cargar_visualizador(
	{
		contenido: {
			periodos: [{
				nombre: "Nombre del Periodo",
				comentario: "Comentario del periodo que voy a hacer largo para que se vea claramente si funciona.",
				fecha: {
					inicio: 10,
					fin: 30
				}
			}],
			eventos: [{
				nombre: "Nombre del Evento",
				comentario: "Comentario del evento que voy a hacer largo para que se vea claramente si funciona.",
				fecha: 20
			}]
		}
	});