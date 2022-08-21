function cargar_mostrador() {
	const mostrador = crear_div("mostrador");
	mostrador.appendChild(crear_div("periodos"));
	mostrador.appendChild(crear_div("eventos"));
	mostrador.appendChild(crear_div("grupos"));
	return mostrador;
}

function crear_periodo(periodo, id) {
	const nodo = document.createElement("div");
	nodo.textContent = periodo.nombre;
	if (periodo.comentario)
		nodo.title = periodo.nombre + "\n" + periodo.comentario;
	else
		nodo.title = periodo.nombre;
	nodo.setAttribute("class", "periodo");
	nodo.setAttribute("inicio", JSON.stringify(periodo.inicio));
	nodo.setAttribute("fin", JSON.stringify(periodo.fin));
	if (periodo.grupo) {
		nodo.setAttribute("grupo", periodo.grupo);
		agregar_a_grupo(periodo.grupo, id);
	} else {
		nodo.setAttribute("grupo", "_");
		agregar_a_grupo("_", id);
	}
	nodo.style.bottom = 0;
	return nodo;
}

function crear_evento(evento) {
	const nodo = document.createElement("div");
	nodo.title = evento.comentario;
	nodo.setAttribute("class", "evento");
	nodo.setAttribute("fecha", evento.fecha);
	return nodo;
}

function añadir_periodos(periodos) {
	const fragmento = document.createDocumentFragment();
	for (let i = 0; i < periodos.length; i++) {
		const periodo = periodos[i];
		const nodo_periodo = crear_periodo(periodo, i);
		fragmento.appendChild(nodo_periodo);
	};
	document.getElementById("periodos").appendChild(fragmento);
}

function añadir_eventos(eventos) {
	const fragmento = document.createDocumentFragment();
	for (let i = 0; i < eventos.length; i++) {
		const evento = eventos[i];
		const nodo_evento = crear_evento(evento);
		fragmento.appendChild(nodo_evento);
	}
	document.getElementById("eventos").appendChild(fragmento);
}