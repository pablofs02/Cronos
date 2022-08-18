import { listar_tempos } from "../../util/almacenamiento.js";
import { mostrar_info } from "../../ventanas/info.js";
import { cargar_botones_tablero, traducir_botones } from "./botones.js";
import { crear_div } from "../../util/elementos.js";
import { ajustar_imágenes, escuchar_ventana } from "./ventanas.js";
import { crear_elemento, crear_opciones } from "./elementos.js";

export function cargar_tablero() {
	sessionStorage.setItem("modo", "tablero");
	cargar_tablero_en_panel();
	cargar_botones_tablero();
	poner_tempos_en_tablero();
	escuchar_ventana();
}

function poner_tempos_en_tablero() {
	const tablero = document.getElementById("tablero").children;
	if (!tablero.length)
		listar_tempos().then(lista => {
			if (lista.length)
				colocar_lista(lista);
			else {
				colocar_vacío();
				const tablero = document.getElementById("tablero");
				tablero.classList.add("tablero_vacío");
			}
		});
}

function cargar_tablero_en_panel() {
	if (!estar_cargado_tablero_en_panel()) {
		limpiar_panel();
		const panel = document.getElementById("panel");
		panel.appendChild(crear_div("tablero"));
	}
}

function limpiar_panel() {
	document.getElementById("panel").children[1].remove();
	const botones = document.getElementById("botones");
	while (botones.firstChild)
		botones.firstChild.remove();
}

export function traducir_tablero(tablero) {
	traducir_botones(tablero.botones);
}

function colocar_vacío() {
	const tablero = document.getElementById("tablero");
	const contenedor = document.createElement("div");
	contenedor.classList.add("sin_tempos");
	const icono = document.createElement("div");
	icono.innerHTML = "<i class=\"fa-solid fa-circle-xmark\"></i>";
	contenedor.appendChild(icono);
	const texto = document.createElement("div");
	texto.textContent = "No tienes ningún tempo almacenado.";
	contenedor.appendChild(texto);
	tablero.appendChild(contenedor);
}

function colocar_lista(lista) {
	if (lista) {
		const tablero = document.getElementById("tablero");
		const fragmento = document.createDocumentFragment();
		for (let i = 0; i < lista.length; i++) {
			const tempo = lista[i];
			const nodo = crear_elemento(tempo);

			const opciones = crear_opciones(tempo);
			nodo.appendChild(opciones);

			nodo.children[0].addEventListener("click", () =>
				mostrar_info(tempo));
			nodo.children[1].addEventListener("click", () =>
				mostrar_info(tempo));

			fragmento.appendChild(nodo);
		}
		tablero.appendChild(fragmento);

		ajustar_imágenes();
	}
}

function estar_cargado_tablero_en_panel() {
	return document.getElementById("tablero");
}