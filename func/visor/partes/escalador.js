import { crear_div } from "../../util/elementos.js";
import { ajustar_todo } from "../visor.js";

export let escala = 100;

export function escuchar_escalador() {
	const aumentar = document.getElementById("aumentar");
	aumentar.addEventListener("click", () => {
		if (escala > 10) {
			escala -= 10;
			ajustar_todo();
		}
	});

	const disminuir = document.getElementById("disminuir");
	disminuir.addEventListener("click", () => {
		if (escala < 100) {
			escala += 10;
			ajustar_todo();
		}
	});
}

export function cargar_escalador() {
	const nodo = crear_div("escalador");
	const aumentar = crear_div("aumentar");
	aumentar.classList.add("escalador");
	const mas = document.createElement("span");
	mas.classList.add("más");
	mas.textContent = "+";
	aumentar.appendChild(mas);
	nodo.appendChild(aumentar);
	const disminuir = crear_div("disminuir");
	disminuir.classList.add("escalador");
	const menos = document.createElement("span");
	menos.classList.add("menos");
	menos.textContent = "-";
	disminuir.appendChild(menos);
	nodo.appendChild(disminuir);
	return nodo;
}