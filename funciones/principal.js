import configurar_editor from "./modo/editor.js";
import configurar_visualización from "./modo/visualizar.js";
import configurar_idioma from "./opciones/idioma.js";
import configurar_tema from "./opciones/tema.js";
import configurar_colección from "./panel/colección.js";
import configurar_visualizador from "./panel/visualizador.js";
import configurar_cabecera from "./utilidad/cabecera.js";
import escuchar_desplazadores from "./utilidad/desplazamiento.js";
import { en_colección, en_editor, en_visualizador } from "./utilidad/dirección.js";
import mensaje from "./utilidad/error.js";

try {
	try { configurar_idioma(); } catch (error) {
		mensaje(error, "idioma");
	}
	try { configurar_tema(); } catch (error) {
		mensaje(error, "tema");
	}
} catch (error) { mensaje(error, "configuración"); }
try { configurar_cabecera(); } catch (error) {
	mensaje(error, "cabecera");
}
try {
	if (en_colección())
		try { configurar_colección(); } catch (error) {
			mensaje(error, "colección");
		}
	else if (en_editor() || en_visualizador()) {
		try {
			if (en_editor())
				try { configurar_editor(); } catch (error) {
					mensaje(error, "editor");
				}
			if (en_visualizador())
				try { configurar_visualización(); } catch (error) {
					mensaje(error, "visualizar");
				}
		} catch (error) {
			mensaje(error, "modo");
		}
		try {
			configurar_visualizador();
			escuchar_desplazadores();
		} catch (error) {
			mensaje(error, "visualizador");
		}
	} else
		throw new Error("Sitio web desconocido.");
} catch (error) {
	mensaje(error, "panel");
}