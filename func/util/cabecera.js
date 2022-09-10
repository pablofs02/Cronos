import { cargar_tablero } from "../modo/tablero/cargador.js";
import { borrar_tempo, guardar_tempo, tomar_tempo } from "./almacenamiento.js";
import { modificar_ventana } from "../ventanas/formulario.js";
import { cargar_editor } from "../modo/editor/cargador.js";
import { cerrar_ventanas } from "../modo/editor/ventanas.js";

export function configurar_cabecera() {
	escuchar_botones_cabecera();
	escuchar_formulario_tempo();
}

export function traducir_cabecera(cabecera) {
	cambiar_inicio(cabecera.inicio);
	cambiar_botones(cabecera.botones);
}

function escuchar_botones_cabecera() {
	escuchar_botón_inicio();
	escuchar_botón_tablero();
}

function escuchar_botón_inicio() {
	const inicio = document.getElementById("inicio");
	inicio.addEventListener("click", () =>
		ir_a_tablero());
}

function escuchar_botón_tablero() {
	const tablero = document.getElementById("b_tablero");
	tablero.addEventListener("click", () =>
		ir_a_tablero());
}

function ir_a_tablero() {
	cerrar_ventanas();
	cargar_tablero();
}

function cambiar_inicio(inicio) {
	const logo = document.getElementById("logo");
	logo.setAttribute("alt", inicio.imagen_alt);
}

function cambiar_botones(botones) {
	const mis_tempos = document.getElementById("b_tablero");
	mis_tempos.textContent = botones.tablero;
	const nuevo_tempo = document.getElementById("creador");
	nuevo_tempo.textContent = botones.creador;
}

function escuchar_formulario_tempo() {
	const botón_nuevo_tempo = document.getElementById("creador");
	const formulario_tempo = document.getElementById("formulario_tempo");
	const cerrar_tempo = document.getElementById("cerrar_tempo");

	formulario_tempo.addEventListener("submit", (e) => {
		e.preventDefault();
		const tempo = {
			nombre: "Tempo",
			comentario: "",
			etiquetas: [],
			inicio: {},
			fin: {},
			periodos: [],
			eventos: [],
			imagen: ""
		};
		if (e.target.nombre.value)
			tempo.nombre = e.target.nombre.value;
		tomar_tempo(tempo.nombre).then(existe => {
			if (!existe || (document.getElementById("tempo").classList.contains("editando") && sessionStorage.getItem("modo") != "tablero")) {
				if (e.target.comentario.value)
					tempo.comentario = e.target.comentario.value;
				if (document.getElementById("tempo").classList.contains("editando"))
					tomar_tempo(sessionStorage.getItem("tempo")).then(act => {
						tempo.periodos = act.periodos;
						tempo.eventos = act.eventos;
						if (e.target.imagen.files[0]) {
							const archivo = e.target.imagen.files[0];
							const lector = new FileReader();
							lector.onload = function (e) {
								tempo.imagen = e.target.result;
								borrar_tempo(act);
								almacenar(tempo);
							};
							lector.readAsDataURL(archivo);
						} else {
							tempo.imagen = act.imagen;
							borrar_tempo(act);
							almacenar(tempo);
						}
					});
				else {
					if (e.target.imagen.value) {
						const archivo = e.target.imagen.files[0];
						const lector = new FileReader();
						lector.onload = function (e) {
							tempo.imagen = e.target.result;
							almacenar(tempo);
						};
						lector.readAsDataURL(archivo);
					} else
						almacenar(tempo);
				}
				cerrar_ventanas();
			} else
				alert("Ese nombre ya está en uso.");
		});
	});

	botón_nuevo_tempo.addEventListener("click", () => {
		cerrar_ventanas();
		modificar_ventana("tempo", { título: "Nuevo Tempo" });
		mostrar_ventana_tempo();
	});

	cerrar_tempo.addEventListener("click", () =>
		ocultar_ventana_tempo());
}

function almacenar(tempo) {
	guardar_tempo(tempo);
	sessionStorage.setItem("tempo", tempo.nombre);
	formulario_tempo.reset();
	cargar_editor();
}

export function mostrar_ventana_tempo() {
	const ventana_tempo = document.getElementById("tempo");
	ventana_tempo.classList.remove("oculto");
	document.getElementById("nombre_tempo").focus();
}

export function ocultar_ventana_tempo() {
	const ventana_tempo = document.getElementById("tempo");
	ventana_tempo.classList.add("oculto");
	ventana_tempo.classList.remove("editando");
}