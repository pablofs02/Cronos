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
		const info = document.getElementById("info");
		const pantalla_ocultar = document.getElementById("pantalla_ocultar");
		const fragmento = document.createDocumentFragment();
		const fragmento_info = document.createDocumentFragment();
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

			const ventana_info = crear_ventana_info(tempo);
			ventana_info.classList.add("oculto");
			pantalla_ocultar.addEventListener("click", () => {
				ocultar_info(ventana_info);
			});
			fragmento_info.appendChild(ventana_info);

			imágen.addEventListener("click", () => {
				mostrar_info(ventana_info);
			});
			texto.addEventListener("click", () => {
				mostrar_info(ventana_info);

			});

			const opciones = crear_botones(tempo);
			opciones.setAttribute("class", "opciones_tempo");
			nodo.appendChild(opciones);

			fragmento.appendChild(nodo);
		}
		colección.appendChild(fragmento);
		info.appendChild(fragmento_info);
	}
}

function crear_botones(tempo) {
	const opciones = document.createElement("div");
	const editar = document.createElement("div");
	editar.setAttribute("class", "editar");
	editar.innerHTML = "<i class=\"fa-solid fa-pen-to-square\"></i>";
	opciones.appendChild(editar);
	const borrar = document.createElement("div");
	borrar.setAttribute("class", "eliminar");
	borrar.innerHTML = "<i class=\"fa-solid fa-trash-can\"></i>";
	opciones.appendChild(borrar);
	const ver = document.createElement("div");
	ver.setAttribute("class", "ver");
	ver.innerHTML = "<i class=\"fa-solid fa-eye\"></i>";
	opciones.appendChild(ver);
	const descargar = document.createElement("div");
	descargar.setAttribute("class", "descargar");
	descargar.innerHTML = "<i class=\"fa-solid fa-download\"></i>";
	opciones.appendChild(descargar);

	editar.addEventListener("click", () => {
		editar_tempo(tempo);
	});

	borrar.addEventListener("click", () => {
		if (confirm("¿Estás seguro de que deseas borrarlo?")) {
			borrar_tempo(base, tabla, tempo);
			location.reload();
		}
	});

	ver.addEventListener("click", () => {
		ver_tempo(tempo);
	});

	descargar.addEventListener("click", () => {
		descargar_objeto(JSON.stringify(tempo), tempo.nombre);
	});

	return opciones;
}

function crear_ventana_info(tempo) {
	const ventana = document.createElement("div");
	ventana.setAttribute("class", "ventana_info");
	const sinopsis = document.createElement("div");
	sinopsis.setAttribute("class", "sinopsis");
	const imágen = document.createElement("img");
	imágen.src = "archivos/imágenes/logo.png";
	sinopsis.appendChild(imágen);
	const texto = document.createElement("div");
	texto.setAttribute("class", "texto_info");
	const título = document.createElement("h2");
	título.textContent = tempo.nombre;
	texto.appendChild(título);
	const comentario = document.createElement("p");
	comentario.textContent = tempo.comentario;
	texto.appendChild(comentario);
	sinopsis.appendChild(texto);
	const opciones = crear_botones(tempo);
	opciones.setAttribute("class", "opciones_info");
	sinopsis.appendChild(opciones);
	ventana.appendChild(sinopsis);

	const no_sé = document.createElement("div");
	no_sé.setAttribute("class", "no_sé");
	ventana.appendChild(no_sé);

	return ventana;
}

function ocultar_info(info) {
	pantalla_ocultar.classList.add("oculto");
	info.classList.add("oculto");
}

function mostrar_info(ventana) {
	ventana.classList.remove("oculto");
	pantalla_ocultar.classList.remove("oculto");
}

function editar_tempo(tempo) {
	localStorage.setItem("tempo", tempo.nombre);
	location.assign("editor.html");
}

function ver_tempo(tempo) {
	localStorage.setItem("tempo", tempo.nombre);
	location.assign("visualizar.html");
}

function descargar_objeto(objeto, nombre = "tempo") {
	const element = document.createElement("a");
	element.setAttribute("href", "data:text/plain," + encodeURIComponent(objeto));
	element.setAttribute("download", nombre + ".json");
	element.click();
}