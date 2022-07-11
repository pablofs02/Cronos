const entrada = document.getElementById("entrada");

entrada.addEventListener("submit", (evento) => {
	evento.preventDefault();
	const data = {
		nombre: evento.target.nombre.value,
		comentario: evento.target.comentario.value,
		inicio: evento.target.inicio.value,
		fin: evento.target.fin.value
	};
	console.log(data);
	entrada.reset();
});