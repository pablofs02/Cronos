import { cargar_visualizador } from "../panel/visualizador.js";
import { tomar_tempo } from "../util/almacenamiento.js";

const base = "Cronos";
const tabla = "Tempos";

export default function configurar_visualización() {
	const nombre_tempo = localStorage.getItem("tempo");
	tomar_tempo(base, tabla, nombre_tempo).then((tempo) => {
		cargar_visualizador(tempo);
	});
	escuchar_botones();
}

function escuchar_botones() {
	const editar = document.getElementById("editar_tempo");
	editar.addEventListener("click", () =>
		location.assign("editar.html"));
}