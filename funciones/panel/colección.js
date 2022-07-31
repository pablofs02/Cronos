import { listar_tempos, guardar_tempo, borrar_tempo } from "../utilidad/almacenamiento.js";

const botón_cargar_tempo = document.getElementById("cargar_tempo");
const cargar_tempo_real = document.getElementById("cargar_real");

botón_cargar_tempo.addEventListener("click", () => {
	cargar_tempo_real.click();
});

cargar_tempo_real.addEventListener("change", (archivos) => {
	almacenar_archivos(archivos.target.files);
	location.reload();
});

const botón_descargar_todo = document.getElementById("descargar_todo");

botón_descargar_todo.addEventListener("click", () => {
	listar_tempos(base, tabla).then((lista) => {
		for (let i = 0; i < lista.length; i++) {
			const tempo = lista[i];
			descargar_objeto(JSON.stringify(tempo), tempo.nombre);
		}
	});
});

const botón_borrar_todo = document.getElementById("borrar_todo");

botón_borrar_todo.addEventListener("click", () => {
	listar_tempos(base, tabla).then((lista) => {
		const res = confirm("¿Estás seguro de que deseas borrar todos los tempos?");
		if (res) {
			const res = confirm("¿De verdad que estás seguro de que deseas borrar TODOS los tempos?");
			if (res) {
				for (let i = 0; i < lista.length; i++) {
					const tempo = lista[i];
					borrar_tempo(base, tabla, tempo);
				}
				location.reload();
			}
		}
	});
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
			texto.setAttribute("class", "texto_tempo");
			const título = document.createElement("h3");
			título.textContent = tempo.nombre;
			texto.appendChild(título);
			const comentario = document.createElement("p");
			comentario.textContent = tempo.comentario;
			texto.appendChild(comentario);
			nodo.appendChild(texto);

			imágen.addEventListener("click", () => {
				ver_tempo(tempo);
			});
			texto.addEventListener("click", () => {
				ver_tempo(tempo);
			});

			const opciones = document.createElement("div");
			opciones.setAttribute("class", "opciones_tempo");
			const borrar = document.createElement("div");
			borrar.setAttribute("class", "eliminar");
			borrar.innerHTML = "<i class=\"fa-solid fa-trash-can\"></i>";
			opciones.appendChild(borrar);
			const descargar = document.createElement("div");
			descargar.setAttribute("class", "descargar");
			descargar.innerHTML = "<i class=\"fa-solid fa-download\"></i>";
			opciones.appendChild(descargar);
			nodo.appendChild(opciones);

			borrar.addEventListener("click", () => {
				if (confirm("¿Estás seguro de que deseas borrarlo?")) {
					borrar_tempo(base, tabla, tempo);
					location.reload();
				}
			});
			descargar.addEventListener("click", () => {
				descargar_objeto(JSON.stringify(tempo), tempo.nombre);
			});

			fragmento.appendChild(nodo);
		}
		colección.appendChild(fragmento);
	}
}

function ver_tempo(tempo) {
	localStorage.setItem("tempo", tempo.nombre);
	location.replace("visualizar.html");
}

function descargar_objeto(objeto, nombre = "tempo") {
	const element = document.createElement("a");
	element.setAttribute("href", "data:text/plain," + encodeURIComponent(objeto));
	element.setAttribute("download", nombre + ".json");
	element.click();
}