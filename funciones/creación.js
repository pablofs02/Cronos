const periodo = document.getElementById("insertar-periodo");

periodo.addEventListener("submit", (e) => {
	e.preventDefault();
	const data = {
		nombre: e.target.nombre.value,
		comentario: e.target.comentario.value,
		inicio: e.target.inicio.value,
		fin: e.target.fin.value
	};
	if (e.target["inicio-AC"].checked) {
		data.inicio = -data.inicio;
	}
	if (e.target["fin-AC"].checked) {
		data.fin = -data.fin;
	}
	console.log(data);
	periodo.reset();
});

const evento = document.getElementById("insertar-evento");

evento.addEventListener("submit", (e) => {
	e.preventDefault();
	const data = {
		nombre: e.target.nombre.value,
		comentario: e.target.comentario.value,
		fecha: e.target.fecha.value,
	};
	if (e.target["fecha-AC"].checked) {
		data.fecha = -data.fecha;
	}
	console.log(data);
	evento.reset();
});