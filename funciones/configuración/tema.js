const botón_tema = document.getElementById("botón_tema");
const nodo_tema = document.getElementById("tema");

const tema_oscuro = "estilos/oscuro.css";
const tema_claro = "estilos/claro.css";

if (!localStorage.getItem("tema"))
	localStorage.setItem("tema", tema_actual());
else
	poner_tema(localStorage.getItem("tema"));

botón_tema.addEventListener("click", () => {
	cambiar_tema();
});

function cambiar_tema() {
	if (tema_actual() === tema_oscuro)
		poner_tema_claro();
	else if (tema_actual() === tema_claro)
		poner_tema_oscuro();
	else
		console.error("Estilo de tema desconocido.");
}

function tema_actual() {
	return nodo_tema.getAttribute("href");
}

function poner_tema(tema) {
	if (tema === tema_oscuro)
		poner_tema_oscuro();
	else if (tema === tema_claro)
		poner_tema_claro();
	else
		console.error("No se puede poner tema desconocido.");
}

function poner_tema_oscuro() {
	const icono_tema_claro = "archivos/vectores/modo_claro.svg";
	const alternativa_tema_claro = "Cambiar a modo claro";

	nodo_tema.setAttribute("href", tema_oscuro);
	botón_tema.setAttribute("src", icono_tema_claro);
	botón_tema.setAttribute("alt", alternativa_tema_claro);

	localStorage.setItem("tema", tema_oscuro);
}

function poner_tema_claro() {
	const icono_tema_oscuro = "archivos/vectores/modo_oscuro.svg";
	const alternativa_tema_oscuro = "Cambiar a modo oscuro";

	nodo_tema.setAttribute("href", tema_claro);
	botón_tema.setAttribute("src", icono_tema_oscuro);
	botón_tema.setAttribute("alt", alternativa_tema_oscuro);

	localStorage.setItem("tema", tema_claro);
}