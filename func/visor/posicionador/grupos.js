export let grupos = {};

export function crear_etiqueta_grupo(grupo, altura, primero) {
	const nodo = document.createElement("div");
	nodo.classList.add("grupo");
	if (!primero)
		altura++;
	nodo.setAttribute("altura", altura);
	nodo.style.bottom = altura * 22 + "px";
	return nodo;
}

export function actualizar_etiqueta_grupo(etiqueta, altura) {
	const etiquetas = document.getElementById("grupos");
	altura -= etiqueta.getAttribute("altura");
	etiqueta.style.height = altura * 22 + "px";
	etiquetas.appendChild(etiqueta);
}

export function hay_grupos() {
	const periodos = document.getElementById("periodos").children;
	for (let i = 0; i < periodos.length; i++)
		if (periodos[i].getAttribute("grupo") != "_")
			return true;
	return false;
}

export function agregar_a_grupo(grupo, id) {
	if (grupos[grupo]) {
		grupos[grupo].push(id);
	} else {
		grupos[grupo] = [id];
	}
}

export function vaciar_grupos() {
	grupos = {};
}