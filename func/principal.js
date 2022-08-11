import configurar_idioma from "./config/idioma.js";
import configurar_tema from "./config/tema.js";
import cargar_editor from "./modo/editor.js";
import cargar_vista from "./modo/vista.js";
import cargar_tablero from "./panel/tablero.js";
import configurar_cabecera from "./util/cabecera.js";
import mensaje from "./util/error.js";

try {
	try { configurar_idioma(); } catch (error) { mensaje(error, "idioma"); }
	try { configurar_tema(); } catch (error) { mensaje(error, "tema"); }
} catch (error) { mensaje(error, "configuración"); }

try { configurar_cabecera(); } catch (error) { mensaje(error, "cabecera"); }

try {
	const modo = sessionStorage.getItem("modo");

	if (!modo) {
		sessionStorage.setItem("modo", "tablero");
		cargar_tablero();
	}

	if (modo === "tablero")
		cargar_tablero();
	else if (modo === "editor")
		cargar_editor();
	else if (modo === "vista")
		cargar_vista();
	else
		throw new Error("Modo de panel desconocido.");

} catch (error) { mensaje(error, "panel"); }