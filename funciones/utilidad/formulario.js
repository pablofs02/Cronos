export function crear_ventana({ título, id, info }) {
	const ventana = crear_base();
	ventana.appendChild(crear_título(título));
	ventana.appendChild(crear_cierre(id));
	ventana.appendChild(crear_formulario(id, info));
	return ventana;
}

function crear_base() {
	const nodo = document.createElement("div");
	nodo.classList.add("ventana_formulario");
	return nodo;
}

function crear_título(texto) {
	const título = document.createElement("h2");
	título.classList.add("título_formulario");
	título.textContent = texto;
	return título;
}

function crear_cierre(id) {
	const cierre = document.createElement("button");
	cierre.id = "cerrar_" + id;
	cierre.classList.add("cerrar");
	cierre.textContent = "X";
	return cierre;
}

function crear_formulario(id, info) {
	const formulario = document.createElement("form");
	formulario.id = "formulario_" + id;
	formulario.classList.add("entrada");
	const variables = info;
	for (let i = 0; i < variables.length; i++)
		formulario.appendChild(crear_sección(variables[i]));
	return formulario;
}

function crear_sección(tipo) {
	const fragmento = document.createDocumentFragment();
	const entrada = {
		nombre: "texto", comentario: "texto",
		inicio: "fecha", fin: "fecha", fecha: "fecha",
		imagen: "imagen",
		listo: "listo"
	};
	if (entrada[tipo] === "texto")
		fragmento.appendChild(crear_entrada_simple(tipo));
	else if (entrada[tipo] === "fecha")
		fragmento.appendChild(crear_entrada_fecha(tipo));
	else if (entrada[tipo] === "imagen")
		fragmento.appendChild(crear_entrada_imagen(tipo));
	else if (entrada[tipo] === "listo")
		fragmento.appendChild(crear_confirmación());
	else
		console.error("No se puede agregar la sección desconocida.");
	return fragmento;
}

function crear_etiqueta(texto) {
	const nodo = document.createElement("label");
	nodo.setAttribute("for", texto);
	nodo.textContent = dignar(texto);
	return nodo;
}

function crear_entrada(texto, tipo, forzar = false) {
	const nodo = document.createElement("input");
	nodo.setAttribute("type", tipo);
	nodo.setAttribute("name", texto);
	if (forzar) nodo.required;
	return nodo;
}

function crear_entrada_simple(texto) {
	const fragmento = document.createDocumentFragment();
	fragmento.appendChild(crear_etiqueta(texto));
	fragmento.appendChild(crear_entrada(texto, "text"));
	fragmento.lastChild.style.gridColumn = "2/5";
	return fragmento;
}

function crear_entrada_fecha(texto) {
	const fragmento = document.createDocumentFragment();
	fragmento.appendChild(crear_etiqueta(dignar(texto)));
	fragmento.appendChild(crear_entrada(texto, "number", true));
	fragmento.appendChild(crear_entrada(texto, "checkbox"));
	fragmento.appendChild(crear_etiqueta("AC"));
	return fragmento;
}

function crear_entrada_imagen(texto) {
	const fragmento = document.createDocumentFragment();
	fragmento.appendChild(crear_etiqueta(dignar(texto)));
	fragmento.appendChild(crear_entrada(texto, "file"));
	fragmento.lastChild.style.gridColumn = "2/5";
	return fragmento;
}

function crear_confirmación() {
	const nodo = document.createElement("button");
	nodo.textContent = "Listo";
	return nodo;
}

function dignar(palabra) {
	return palabra.replace(palabra.charAt(0), palabra.charAt(0).toUpperCase());
}