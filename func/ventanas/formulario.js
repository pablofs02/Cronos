const tipo = {
	nombre: "texto", grupo: "texto",
	comentario: "complejo",
	inicio: "fecha", fin: "fecha", fecha: "fecha",
	imagen: "imagen"
};

export function cargar_formularios() {
	crear_formulario_tempo();
	crear_formulario_periodo();
	crear_formulario_evento();
}

function crear_formulario_tempo() {
	const ventana = {
		id: "tempo",
		título: "Nuevo Tempo",
		info: ["nombre", "comentario", "imagen"]
	};
	const ventanas = document.getElementById("ventanas");
	ventanas.appendChild(crear_ventana(ventana));
}

function crear_formulario_periodo() {
	const ventana = {
		id: "periodo",
		título: "Nuevo Periodo",
		info: ["nombre", "comentario", "grupo", "inicio", "fin"]
	};
	const ventanas = document.getElementById("ventanas");
	ventanas.appendChild(crear_ventana(ventana));
}

function crear_formulario_evento() {
	const ventana = {
		id: "evento",
		título: "Nuevo Evento",
		info: ["nombre", "comentario", "fecha"]
	};
	const ventanas = document.getElementById("ventanas");
	ventanas.appendChild(crear_ventana(ventana));
}

export function modificar_ventana(id, { título, info }) {
	if (título)
		tomar("título_" + id).textContent = título;
	if (info) {
		const variables = Object.keys(info);
		for (let i = 0; i < variables.length; i++) {
			const variable = variables[i];
			if (tipo[variable] === "fecha")
				modificar_ventana_fecha(id, info, variable);
			else
				tomar(variable + "_" + id).value = info[variable];
		}
	}
}

function modificar_ventana_fecha(id, info, variable) {
	const tiempos = Object.keys(info[variable]);
	for (let i = 0; i < tiempos.length; i++) {
		const tiempo = tiempos[i];
		if (info[variable] > 0)
			tomar(variable + "_" + tiempo + "_" + id).value = info[variable][tiempo];
		else {
			tomar(variable + "_" + tiempo + "_" + id).value = -info[variable][tiempo];
			tomar(variable + "-AC_" + id).checked = true;
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
	const nodo = document.createElement("div");
	nodo.classList.add("sección_entrada");
	const etiqueta = crear_etiqueta(dignar(variable));
	etiqueta.classList.add("texto_entrada");
	nodo.appendChild(etiqueta);
	if (tipo[variable] === "texto") {
		const entrada = crear_entrada_simple(id, variable);
		entrada.classList.add("entrada_entrada");
		nodo.appendChild(entrada);
	} else if (tipo[variable] === "complejo") {
		const entrada = crear_entrada_texto(id, variable);
		entrada.classList.add("entrada_entrada");
		nodo.appendChild(entrada);
	} else if (tipo[variable] === "fecha") {
		const entrada = crear_entrada_fecha(id, variable);
		entrada.classList.add("entrada_entrada");
		nodo.appendChild(entrada);
	} else if (tipo[variable] === "imagen") {
		const entrada = crear_entrada_imagen(id, variable);
		entrada.classList.add("entrada_entrada");
		nodo.appendChild(entrada);
	} else
		throw new Error("No se puede crear sección desconocida.");
	return nodo;
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
	const nodo = document.createElement("div");
	const entrada = crear_entrada(texto, "text", texto === "nombre");
	entrada.id = texto + "_" + id;
	nodo.appendChild(entrada);
	nodo.lastChild.style.gridColumn = "2/7";
	return nodo;
}

function crear_entrada_texto(id, texto) {
	const nodo = document.createElement("div");
	const entrada = crear_cuadro_texto(texto);
	entrada.id = texto + "_" + id;
	nodo.appendChild(entrada);
	nodo.lastChild.style.gridColumn = "2/7";
	return nodo;
}

function crear_cuadro_texto(texto) {
	const nodo = document.createElement("textarea");
	nodo.setAttribute("name", texto);
	nodo.setAttribute("cols", 10);
	nodo.setAttribute("rows", 8);
	return nodo;
}

function crear_entrada_fecha(id, texto) {
	const nodo = document.createElement("div");
	const entrada_día = crear_entrada_número(id, texto, "día", false);
	entrada_día.classList.add("día");
	nodo.appendChild(entrada_día);
	nodo.appendChild(crear_separador());
	const entrada_mes = crear_entrada_número(id, texto, "mes", false);
	entrada_mes.classList.add("mes");
	nodo.appendChild(entrada_mes);
	nodo.appendChild(crear_separador());
	const entrada_año = crear_entrada_número(id, texto, "año", true);
	entrada_año.classList.add("año");
	nodo.appendChild(entrada_año);
	const casilla = crear_entrada(texto + "-AC", "checkbox");
	casilla.id = texto + "-AC_" + id;
	nodo.appendChild(casilla);
	nodo.appendChild(crear_etiqueta("AC"));
	return nodo;
}

function crear_separador() {
	const nodo = document.createElement("span");
	nodo.textContent = "/";
	return nodo;
}

function crear_entrada_número(id, texto1, texto2, forzar) {
	const nodo = crear_entrada(texto1 + "_" + texto2, "number", forzar);
	nodo.id = texto1 + "_" + texto2 + "_" + id;
	nodo.placeholder = texto2;
	return nodo;
}

function crear_entrada_imagen(id, texto) {
	const nodo = document.createElement("div");
	nodo.appendChild(crear_entrada(texto, "file"));
	nodo.lastChild.style.gridColumn = "3/7";
	return nodo;
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