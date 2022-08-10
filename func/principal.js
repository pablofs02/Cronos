import configurar_editor from "./modo/editar.js";
import configurar_visualización from "./modo/ver.js";
import configurar_idioma from "./config/idioma.js";
import configurar_tema from "./config/tema.js";
import configurar_colección from "./panel/colección.js";
import configurar_visualizador from "./panel/visualizador.js";
import configurar_cabecera from "./util/cabecera.js";
import escuchar_desplazadores from "./util/desplazamiento.js";
import { en_colección, en_editor, en_visualizador } from "./util/dirección.js";
import mensaje from "./util/error.js";

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