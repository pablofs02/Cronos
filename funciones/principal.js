import configurar_editor from "./modo/editor.js";
import configurar_visualización from "./modo/visualizar.js";
import configurar_idioma from "./opciones/idioma.js";
import configurar_tema from "./opciones/tema.js";
import configurar_colección from "./panel/colección.js";
import configurar_visualizador from "./panel/visualizador.js";
import configurar_cabecera from "./utilidad/cabecera.js";
import escuchar_desplacadores from "./utilidad/desplazamiento.js";

try {
	configurar_idioma();
	configurar_tema();
	configurar_cabecera();
} catch (error) {
	console.error("Fallo en la configuración.\n", error);
}
try {
	if (en_colección())
		try {
			configurar_colección();
		} catch (error) {
			console.error("Fallo en la colección.\n", error);
		}
	else if (en_editor() || en_visualizador()) {
		try {
			console.log(en_editor());
			if (en_editor())
				configurar_editor();
			if (en_visualizador())
				configurar_visualización();
		} catch (error) {
			console.error("Fallo en la carga del modo.\n", error);
		}
		try {
			configurar_visualizador();
			escuchar_desplacadores();
		} catch (error) {
			console.error("Fallo en la visualización.\n", error);
		}
	} else
		throw new Error("Sitio web desconocido.");
} catch (error) {
	console.error("Fallo en el panel.\n", error);
}

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
	const dirección = location.href.split("/");
	return dirección[dirección.length - 1];
}