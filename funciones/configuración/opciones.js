// ¡Implementar idiomas y refactorizar!
import cambiar_idioma from "./idioma.js";

export default function configurar_idioma(nodo, idiomas) {
	const banderas = {
		"español": "es", "english": "uk", "français": "fr", "deutsch": "de", "italiano": "it", "português": "pt", "中文": "cn", "日本語": "jp", "한국어": "kr"
	}
	const fragmento = document.createDocumentFragment();

	// Se enlistan los idiomas seleccionados con formato: "IMG(bandera) <idioma>".
	for (const idioma of idiomas) {
		const elemento = document.createElement("LI");
		elemento.setAttribute("value", idioma);
		// Imágen de la bandera.
		const imagen = document.createElement("IMG");
		imagen.setAttribute("src", "archivos/imágenes/banderas/" + banderas[idioma] + ".png");
		elemento.appendChild(imagen);
		// Texto con el idioma.
		const texto = document.createElement("SPAN");
		texto.textContent = " " + idioma.charAt(0).toUpperCase() + idioma.substring(1)
		elemento.appendChild(texto);
		// Función de cambiar a ese idioma.
		elemento.addEventListener("click", () => {
			cambiar_idioma(idioma);
		});

		fragmento.appendChild(elemento);
	}

	nodo.appendChild(fragmento);
}