export function crear_botón(id, contenido) {
	const botón = document.createElement("button");
	botón.classList.add("botón");
	botón.textContent = contenido;
	botón.id = id;
	return botón;
}

export function en_años(fecha) {
	let tiempo = fecha.año;
	if (fecha.mes)
		tiempo += Number(fecha.mes / 12);
	if (fecha.día)
		tiempo += Number(fecha.día / 365);
	return tiempo;
}