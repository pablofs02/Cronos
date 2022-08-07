import configurar_editor from "./modo/editor.js";
import configurar_idioma from "./opciones/idioma.js";
import configurar_tema from "./opciones/tema.js";
import configurar_colección from "./panel/colección.js";
import configurar_cabecera from "./utilidad/cabecera.js";

configurar_idioma();
configurar_tema();
configurar_cabecera();

if (en_colección())
configurar_colección();
else if (en_editor() || en_visualizador()) {
	if (en_editor())
		configurar_editor();
} else
	console.error("Sitio web desconocido.");

function en_colección() {
	return dirección_actual() === "index.html" || !dirección_actual();
}

function en_editor() {
	return dirección_actual() === "editor.html";
}

function en_visualizador() {
	return dirección_actual() === "visualizador.html";
}

function dirección_actual() {
	return location.href.split("/")[3];
}