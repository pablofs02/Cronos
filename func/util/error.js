const errores = {
	configuración: "Error en la configuración.",
	idioma: "Error en el idioma.",
	tema: "Error en el tema.",
	cabecera: "Error en elemento de la cabecera.",
	panel: "Error en el panel.",
	colección: "Error en la colección.",
	visualizador: "Error en el visualizador",
	modo: "Error en la carga del modo.",
	editar: "Error en el editor.",
	visualizar: "Error en la visualización."
};

export default function mensaje(error, lugar) {
	console.error(errores[lugar] + "\n", error);
}