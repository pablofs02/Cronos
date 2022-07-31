import { listar_tempos, guardar_tempo } from "../utilidad/almacenamiento.js";

const botón_cargar_tempo = document.getElementById("cargar_tempo");
const cargar_tempo_real = document.getElementById("cargar_real");

botón_cargar_tempo.addEventListener("click", () => {
	cargar_tempo_real.click();
});

cargar_tempo_real.addEventListener("change", (archivos) => {
	almacenar_archivos(archivos.target.files);
	location.reload();
});

const base = "Cronos";
const tabla = "Tempos";

listar_tempos(base, tabla).then((lista) => {
	colocar_lista(lista);
});


function almacenar_archivos(archivos) {
	for (let i = 0; i < archivos.length; i++) {
		archivos[i].text().then((texto) => {
			const tempo = JSON.parse(texto);
			console.log(tempo);
			guardar_tempo(base, tabla, tempo);
		});
	}
}
function colocar_lista(lista) {
	if (lista) {
		const colección = document.getElementById("colección");
		const fragmento = document.createDocumentFragment();
		for (let i = 0; i < lista.length; i++) {
			const tempo = lista[i];
			const nodo = document.createElement("div");
			nodo.setAttribute("class", "elemento_colección");
			const imágen = document.createElement("img");
			imágen.setAttribute("src", "archivos/imágenes/logo.png");
			imágen.setAttribute("alt", "Imágen del tempo " + tempo.nombre);
			nodo.appendChild(imágen);
			const texto = document.createElement("div");
			const título = document.createElement("h3");
			título.textContent = tempo.nombre;
			texto.appendChild(título);
			const comentario = document.createElement("p");
			comentario.textContent = tempo.comentario;
			texto.appendChild(comentario);
			nodo.appendChild(texto);

			nodo.addEventListener("click", () => {
				localStorage.setItem("tempo", tempo.nombre);
				location.replace("visualizar.html");
			});

			fragmento.appendChild(nodo);
		}
		colección.appendChild(fragmento);
	}
}