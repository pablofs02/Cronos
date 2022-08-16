export function crear_botón(id, contenido) {
	const botón = document.createElement("button");
	botón.classList.add("botón");
	botón.textContent = contenido;
	botón.id = id;
	return botón;
}