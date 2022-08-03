import { listar_tempos, guardar_tempo, borrar_tempo } from "../utilidad/almacenamiento.js";

const pantalla_ocultar = document.getElementById("pantalla_ocultar");

const base = "Cronos";
const tabla = "Tempos";

definir_botones_panel();

listar_tempos(base, tabla).then(lista =>
	colocar_lista(lista));

window.addEventListener("resize", () => {
	ajustar_imágenes();
	pantalla_ocultar.classList.add("oculto");
	if (window.innerHeight > 600)
		hacer_rejilla();
	else
		deshacer_rejilla();
});

function deshacer_rejilla() {
	const lista = document.querySelectorAll(".elemento_colección");
	for (let i = 0; i < lista.length; i++)
		lista[i].lastChild.style.display = "none";
}

function hacer_rejilla() {
	const lista = document.querySelectorAll(".elemento_colección");
	for (let i = 0; i < lista.length; i++)
		lista[i].lastChild.style.display = "grid";
}

function definir_botones_panel() {
	definir_cargar_archivo();
	definir_descargar_todo();
	definir_botón_borrar_todo();
}

function definir_cargar_archivo() {
	const cargar = document.getElementById("cargar_real");
	document.getElementById("cargar_tempo").addEventListener("click", () =>
		cargar.click());
	cargar.addEventListener("change", archivos => {
		almacenar_archivos(archivos.target.files);
		location.reload();
	});
}

function definir_descargar_todo() {
	document.getElementById("descargar_todo").addEventListener("click", () =>
		listar_tempos(base, tabla).then(lista => {
			for (let i = 0; i < lista.length; i++)
				descargar_objeto(JSON.stringify(lista[i]), lista[i].nombre);
		}));
}

function definir_botón_borrar_todo() {
	document.getElementById("borrar_todo").addEventListener("click", () =>
		listar_tempos(base, tabla).then(lista =>
			confirmar_todo(lista)));
}

function colocar_lista(lista) {
	if (lista) {
		const colección = document.getElementById("colección");
		const info = document.getElementById("info");
		const fragmento = document.createDocumentFragment();
		const fragmento_info = document.createDocumentFragment();
		for (let i = 0; i < lista.length; i++) {
			const tempo = lista[i];
			const nodo = crear_elemento(tempo);

			const opciones = crear_opciones(tempo);
			nodo.appendChild(opciones);

			const ventana_info = crear_ventana_info(tempo);
			fragmento_info.appendChild(ventana_info);

			nodo.children[0].addEventListener("click", () =>
				mostrar_info(ventana_info));
			nodo.children[1].addEventListener("click", () =>
				mostrar_info(ventana_info));

			fragmento.appendChild(nodo);
		}
		colección.appendChild(fragmento);
		info.appendChild(fragmento_info);

		ajustar_imágenes();
	}
}

function crear_opciones(tempo) {
	const fragmento = document.createDocumentFragment();
	const botones = crear_botones(tempo);
	fragmento.appendChild(crear_desplegable(botones));
	fragmento.appendChild(botones);
	return fragmento;
}

function crear_desplegable(botones) {
	const contenedor = document.createElement("div");
	contenedor.classList.add("contenedor_desplegable_tempo");
	const desplegable = document.createElement("div");
	desplegable.innerHTML = "<i class=\"fa-solid fa-ellipsis-vertical\"></i>";
	desplegable.classList.add("desplegable_tempo");
	contenedor.addEventListener("click", () => {
		pantalla_ocultar.classList.remove("oculto");
		botones.style.display = "flex";
	});
	pantalla_ocultar.addEventListener("click", () => {
		if (window.innerHeight < 600) {
			botones.style.display = "none";
			pantalla_ocultar.classList.add("oculto");
		}
	});
	contenedor.appendChild(desplegable);
	return contenedor;
}

function crear_elemento(tempo) {
	const nodo = document.createElement("div");
	nodo.classList.add("elemento_colección");
	nodo.appendChild(crear_imagen(tempo));
	nodo.appendChild(crear_texto(tempo));
	return nodo;
}

function crear_imagen(tempo) {
	const imagen = document.createElement("img");
	if (tempo.imagen)
		imagen.setAttribute("src", tempo.imagen);
	else
		imagen.setAttribute("src", "archivos/imágenes/logo.png");
	imagen.setAttribute("alt", "Imagen del tempo " + tempo.nombre);
	return imagen;
}

function crear_texto(tempo) {
	const texto = document.createElement("div");
	texto.classList.add("texto_tempo");
	texto.appendChild(crear_título(tempo));
	texto.appendChild(crear_comentario(tempo));
	return texto;
}

