export function cargar_ventana_info() {
	const ocultador = document.getElementById("ocultador");
	const ventana = document.createElement("div");
	ventana.id = "info";
	ventana.appendChild(crear_sinopsis());

	const espacio_vacío = document.createElement("div");
	espacio_vacío.classList.add("no_sé");
	ventana.appendChild(espacio_vacío);

	ventana.classList.add("oculto");
	ocultador.addEventListener("click", () =>
		ocultar_info(ventana));

	const ventanas = document.getElementById("ventanas");
	ventanas.appendChild(ventana);
}

function crear_sinopsis() {
	const sinopsis = document.createElement("div");
	sinopsis.classList.add("sinopsis");
	sinopsis.appendChild(crear_imagen_info());
	sinopsis.appendChild(crear_texto_info());
	return sinopsis;
}

function crear_imagen_info() {
	const imagen = document.createElement("img");
	imagen.id = "imagen_info";
	return imagen;
}

function crear_texto_info() {
	const texto = document.createElement("div");
	texto.classList.add("texto_info");
	const título = document.createElement("h3");
	título.id = "título_info";
	texto.appendChild(título);
	const comentario = document.createElement("p");
	comentario.id = "comentario_info";
	texto.appendChild(comentario);
	return texto;
}

export function ocultar_info() {
	const ocultador = document.getElementById("ocultador");
	document.getElementById("info").classList.add("oculto");
	ocultador.classList.add("oculto");
}

export function mostrar_info(tempo) {
	const ocultador = document.getElementById("ocultador");
	document.getElementById("info").classList.remove("oculto");
	ocultador.classList.remove("oculto");
	modificar_info(tempo);
}

export function modificar_info(tempo) {
	const título = document.getElementById("título_info");
	título.textContent = tempo.nombre;
	const comentario = document.getElementById("comentario_info");
	comentario.textContent = tempo.comentario;
	const imagen = document.getElementById("imagen_info");
	if (tempo.imagen)
		imagen.setAttribute("src", tempo.imagen);
	else
		imagen.setAttribute("src", "archivos/logo.png");
}