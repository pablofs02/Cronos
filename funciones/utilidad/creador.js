import { guardar_tempo, tomar_tempo } from "./almacenamiento.js";
import { crear_ventana } from "./formulario.js";

const ventana = {
	título: "Nuevo Tempo",
	id: "creador",
	info: ["nombre", "comentario", "imagen", "listo"]
};
const creador = crear_ventana(ventana);
creador.id = "nuevo_tempo";
creador.classList.add("oculto");
document.body.appendChild(creador);

const botón_creador = document.getElementById("creador");
const entrada_creador = document.getElementById("formulario_creador");
const cerrar_creador = document.getElementById("cerrar_creador");
const nuevo_tempo = document.getElementById("nuevo_tempo");

const base = "Cronos";
const tabla = "Tempos";

entrada_creador.addEventListener("submit", (e) => {
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
	});
});

botón_creador.addEventListener("click", () =>
	mostrar_creador());

cerrar_creador.addEventListener("click", () =>
	ocultar_creador());

function almacenar(tempo) {
	guardar_tempo(base, tabla, tempo);
	sessionStorage.setItem("tempo", tempo.nombre);
	setTimeout(() => location.assign("editor.html"), 200);
}

function mostrar_creador() {
	nuevo_tempo.classList.remove("oculto");
}

function ocultar_creador() {
	nuevo_tempo.classList.add("oculto");
	entrada_creador.reset();
}