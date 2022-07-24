// ¡Refactorizar e implementar los idiomas!
export default function cambiar_idioma(idioma) {
	const lang = {
		"deutsch": "de", "english": "en", "español": "es", "français": "fr", "italiano": "it", "português": "pt", "中文": "zh", "日本語": "ja", "한국어": "ko"
	};
	const banderas = {
		"español": "es", "english": "uk", "français": "fr", "deutsch": "de", "italiano": "it", "português": "pt", "中文": "cn", "日本語": "jp", "한국어": "kr"
	};

	// Poner la bandera del idioma en el botón del cambio de idioma.
	const nodo_bandera = document.getElementById("botón_idioma");
	nodo_bandera.setAttribute("src", "archivos/imágenes/banderas/" + banderas[idioma] + ".png");

	// Ponemos la página web en el idioma correspondiente.
	document.querySelector("html").setAttribute("lang", lang[idioma]);
}