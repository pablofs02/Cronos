import { cargar_visualizador } from "../panel/visualizador.js";
import { tomar_tempo } from "../utilidad/almacenamiento.js";

const base = "Cronos";
const tabla = "Tempos";

const nombre_tempo = sessionStorage.getItem("tempo");

tomar_tempo(base, tabla, nombre_tempo).then((tempo) => {
	cargar_visualizador(tempo);
});

const editar = document.getElementById("editar_tempo");
editar.addEventListener("click", () =>
	location.assign("editor.html"));