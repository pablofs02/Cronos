import { crear_botones } from "./opciones.js";

export function crear_opciones(tempo) {
	const fragmento = document.createDocumentFragment();
	const botones = crear_botones(tempo);
	fragmento.appendChild(crear_desplegable(botones));
	fragmento.appendChild(botones);
	return fragmento;
}

function crear_desplegable(botones) {
	const ocultador = document.getElementById("ocultador");
	const contenedor = document.createElement("div");
	contenedor.classList.add("contenedor_desplegable_tempo");
	const desplegable = document.createElement("div");
	desplegable.innerHTML = "<i class=\"fa-solid fa-ellipsis-vertical\"></i>";
	desplegable.classList.add("desplegable_tempo");
	contenedor.addEventListener("click", () => {
		ocultador.classList.remove("oculto");
		botones.style.display = "flex";
	});
	ocultador.addEventListener("click", () => {
		if (window.innerHeight < 600) {
			botones.style.display = "none";
			ocultador.classList.add("oculto");
		}
	});
	contenedor.appendChild(desplegable);
	return contenedor;
}

export function crear_elemento(tempo) {
	const nodo = document.createElement("div");
	nodo.classList.add("elemento_tablero");
	nodo.appendChild(crear_imagen(tempo));
	nodo.appendChild(crear_texto(tempo));
	return nodo;
}

function crear_imagen(tempo) {
	const imagen = document.createElement("img");
	if (tempo.imagen)
		imagen.setAttribute("src", tempo.imagen);
	else
		imagen.setAttribute("src", "archivos/logo.png");
	imagen.setAttribute("alt", "Imagen del tempo " + tempo.nombre);
	return imagen;
}

function crear_texto(tempo) {
	const texto = document.createElement("div");
	texto.classList.add("texto_tempo");
	texto.appendChild(crear_título(tempo));
	texto.appendChild(crear_comentario(tempo));
	return texto;
}

function crear_título(tempo) {
	const título = document.createElement("h3");
	título.textContent = tempo.nombre;
	return título;
}

function crear_comentario(tempo) {
	const comentario = document.createElement("p");
	comentario.textContent = tempo.comentario;
	return comentario;
}