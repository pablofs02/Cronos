const botón_tema = document.getElementById("botón_tema");
const nodo_tema = document.getElementById("tema");

const tema_oscuro = "oscuro";
const tema_claro = "claro";

const ruta_tema = "estilos/";
const terminación = ".css";

export default function configurar_tema() {
	definir_tema_actual();
	escuchar_botón_tema();
}

function definir_tema_actual() {
	const guardado = localStorage.getItem("tema");
	if (guardado && guardado != tema_actual())
		poner_tema(guardado);
	else if (!guardado)
		localStorage.setItem("tema", tema_actual());
}

function escuchar_botón_tema() {
	botón_tema.addEventListener("click", () =>
		cambiar_tema());
}

function cambiar_tema() {
	if (tema_actual() === tema_oscuro)
		poner_tema_claro();
	else if (tema_actual() === tema_claro)
		poner_tema_oscuro();
	else
		throw new Error("Estilo de tema desconocido.");
}

function tema_actual() {
	const dirección_tema = nodo_tema.getAttribute("href");
	const nombre_archivo = dirección_tema.substring(ruta_tema.length);
	const longitud_tema = nombre_archivo.length - terminación.length;
	const nombre_tema = nombre_archivo.substring(0, longitud_tema);
	return nombre_tema;
}

function poner_tema(tema) {
	if (tema === tema_oscuro)
		poner_tema_oscuro();
	else if (tema === tema_claro)
		poner_tema_claro();
	else
		throw new Error("No se puede poner tema desconocido.");
}

function poner_tema_oscuro() {
	const icono_tema_claro = "archivos/vectores/modo_claro.svg";
	const alternativa_tema_claro = "Cambiar a modo claro";
	const nombre = tema_oscuro + terminación;
	const ruta_tema_oscuro = ruta_tema + nombre;

	nodo_tema.setAttribute("href", ruta_tema_oscuro);
	botón_tema.setAttribute("src", icono_tema_claro);
	botón_tema.setAttribute("alt", alternativa_tema_claro);

	localStorage.setItem("tema", tema_oscuro);
}

function poner_tema_claro() {
	const icono_tema_oscuro = "archivos/vectores/modo_oscuro.svg";
	const alternativa_tema_oscuro = "Cambiar a modo oscuro";
	const nombre = tema_claro + terminación;
	const ruta_tema_claro = ruta_tema + nombre;

	nodo_tema.setAttribute("href", ruta_tema_claro);
	botón_tema.setAttribute("src", icono_tema_oscuro);
	botón_tema.setAttribute("alt", alternativa_tema_oscuro);

	localStorage.setItem("tema", tema_claro);
}