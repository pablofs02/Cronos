const tipo = {
	nombre: "texto", comentario: "texto", grupo: "texto",
	inicio: "fecha", fin: "fecha", fecha: "fecha",
	imagen: "imagen"
};

export function modificar_ventana(id, { título, info }) {
	if (título)
		tomar("título_" + id).textContent = título;
	if (info) {
		const variables = Object.keys(info);
		for (let i = 0; i < variables.length; i++) {
			const variable = variables[i];
			if (tipo[variable] === "fecha") {
				if (info[variable] > 0)
					tomar(variable + "_" + id).value = info[variable];
				else {
					tomar(variable + "_" + id).value = -info[variable];
					tomar(variable + "-AC_" + id).checked = true;
				}
			} else
				tomar(variable + "_" + id).value = info[variable];
		}
	}
}

export function crear_ventana({ id, título, info }) {
	const ventana = crear_base();
	ventana.appendChild(crear_título(id, título));
	ventana.appendChild(crear_cierre(id));
	ventana.appendChild(crear_formulario(id, info));
	ventana.id = id;
	ventana.classList.add("oculto");
	return ventana;
}

function crear_base() {
	const nodo = document.createElement("div");
	nodo.classList.add("ventana_formulario");
	return nodo;
}

function crear_título(id, texto) {
	const título = document.createElement("h2");
	título.classList.add("título_formulario");
	título.textContent = texto;
	título.id = "título_" + id;
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
		formulario.appendChild(crear_sección(id, variables[i]));
	formulario.appendChild(crear_confirmación(id));
	return formulario;
}

function crear_sección(id, variable) {
	const fragmento = document.createDocumentFragment();
	if (tipo[variable] === "texto")
		fragmento.appendChild(crear_entrada_simple(id, variable));
	else if (tipo[variable] === "fecha")
		fragmento.appendChild(crear_entrada_fecha(id, variable));
	else if (tipo[variable] === "imagen")
		fragmento.appendChild(crear_entrada_imagen(id, variable));
	else
		throw new Error("No se puede crear sección desconocida.");
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
	if (forzar) nodo.required = forzar;
	return nodo;
}

function crear_entrada_simple(id, texto) {
	const fragmento = document.createDocumentFragment();
	fragmento.appendChild(crear_etiqueta(texto));
	const entrada = crear_entrada(texto, "text", texto === "nombre");
	entrada.id = texto + "_" + id;
	fragmento.appendChild(entrada);
	fragmento.lastChild.style.gridColumn = "2/5";
	return fragmento;
}

function crear_entrada_fecha(id, texto) {
	const fragmento = document.createDocumentFragment();
	fragmento.appendChild(crear_etiqueta(dignar(texto)));
	const entrada = crear_entrada(texto, "number", true);
	entrada.id = texto + "_" + id;
	fragmento.appendChild(entrada);
	const casilla = crear_entrada(texto + "-AC", "checkbox");
	casilla.id = texto + "-AC_" + id;
	fragmento.appendChild(casilla);
	fragmento.appendChild(crear_etiqueta("AC"));
	return fragmento;
}

function crear_entrada_imagen(id, texto) {
	const fragmento = document.createDocumentFragment();
	fragmento.appendChild(crear_etiqueta(dignar(texto)));
	fragmento.appendChild(crear_entrada(texto, "file"));
	fragmento.lastChild.style.gridColumn = "2/5";
	return fragmento;
}

function crear_confirmación(id) {
	const nodo = document.createElement("button");
	nodo.textContent = "Guardar";
	nodo.id = "confirmar_" + id;
	return nodo;
}

function tomar(id) {
	return document.getElementById(id);
}

function dignar(palabra) {
	return palabra.replace(palabra.charAt(0), palabra.charAt(0).toUpperCase());
}