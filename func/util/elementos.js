export function crear_botón(id, contenido) {
	const botón = document.createElement("button");
	botón.classList.add("botón");
	botón.textContent = contenido;
	botón.id = id;
	return botón;
}

export function crear_div(id) {
	const div = document.createElement("div");
	div.id = id;
	return div;
}

export function en_años(fecha) {
	let tiempo = Number(fecha.año);
	if (fecha.mes)
		tiempo += Number(fecha.mes / 12);
	if (fecha.día)
		tiempo += Number(fecha.día / 365);
	return tiempo;
}

export function en_objeto(año) {
	const fecha = {
		año: parseInt(año)
	};
	if (año - fecha.año)
		fecha.mes = parseInt((año - fecha.año) * 12);
	if (año - fecha.año - fecha.mes / 12)
		fecha.día = parseInt((año - fecha.año - fecha.mes / 12) * 365);
	return fecha;
}

export function desunizar(variable) {
	return variable.substring(0, variable.length - 2);
}