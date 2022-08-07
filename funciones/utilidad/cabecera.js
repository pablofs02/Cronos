import { borrar_tempo, guardar_tempo, tomar_tempo } from "./almacenamiento.js";
import { crear_ventana, modificar_ventana } from "./formulario.js";

export default function configurar_cabecera() {
	escuchar_botón_colección();
	crear_formulario_tempo();
	escuchar_formulario_tempo();
}

function escuchar_botón_colección() {
	const colección = document.getElementById("b_colección");
	colección.addEventListener("click", () =>
		location.assign("index.html"));
}

function crear_formulario_tempo() {
	const ventana = {
		id: "tempo",
		título: "Nuevo Tempo",
		info: ["nombre", "comentario", "imagen"]
	};
	const documento = document.body;
	documento.appendChild(crear_ventana(ventana));
}

function escuchar_formulario_tempo() {
	const botón_nuevo_tempo = document.getElementById("creador");
	const formulario_tempo = document.getElementById("formulario_tempo");
	const cerrar_tempo = document.getElementById("cerrar_tempo");

	const base = "Cronos";
	const tabla = "Tempos";

	formulario_tempo.addEventListener("submit", (e) => {
		e.preventDefault();
		const tempo = {
			nombre: "Tempo",
			comentario: "",
			imagen: "",
			periodos: [],
			eventos: []
		};
		if (e.target.nombre.value)
			tempo.nombre = e.target.nombre.value;
		tomar_tempo(base, tabla, tempo.nombre).then(existe => {
			if (!existe) {
				if (e.target.comentario.value)
					tempo.comentario = e.target.comentario.value;
				if (document.getElementById("tempo").classList.contains("editando"))
					tomar_tempo(base, tabla, sessionStorage.getItem("tempo")).then(act => {
						tempo.periodos = act.periodos;
						tempo.eventos = act.eventos;
						if (e.target.imagen.value) {
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
				formulario_tempo.reset();
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
	setTimeout(() => location.assign("editor.html"), 200);
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