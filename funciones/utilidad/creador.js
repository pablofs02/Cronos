import { guardar_tempo, tomar_tempo } from "./almacenamiento.js";

insertar_creador();

const creador = document.getElementById("creador");
const entrada_creador = document.getElementById("formulario_guardado");
const cerrar_creador = document.getElementById("cerrar_guardado");
const nuevo_tempo = document.getElementById("nuevo_tempo");

const base = "Cronos";
const tabla = "Tempos";

entrada_creador.addEventListener("submit", (e) => {
	e.preventDefault();
	const tempo = {
		nombre: "Tempo",
		comentario: "",
		imagen: "",
		periodos: [],
		eventos: []
	};
	if (e.target.nombre.value) {
		tempo.nombre = e.target.nombre.value;
		tomar_tempo(base, tabla, tempo.nombre).then(existe => {
			if (!existe) {
				if (e.target.comentario.value)
					tempo.comentario = e.target.comentario.value;
				if (e.target.imagen.value) {
					const archivo = e.target.imagen.files[0];
					const lector = new FileReader();
					lector.onload = function (e) {
						tempo.imagen = e.target.result;
						almacenar(tempo);
					};
					lector.readAsDataURL(archivo);
				} else
					almacenar(tempo);
			}
		});
	}
});

creador.addEventListener("click", () =>
	mostrar_creador());

cerrar_creador.addEventListener("click", () =>
	ocultar_creador());

function almacenar(tempo) {
	guardar_tempo(base, tabla, tempo);
	localStorage.setItem("tempo", tempo.nombre);
	setTimeout(() => location.assign("editor.html"), 200);
}

function mostrar_creador() {
	nuevo_tempo.classList.remove("oculto");
}

function ocultar_creador() {
	nuevo_tempo.classList.add("oculto");
	entrada_creador.reset();
}

function insertar_creador() {
	const nodo = crear_nodo_creador();
	nodo.appendChild(crear_título());
	nodo.appendChild(crear_cierre());
	nodo.appendChild(crear_formulario());
	document.body.appendChild(nodo);
}

function crear_nodo_creador() {
	const nodo = document.createElement("div");
	nodo.id = "nuevo_tempo";
	nodo.classList.add("ventana_formulario");
	nodo.classList.add("oculto");
	return nodo;
}

function crear_título() {
	const nodo = document.createElement("h2");
	nodo.classList.add("título_formulario");
	nodo.textContent = "Tempo Nuevo";
	return nodo;
}

function crear_cierre() {
	const nodo = document.createElement("button");
	nodo.id = "cerrar_guardado";
	nodo.classList.add("cerrar");
	nodo.textContent = "X";
	return nodo;
}

function crear_formulario() {
	const nodo = document.createElement("form");
	nodo.id = "formulario_guardado";
	nodo.classList.add("entrada");
	nodo.appendChild(crear_sección("Nombre", "text"));
	nodo.appendChild(crear_sección("Comentario", "text"));
	nodo.appendChild(crear_sección("Imagen", "file"));
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