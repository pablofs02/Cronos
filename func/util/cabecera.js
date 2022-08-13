import { cargar_tablero } from "../modo/tablero.js";
import { borrar_tempo, guardar_tempo, tomar_tempo } from "./almacenamiento.js";
import { modificar_ventana } from "../ventanas/formulario.js";

const base = "Cronos";
const tabla = "Tempos";

export function configurar_cabecera() {
	escuchar_botón_tablero();
	escuchar_formulario_tempo();
}

export function cambiar_cabecera(cabecera) {
	cambiar_inicio(cabecera.inicio);
	cambiar_botones(cabecera.botones);
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

function escuchar_botón_tablero() {
	const tablero = document.getElementById("b_tablero");
	tablero.addEventListener("click", () => {
		cargar_tablero();
	});
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
		tomar_tempo(base, tabla, tempo.nombre).then(existe => {
			if (!existe || tempo.nombre == sessionStorage.getItem("tempo")) {
				if (e.target.comentario.value)
					tempo.comentario = e.target.comentario.value;
				if (document.getElementById("tempo").classList.contains("editando"))
					tomar_tempo(base, tabla, sessionStorage.getItem("tempo")).then(act => {
						tempo.periodos = act.periodos;
						tempo.eventos = act.eventos;
						if (e.target.imagen.files[0]) {
							const archivo = e.target.imagen.files[0];
							const lector = new FileReader();
							lector.onload = function (e) {
								tempo.imagen = e.target.result;
								borrar_tempo(base, tabla, act);
								almacenar(tempo);
							};
							lector.readAsDataURL(archivo);
						} else {
							tempo.imagen = act.imagen;
							borrar_tempo(base, tabla, act);
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
			} else
				alert("Ese nombre ya está en uso.");
		});
	});

	botón_nuevo_tempo.addEventListener("click", () => {
		modificar_ventana("tempo", { título: "Nuevo Tempo" });
		mostrar_ventana_tempo();
	});

	cerrar_tempo.addEventListener("click", () =>
		ocultar_ventana_tempo());
}

function almacenar(tempo) {
	guardar_tempo(base, tabla, tempo);
	sessionStorage.setItem("tempo", tempo.nombre);
	formulario_tempo.reset();
	setTimeout(() => location.assign("editar.html"), 200);
}

function mostrar_ventana_tempo() {
	const ventana_tempo = document.getElementById("tempo");
	ventana_tempo.classList.remove("oculto");
}

function ocultar_ventana_tempo() {
	const ventana_tempo = document.getElementById("tempo");
	ventana_tempo.classList.add("oculto");
	ventana_tempo.classList.remove("editando");
}