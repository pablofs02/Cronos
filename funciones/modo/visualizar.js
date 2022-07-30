import { cargar_visualizador } from "../panel/visualizador.js";
import { tomar_tempo } from "../utilidad/almacenamiento.js";

const base = "Cronos";
const tabla = "líneas_temporales";

const nombre_tempo = localStorage.getItem("tempo");

tomar_tempo(base, tabla, nombre_tempo).then((tempo) => {
	cargar_visualizador(tempo);
});