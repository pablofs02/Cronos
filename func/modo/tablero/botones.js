import { guardar_tempo, listar_tempos } from "../../util/almacenamiento.js";
import { crear_botón } from "../../util/elementos.js";

export function cargar_botones_tablero() {
	if (!estar_cargado_botones_tablero()) {
		const botones = document.getElementById("botones");
		botones.appendChild(cargar_botón_cargar_tempo());
		botones.appendChild(cargar_botón_descargar_todo());
		botones.appendChild(cargar_botón_borrar_todo());
	}
}

function cargar_botón_cargar_tempo() {
	const botón = crear_botón_cargar_tempo();
	botón.addEventListener("click", () =>
		abrir_ventana_de_subida());
	return botón;
}

function crear_botón_cargar_tempo() {
	return crear_botón("cargar_tempo", "Cargar Tempo");
}

function cargar_botón_subida() {
	const entrada = document.createElement("input");
	entrada.type = "file";
	entrada.accept = ".json";
	entrada.multiple = true;
	return entrada;
}

function abrir_ventana_de_subida() {
	const subida = cargar_botón_subida();
	subida.click();
	subida.addEventListener("change", archivos =>
		almacenar_archivos(archivos.target.files));
}

function almacenar_archivos(archivos) {
	for (let i = 0; i < archivos.length; i++)
		archivos[i].text().then(texto =>
			guardar_tempo(JSON.parse(texto)));
}

function cargar_botón_descargar_todo() {
	const botón = crear_botón("descargar_todo", "Descargar Todo");
	botón.addEventListener("click", () =>
		listar_tempos().then(lista => {
			for (let i = 0; i < lista.length; i++)
				descargar_objeto(JSON.stringify(lista[i]), lista[i].nombre);
		}));
	return botón;
}

function cargar_botón_borrar_todo() {
	const botón = crear_botón("borrar_todo", "Borrar Todo");
	botón.addEventListener("click", () =>
		listar_tempos().then(lista =>
			confirmar_todo(lista)));
	return botón;
}

function confirmar_todo(lista) {
	if (confirm("¿Estás seguro de que deseas borrar todos los tempos?"))
		if (confirm("¿De verdad que estás seguro de que deseas borrar TODOS los tempos?"))
			borrar_todo(lista);
}

function borrar_todo(lista) {
	for (let i = 0; i < lista.length; i++)
		borrar_tempo(lista[i]);
}

function estar_cargado_botones_tablero() {
	return document.getElementById("cargar_tempo");
}

export function traducir_botones(botones) {
	const cargar_tempo = document.getElementById("cargar_tempo");
	cargar_tempo.textContent = botones.cargar;
	const descargar_todo = document.getElementById("descargar_todo");
	descargar_todo.textContent = botones.descargar;
	const borrar_todo = document.createElement("borrar_todo");
	borrar_todo.textContent = botones.borrar;
}