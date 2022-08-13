export function cargar_ventana_info() {
	const ventana = document.createElement("div");
	ventana.id = "info";
	ventana.appendChild(crear_sinopsis());

	const espacio_vacío = document.createElement("div");
	espacio_vacío.classList.add("no_sé");
	ventana.appendChild(espacio_vacío);

	ventana.classList.add("oculto");
	pantalla_ocultar.addEventListener("click", () =>
		ocultar_info(ventana));

	const formularios = document.getElementById("formularios");
	formularios.appendChild(ventana);
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
	document.getElementById("info").classList.add("oculto");
	pantalla_ocultar.classList.add("oculto");
}

export function mostrar_info(tempo) {
	document.getElementById("info").classList.remove("oculto");
	pantalla_ocultar.classList.remove("oculto");
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