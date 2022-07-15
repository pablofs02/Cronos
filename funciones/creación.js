const periodo = document.getElementById("insertar-periodo");
const periodo_nuevo = document.getElementById("añadir-periodo");
const cerrar_periodo = document.getElementById("cerrar-periodo-nuevo");
const ventana_formulario_periodo = document.getElementById("ventana_formulario_periodo");

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
periodo_nuevo.addEventListener("click", () => {
	ventana_formulario_periodo.classList.remove("oculto");
	if (!ventana_formulario_evento.classList.contains("oculto")) {
		ventana_formulario_evento.classList.add("oculto");
		evento.reset();
	}
});
cerrar_periodo.addEventListener("click", () => {
	ventana_formulario_periodo.classList.add("oculto");
	periodo.reset();
});

const evento = document.getElementById("insertar-evento");
const evento_nuevo = document.getElementById("añadir-evento");
const cerrar_evento = document.getElementById("cerrar-evento-nuevo");
const ventana_formulario_evento = document.getElementById("ventana_formulario_evento");

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
evento_nuevo.addEventListener("click", () => {
	ventana_formulario_evento.classList.remove("oculto");
	if (!ventana_formulario_periodo.classList.contains("oculto")) {
		ventana_formulario_periodo.classList.add("oculto");
		periodo.reset();
	}
});
cerrar_evento.addEventListener("click", () => {
	ventana_formulario_evento.classList.add("oculto");
	evento.reset();
});