export function crear_ventana(ventana) {
	const nodo = crear_base();
	nodo.appendChild(crear_título(ventana.título));
	nodo.appendChild(crear_cierre(ventana.nombre));
	nodo.appendChild(crear_formulario(ventana));
	return nodo;
}

function crear_base() {
	const nodo = document.createElement("div");
	nodo.classList.add("ventana_formulario");
	nodo.classList.add("oculto");
	return nodo;
}

function crear_título(título) {
	const nodo = document.createElement("h2");
	nodo.classList.add("título_formulario");
	nodo.textContent = título;
	return nodo;
}

function crear_cierre(nombre) {
	const nodo = document.createElement("button");
	nodo.id = "cerrar_" + nombre;
	nodo.classList.add("cerrar");
	nodo.textContent = "X";
	return nodo;
}

function crear_formulario(ventana) {
	const nodo = document.createElement("form");
	nodo.id = "formulario_" + ventana.nombre;
	nodo.classList.add("entrada");
	const variables = ventana.info;
	for (let i = 0; i < variables.length; i++) {
		const elemento = variables[i];
		if (elemento === "nombre")
			nodo.appendChild(crear_sección("Nombre", "text"));
		else if (elemento === "comentario")
			nodo.appendChild(crear_sección("Comentario", "text"));
		else if (elemento === "imagen")
			nodo.appendChild(crear_sección("Imagen", "file"));
		else
			console.error("casilla no implementada");
	}
	nodo.appendChild(crear_subida());
	return nodo;
}

function crear_sección(texto, tipo) {
	const fragmento = document.createDocumentFragment();
	fragmento.appendChild(crear_etiqueta(texto));
	fragmento.appendChild(crear_entrada(texto, tipo));
	return fragmento;
}

function crear_etiqueta(texto) {
	const nodo = document.createElement("label");
	nodo.setAttribute("for", texto.toLowerCase());
	nodo.textContent = texto;
	return nodo;
}

function crear_entrada(texto, tipo) {
	const nodo = document.createElement("input");
	nodo.setAttribute("type", tipo);
	nodo.setAttribute("name", texto.toLowerCase());
	nodo.style.gridColumn = "2/5";
	return nodo;
}

function crear_subida() {
	const nodo = document.createElement("button");
	nodo.textContent = "Listo";
	return nodo;
}