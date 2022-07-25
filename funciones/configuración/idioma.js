const botón_idioma = document.getElementById("botón_idioma");
const listado_idioma = document.getElementById("lista_idioma");

const idiomas = {
	"español": "es", "english": "en", "français": "fr", "deutsch": "de", "italiano": "it", "português": "pt", "中文": "zh", "日本語": "ja", "한국어": "ko"
};

const idiomas_disponibles = ["español", "english"];

if (!localStorage.getItem("idioma"))
	localStorage.setItem("idioma", tema_actual());
else
	cambiar_idioma(localStorage.getItem("idioma"));

crear_listado_idiomas();

botón_idioma.addEventListener("click", () => {
	listado_idioma.classList.toggle("oculto");
});

function idioma_actual() {
	const lang = document.querySelector("html").getAttribute("lang");
	const posición = Object.values(idiomas).indexOf(lang);
	return Object.keys(idiomas)[posición];
}

function cambiar_idioma(idioma) {
	botón_idioma.setAttribute("src", "archivos/imágenes/banderas/" + idiomas[idioma] + ".png");
	document.querySelector("html").setAttribute("lang", idiomas[idioma]);
	listado_idioma.classList.toggle("oculto");
	localStorage.setItem("idioma", idioma);
}

function crear_listado_idiomas() {
	const fragmento = document.createDocumentFragment();

	for (const idioma of idiomas_disponibles) {
		const elemento = document.createElement("li");

		const imagen = document.createElement("img");
		imagen.setAttribute("src", "archivos/imágenes/banderas/" + idiomas[idioma] + ".png");
		elemento.appendChild(imagen);

		const texto = document.createElement("span");
		texto.textContent = " " + idioma.charAt(0).toUpperCase() + idioma.substring(1);
		elemento.appendChild(texto);

		elemento.addEventListener("click", () => {
			cambiar_idioma(idioma);
		});

		fragmento.appendChild(elemento);
	}

	listado_idioma.appendChild(fragmento);
}