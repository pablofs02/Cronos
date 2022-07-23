// ¿Añadir división por campos en una misma línea temporal?
const visualizador = document.getElementById("visualizador");

export default function cargar_visualizador(línea_temporal) {
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

// ¡Crear correcto objeto HTML para eventos y periodos!
function crear_periodo(periodo) {
	const nodo = document.createElement("div");
	nodo.textContent = periodo.nombre;
	nodo.title = periodo.comentario;
	nodo.setAttribute("class", "periodo");
	nodo.style.width = "2000px";
	nodo.style.left = "10px";
	nodo.style.bottom = 0;

	const ej = document.createElement("div");
	ej.textContent = "EJEMPlo";
	ej.setAttribute("class", "periodo");
	ej.title;
	ej.style.width = "2000px";
	ej.style.bottom = "20px";
	ej.style.backgroundColor = "#986";
	ej.style.left = "-500px"
	visualizador.appendChild(ej);
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
cargar_visualizador(
	{
		contenido: {
			periodos: [{
				"nombre": "Nombre del periodo",
				"comentario": "Comentario del periodo",
				"fecha": {
					"inicio": 10,
					"fin": 30
				}
			}],
			eventos: []
		}
	});