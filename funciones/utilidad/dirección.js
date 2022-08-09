export function en_colección() {
	return dirección_actual() === "index.html" || !dirección_actual();
}

export function en_editor() {
	return dirección_actual() === "editor.html";
}

export function en_visualizador() {
	return dirección_actual() === "visualizador.html";
}

function dirección_actual() {
	const dirección = location.href.split("/");
	return dirección[dirección.length - 1];
}