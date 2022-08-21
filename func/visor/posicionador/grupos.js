function crear_etiqueta_grupo(grupo, altura, primero) {
	const nodo = document.createElement("div");
	nodo.classList.add("grupo");
	const texto = document.createElement("span");
	texto.textContent = grupo;
	nodo.appendChild(texto);
	if (!primero)
		altura++;
	nodo.setAttribute("altura", altura);
	nodo.style.bottom = altura * 22 + "px";
	return nodo;
}

function actualizar_etiqueta_grupo(etiqueta, altura) {
	const etiquetas = document.getElementById("grupos");
	altura -= etiqueta.getAttribute("altura");
	etiqueta.style.height = altura * 22 + "px";
	etiquetas.appendChild(etiqueta);
}

function hay_grupos() {
	const periodos = document.getElementById("periodos").children;
	for (let i = 0; i < periodos.length; i++)
		if (periodos[i].getAttribute("grupo") != "_")
			return true;
	return false;
}

function agregar_a_grupo(grupo, id) {
	if (grupos[grupo]) {
		grupos[grupo].push(id);
	} else {
		grupos[grupo] = [id];
	}
}

function vaciar_chocados() {
	periodos_chocados = periodos_chocados.slice(-1, -1);
}