function crear_título(tempo) {
	const título = document.createElement("h3");
	título.textContent = tempo.nombre;
	return título;
}

function crear_comentario(tempo) {
	const comentario = document.createElement("p");
	comentario.textContent = tempo.comentario;
	return comentario;
}

function crear_botones(tempo) {
	const opciones = document.createElement("div");
	opciones.classList.add("opciones_tempo");
	opciones.appendChild(crear_editar(tempo));
	opciones.appendChild(crear_borrar(tempo));
	opciones.appendChild(crear_ver(tempo));
	opciones.appendChild(crear_descargar(tempo));
	return opciones;
}

function crear_editar(tempo) {
	const editar = document.createElement("div");
	editar.classList.add("editar");
	editar.innerHTML = "<i class=\"fa-solid fa-pen-to-square\"></i>";
	editar.addEventListener("click", () => editar_tempo(tempo));
	return editar;
}

function crear_borrar(tempo) {
	const borrar = document.createElement("div");
	borrar.classList.add("eliminar");
	borrar.innerHTML = "<i class=\"fa-solid fa-trash-can\"></i>";
	borrar.addEventListener("click", () => confirmar(tempo));
	return borrar;
}

function crear_ver(tempo) {
	const ver = document.createElement("div");
	ver.classList.add("ver");
	ver.innerHTML = "<i class=\"fa-solid fa-eye\"></i>";
	ver.addEventListener("click", () => ver_tempo(tempo));
	return ver;
}

function crear_descargar(tempo) {
	const descargar = document.createElement("div");
	descargar.classList.add("descargar");
	descargar.innerHTML = "<i class=\"fa-solid fa-download\"></i>";
	descargar.addEventListener("click", () =>
		descargar_objeto(JSON.stringify(tempo), tempo.nombre));
	return descargar;
}

function crear_ventana_info(tempo) {
	const ventana = document.createElement("div");
	ventana.classList.add("ventana_info");
	ventana.appendChild(crear_sinopsis(tempo));

	const espacio_vacío = document.createElement("div");
	espacio_vacío.classList.add("no_sé");
	ventana.appendChild(espacio_vacío);

	ventana.classList.add("oculto");
	pantalla_ocultar.addEventListener("click", () =>
		ocultar_info(ventana));

	return ventana;
}

function crear_sinopsis(tempo) {
	const sinopsis = document.createElement("div");
	sinopsis.classList.add("sinopsis");
	sinopsis.appendChild(crear_imagen(tempo));
	sinopsis.appendChild(crear_texto_info(tempo));
	return sinopsis;
}

function crear_texto_info(tempo) {
	const texto = document.createElement("div");
	texto.classList.add("texto_info");
	texto.appendChild(crear_título(tempo));
	const comentario = document.createElement("p");
	comentario.textContent = tempo.comentario;
	texto.appendChild(comentario);
	return texto;
}

function ocultar_info(nodo) {
	nodo.classList.add("oculto");
	pantalla_ocultar.classList.add("oculto");
}

function mostrar_info(nodo) {
	nodo.classList.remove("oculto");
	pantalla_ocultar.classList.remove("oculto");
}

function ajustar_imágenes() {
	const elemento = document.querySelectorAll(".elemento_colección");
	for (let i = 0; i < elemento.length; i++) {
		const imagen = elemento[i].firstChild;
		const altura = imagen.clientHeight;
		imagen.style.width = altura + "px";
	}
}

function editar_tempo(tempo) {
	localStorage.setItem("tempo", tempo.nombre);
	location.assign("editor.html");
}

function confirmar(tempo) {
	if (confirm("¿Estás seguro de que deseas borrarlo?")) {
		borrar_tempo(base, tabla, tempo);
		location.reload();
	}
}

function confirmar_todo(lista) {
	if (confirm("¿Estás seguro de que deseas borrar todos los tempos?"))
		if (confirm("¿De verdad que estás seguro de que deseas borrar TODOS los tempos?")) {
			borrar_todo(lista);
			location.reload();
		}
}

function ver_tempo(tempo) {
	localStorage.setItem("tempo", tempo.nombre);
	location.assign("visualizar.html");
}

function almacenar_archivos(archivos) {
	for (let i = 0; i < archivos.length; i++)
		archivos[i].text().then(texto =>
			guardar_tempo(base, tabla, JSON.parse(texto)));
}

function descargar_objeto(objeto, nombre) {
	const element = document.createElement("a");
	element.setAttribute("href", "data:text/plain," + encodeURIComponent(objeto));
	element.setAttribute("download", nombre + ".json");
	element.click();
}

function borrar_todo(lista) {
	for (let i = 0; i < lista.length; i++)
		borrar_tempo(base, tabla, lista[i]);
}