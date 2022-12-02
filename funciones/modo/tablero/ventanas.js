export function escuchar_ventana() {
	const ocultador = document.getElementById("ocultador");
	window.addEventListener("resize", () => {
		ajustar_imágenes();
		ocultador.classList.add("oculto");
		document.getElementById("info").classList.add("oculto");
		if (window.innerHeight > 600)
			hacer_rejilla();
		else
			deshacer_rejilla();
	});
}

function hacer_rejilla() {
	const lista = document.querySelectorAll(".elemento_tablero");
	for (let i = 0; i < lista.length; i++)
		lista[i].lastChild.style.display = "grid";
}

function deshacer_rejilla() {
	const lista = document.querySelectorAll(".elemento_tablero");
	for (let i = 0; i < lista.length; i++)
		lista[i].lastChild.style.display = "none";
}

export function ajustar_imágenes() {
	const elemento = document.querySelectorAll(".elemento_tablero");
	for (let i = 0; i < elemento.length; i++) {
		const imagen = elemento[i].firstChild;
		const altura = imagen.clientHeight;
		imagen.style.width = altura + "px";
	}
}