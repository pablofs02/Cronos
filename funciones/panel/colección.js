import { listar_datos } from "../utilidad/almacenamiento.js";

const botón_cargar_línea = document.getElementById("cargar_línea");

botón_cargar_línea.addEventListener("click", () => {
	console.log("Cargando línea...");
});

colocar_lista();

function colocar_lista() {
	const lista = listar_datos();

	// if (lista) {
	const colección = document.getElementById("colección");
	const fragmento = document.createDocumentFragment();
	for (let i = 0; i < 9; i++) {
		// const línea = lista[i];
		const línea = {
			nombre: "Nombre de la línea temporal",
			comentario: "Comentario muy simple sobre la línea temporal que representa."
		};
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
	// }
}