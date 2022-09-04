import { configurar_idioma } from "./config/idioma.js";
import { cargar_editor } from "./modo/editor/cargador.js";
import { cargar_vista } from "./modo/vista/cargador.js";
import { cargar_tablero } from "./modo/tablero/cargador.js";
import { configurar_cabecera } from "./util/cabecera.js";
import { cargar_formularios } from "./ventanas/formulario.js";
import { cargar_ventana_info } from "./ventanas/info.js";

configurar_idioma();

cargar_formularios();
cargar_ventana_info();

configurar_cabecera();

const modo = sessionStorage.getItem("modo");

if (!modo || modo == "tablero")
	cargar_tablero();
else if (modo == "editor")
	cargar_editor();
else if (modo == "vista")
	cargar_vista();
else
	throw new Error("Modo de panel desconocido.");