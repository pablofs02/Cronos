import configurar_idioma from "./config/idioma.js";
import configurar_tema from "./config/tema.js";
import configurar_colección from "./panel/tablero.js";
import configurar_cabecera from "./util/cabecera.js";
import mensaje from "./util/error.js";

try {
	try { configurar_idioma(); } catch (error) { mensaje(error, "idioma"); }
	try { configurar_tema(); } catch (error) { mensaje(error, "tema"); }
} catch (error) { mensaje(error, "configuración"); }

try { configurar_cabecera(); } catch (error) { mensaje(error, "cabecera"); }
try { configurar_colección(); } catch (error) { mensaje(error, "panel"); }