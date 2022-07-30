import { cargar_visualizador } from "../panel/visualizador.js";
import { tomar_dato } from "../utilidad/almacenamiento.js";

const nombre_tempo = localStorage.getItem("tempo");
const tempo = tomar_dato("Cronos", "líneas_temporales", nombre_tempo);

cargar_visualizador(tempo);