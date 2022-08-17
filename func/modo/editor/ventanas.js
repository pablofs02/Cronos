export function escuchar_formularios() {
	escuchar_formulario_periodo();
	escuchar_formulario_evento();
}

function cerrar_ventanas() {
	ocultar_ventanas();
	restablecer();
}

function restablecer() {
	restablecer_periodo();
	restablecer_evento();
}

function mostrar_ventana_periodo() {
	const ventana_periodo = document.getElementById("periodo");
	ventana_periodo.classList.remove("oculto");
}

function mostrar_ventana_evento() {
	const ventana_evento = document.getElementById("evento");
	ventana_evento.classList.remove("oculto");
}

function ocultar_ventanas() {
	ocultar_ventana_periodo();
	ocultar_ventana_evento();
}

function ocultar_ventana_periodo() {
	const ventana_periodo = document.getElementById("periodo");
	ventana_periodo.classList.add("oculto");
	ventana_periodo.classList.remove("editando");
}

function ocultar_ventana_evento() {
	const ventana_evento = document.getElementById("evento");
	ventana_evento.classList.add("oculto");
	ventana_evento.classList.remove("editando");
}

function restablecer_periodo() {
	const formulario_periodo = document.getElementById("formulario_periodo");
	formulario_periodo.reset();
}

function restablecer_evento() {
	const formulario_evento = document.getElementById("formulario_evento");
	formulario_evento.reset();
}

function escuchar_formulario_periodo() {
	const formulario_periodo = document.getElementById("formulario_periodo");
	const cerrar_periodo = document.getElementById("cerrar_periodo");

	formulario_periodo.addEventListener("submit", (e) => {
		e.preventDefault();
		const periodo = crear_periodo(e);
		if (en_años(periodo.fin) > en_años(periodo.inicio)) {
			tempo_actual.periodos.push(periodo);
			visualizar_tempo(tempo_actual);
			if (editando_periodo())
				borrar_periodo_anterior();
			guardar_tempo(tempo_actual);
			setTimeout(() => {
				location.reload();
			}, 200);
			restablecer_periodo();
		} else
			alert("¡El fin del periodo no puede se anterior al inicio!");
	});

	cerrar_periodo.addEventListener("click", () => {
		ocultar_ventana_periodo();
		restablecer_periodo();
	});
}

function escuchar_formulario_evento() {
	const formulario_evento = document.getElementById("formulario_evento");
	const cerrar_evento = document.getElementById("cerrar_evento");

	formulario_evento.addEventListener("submit", (e) => {
		e.preventDefault();
		const evento = crear_evento(e);
		tempo_actual.eventos.push(evento);
		visualizar_tempo(tempo_actual);
		if (editando_evento())
			borrar_evento_anterior();
		guardar_tempo(tempo_actual);
		setTimeout(() => {
			location.reload();
		}, 200);
		restablecer_evento();
	});

	cerrar_evento.addEventListener("click", () => {
		ocultar_ventana_evento();
		restablecer_evento();
	});
}