import { listar_tempos } from "../utilidad/almacenamiento.js";

const botón_cargar_línea = document.getElementById("cargar_línea");

botón_cargar_línea.addEventListener("click", () => {
	console.log("Cargando línea...");
});

const base = "Cronos";
const tabla = "líneas_temporales";

listar_tempos(base, tabla).then((lista) => {
	colocar_lista(lista);
});

function colocar_lista(lista) {
	if (lista) {
		const colección = document.getElementById("colección");
		const fragmento = document.createDocumentFragment();
		for (let i = 0; i < lista.length; i++) {
			const línea = lista[i];
			const nodo = document.createElement("div");
			nodo.setAttribute("class", "elemento_colección");
			const imágen = document.createElement("img");
			imágen.setAttribute("src", "archivos/imágenes/logo.png");
			imágen.setAttribute("alt", "Imágen de la línea temporal " + línea.nombre);
			nodo.appendChild(imágen);
			const texto = document.createElement("div");
			const título = document.createElement("h3");
			título.textContent = línea.nombre;
			texto.appendChild(título);
			const comentario = document.createElement("p");
			comentario.textContent = línea.comentario;
			texto.appendChild(comentario);
			nodo.appendChild(texto);

			nodo.addEventListener("click", () => {
				localStorage.setItem("tempo", línea.nombre);
				location.replace("visualizar.html");
			});

			fragmento.appendChild(nodo);
		}
		colección.appendChild(fragmento);
	}
}