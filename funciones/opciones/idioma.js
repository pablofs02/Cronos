import carga_json from "../utilidad/json.js";

const botón_idiomas = document.getElementById("botón_idioma");
const lista_idiomas = document.getElementById("lista_idioma");

const ruta_banderas = "archivos/imágenes/banderas/";
const extensión_bandera = ".png";
const ruta_idioma = "archivos/idiomas/";
const extensión_idioma = ".json";

const idiomas = { "español": "es", "english": "en", "français": "fr", "deutsch": "de", "italiano": "it", "português": "pt", "日本語": "ja", "中文": "zh", "한국어": "ko" };
const idiomas_disponibles = ["español", "english"];

export default function configurar_idioma() {
	definir_idioma_actual();
	crear_listado_idiomas();
	escuchar_botón_idiomas();
}

function escuchar_botón_idiomas() {
	botón_idiomas.addEventListener("click", () =>
		lista_idiomas.classList.toggle("oculto"));
}

function cambiar_idioma(idioma) {
	cambiar_bandera(idioma);
	cambiar_idioma_documento(idioma);
	localStorage.setItem("idioma", idioma);
	const ruta = ruta_idioma + idioma + extensión_idioma;
	carga_json(ruta).then(traductor => {

	});
}

function cambiar_bandera(idioma) {
	const ruta = ruta_banderas + idiomas[idioma] + extensión_bandera;
	botón_idiomas.setAttribute("src", ruta);
}

function cambiar_idioma_documento(idioma) {
	const documento = document.querySelector("html");
	documento.setAttribute("lang", idiomas[idioma]);
}

function definir_idioma_actual() {
	if (localStorage.getItem("idioma"))
		cambiar_idioma(localStorage.getItem("idioma"));
	else
		localStorage.setItem("idioma", idioma_actual());
}

function idioma_actual() {
	const lang = document.querySelector("html").getAttribute("lang");
	const posición = Object.values(idiomas).indexOf(lang);
	return Object.keys(idiomas)[posición];
}

function ocultar_listado() {
	lista_idiomas.classList.add("oculto");
}

function crear_listado_idiomas() {
	const fragmento = document.createDocumentFragment();
	for (const idioma of idiomas_disponibles)
		fragmento.appendChild(crear_elemento_idioma(idioma));
	lista_idiomas.appendChild(fragmento);
}

function crear_elemento_idioma(idioma) {
	const elemento = document.createElement("li");
	elemento.appendChild(crear_imagen_elemento(idioma));
	elemento.appendChild(crear_texto_elemento(idioma));
	elemento.addEventListener("click", () => {
		ocultar_listado();
		cambiar_idioma(idioma);
	});
	return elemento;
}

function crear_imagen_elemento(idioma) {
	const imagen = document.createElement("img");
	const ruta = ruta_banderas + idiomas[idioma] + extensión_bandera;
	imagen.setAttribute("src", ruta);
	return imagen;
}

function crear_texto_elemento(idioma) {
	const texto = document.createElement("span");
	texto.textContent = " " + dignar(idioma);
	return texto;
}

function dignar(palabra) {
	return palabra.charAt(0).toUpperCase() + palabra.substring(1);
}