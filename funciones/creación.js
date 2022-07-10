const entrada = document.getElementById("entrada");

entrada.addEventListener("submit", (e) => {
	e.preventDefault();
	const datos = {
		texto: e.target.info.value
	};
	console.log(datos);
	entrada.reset();
});