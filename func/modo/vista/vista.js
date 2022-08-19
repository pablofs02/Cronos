import { cargar_visor, cargar_tempo } from "../../visor/visor.js";
import { cargar_botones_vista } from "./botones.js";

let tempo_actual;

export function cargar_vista() {
	sessionStorage.setItem("modo", "vista");
	cargar_visor();
	cargar_botones_vista();
	cargar_tempo().then(tempo_almacenado => {
		tempo_actual = tempo_almacenado;
	});
}