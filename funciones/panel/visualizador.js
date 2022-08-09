import { en_años } from "../modo/editor.js";
import { cambiar_tempo } from "../utilidad/almacenamiento.js";
import { activar_barra_lateral, actualizar_barra_h, altura_actual, bajar_barra, desactivar_barra_lateral, longitud_visualizador, posición_actual } from "../utilidad/desplazamiento.js";

const inicio = document.getElementById("inicio");
inicio.addEventListener("click", () =>
	location.assign("index.html"));

const mostrador_periodos = document.getElementById("periodos");
const mostrador_eventos = document.getElementById("eventos");

let escala = 100;
let máximo = null;
let mínimo = null;

export default function configurar_visualizador() {
	escuchar_escalador();
	escuchar_vestana();
}

export function cambiar_visualizador(visualizador) {
	cambiar_botones(visualizador.botones);
}

function cambiar_botones(botones) {
	const editar_tempo = document.getElementById("editar_tempo");
	editar_tempo.textContent = botones.editor;
}

function hay_grupos() {
	const periodos = document.getElementById("periodos").childNodes;
	for (let i = 0; i < periodos.length; i++)
		if (periodos[i].getAttribute("grupo") != "_")
			return true;
	return false;
}

let periodos_visitados = [];
let periodos_chocados = [];

const grupos = {};

let altura_grupo_anterior = 0;

export function cargar_visualizador(tempo) {
	limpiar_mostrador();
	definir_límites(tempo);

	if (tempo.periodos)
		añadir_periodos(tempo.periodos);
	if (tempo.eventos)
		añadir_eventos(tempo.eventos);

	actualizar_visualizador();
}

function definir_límites(tempo) {
	if (Object.keys(tempo.inicio).length)
		mínimo = tempo.inicio;
	else
		definir_mínimo(tempo);

	if (Object.keys(tempo.fin).length)
		máximo = tempo.fin;
	else
		definir_máximo(tempo);

	cambiar_tempo("Cronos", "Tempos", tempo);
}

function definir_mínimo(tempo) {
	if (tempo.periodos)
		for (let i = 0; i < tempo.periodos.length; i++)
			actualizar_mínimo(tempo.periodos[i]);

	if (tempo.eventos)
		for (let i = 0; i < tempo.eventos.length; i++)
			actualizar_mínimo(tempo.eventos[i]);

	tempo.inicio = mínimo;
}

function definir_máximo(tempo) {
	if (tempo.periodos)
		for (let i = 0; i < tempo.periodos.length; i++)
			actualizar_máximo(tempo.periodos[i]);

	if (tempo.eventos)
		for (let i = 0; i < tempo.eventos.length; i++)
			actualizar_máximo(tempo.eventos[i]);

	tempo.fin = máximo;
}

export function actualizar_visualizador() {
	añadir_margen();
	actualizar_barra_h(escala);
	definir_posición();
	actualizar_posición();
	definir_longitud();
	actualizar_longitud();
	definir_altitud();
	comprobar_altura();
}

export function desplazar_elementos() {
	const periodos = mostrador_periodos.childNodes;
	for (let i = 0; i < periodos.length; i++) {
		const periodo = periodos[i];
		const posición_base = periodo.getAttribute("pos_x");
		const longitud_total = longitud_visualizador() * 100 / escala;
		const desplazamiento = posición_actual() / 100 * longitud_total;
		const exceso = posición_actual() / 100 * longitud_visualizador();
		const posición_desplazada = posición_base - desplazamiento + exceso;
		periodo.style.left = posición_desplazada + "px";
	}
}

export function elevar_elementos() {
	const periodos = mostrador_periodos.childNodes;
	for (let i = 0; i < periodos.length; i++) {
		const periodo = periodos[i];
		const posición_base = periodo.getAttribute("altura") * 22;
		const long_panel = document.getElementById("mostrador").clientHeight;
		const long_total = (Number(altura_máxima()) + 1) * 22;
		const dif_tot_pan = long_total - long_panel;
		const desplazamiento = altura_actual() / 100 * dif_tot_pan;
		const posición_desplazada = posición_base - desplazamiento;
		periodo.style.bottom = posición_desplazada + "px";
	}
}

function escuchar_escalador() {
	const aumentar = document.getElementById("aumentar");
	aumentar.addEventListener("click", () => {
		if (escala > 10) {
			escala -= 10;
			ajustar_todo();
		}
	});

	const disminuir = document.getElementById("disminuir");
	disminuir.addEventListener("click", () => {
		if (escala < 100) {
			escala += 10;
			ajustar_todo();
		}
	});
}

function escuchar_vestana() {
	window.addEventListener("resize", () =>
		ajustar_todo());
}

function ajustar_todo() {
	actualizar_barra_h(escala);
	actualizar_longitud();
	actualizar_posición();
	desplazar_elementos();
	comprobar_altura();
}

function actualizar_posición() {
	const periodos = mostrador_periodos.childNodes;
	for (let i = 0; i < periodos.length; i++) {
		const periodo = periodos[i];
		const posición_relativa = periodo.getAttribute("posición");
		const posición_absoluta = longitud_visualizador() / 100 * posición_relativa;
		const distancia = posición_absoluta * (100 / escala);
		periodo.setAttribute("pos_x", distancia);
		periodo.style.left = distancia + "px";
	}
}

function definir_posición() {
	const periodos = mostrador_periodos.childNodes;
	for (let i = 0; i < periodos.length; i++) {
		const periodo = periodos[i];
		const inicio = en_años(JSON.parse(periodo.getAttribute("inicio")));
		const dif_max_min = en_años(máximo) - en_años(mínimo);
		const dif_min_per = inicio - en_años(mínimo);
		const distancia = 100 / dif_max_min * dif_min_per;
		periodo.setAttribute("posición", distancia);
	}
}

function actualizar_longitud() {
	const periodos = mostrador_periodos.childNodes;
	for (let i = 0; i < periodos.length; i++) {
		const periodo = periodos[i];
		const ancho_relativo = periodo.getAttribute("ancho");
		const ancho_escalado = ancho_relativo / escala * 100;
		const ancho_pantalla = longitud_visualizador();
		const ancho_absoluto = ancho_escalado / 100 * ancho_pantalla;
		periodo.style.width = ancho_absoluto + "px";
	}
}

function definir_longitud() {
	const periodos = mostrador_periodos.childNodes;
	for (let i = 0; i < periodos.length; i++) {
		const periodo = periodos[i];
		const inicio = en_años(JSON.parse(periodo.getAttribute("inicio")));
		const fin = en_años(JSON.parse(periodo.getAttribute("fin")));
		const dif_fecha_periodo = fin - inicio;
		const dif_fecha_total = en_años(máximo) - en_años(mínimo);
		const ancho = 100 / dif_fecha_total * dif_fecha_periodo;
		periodo.setAttribute("ancho", ancho);
	}
}

function vaciar_chocados() {
	periodos_chocados = periodos_chocados.slice(-1, -1);
}

function vaciar_visitados() {
	periodos_visitados = periodos_visitados.slice(-1, -1);
}

function definir_altitud() {
	const periodos = mostrador_periodos.childNodes;
	const nombres = Object.keys(grupos);
	let primer_grupo = true;
	for (let i = 0; i < nombres.length; i++) {
		const listado = grupos[nombres[i]];
		const etiqueta = crear_etiqueta_grupo(nombres[i], altura_máxima(), primer_grupo);
		primer_grupo = false;
		for (let j = 0; j < listado.length; j++) {
			const periodo = periodos[listado[j]];
			const altitud = calcular_altitud(periodo);
			vaciar_chocados();
			periodos_visitados.push(periodo);
			periodo.setAttribute("altura", altitud);
		}
		altura_grupo_anterior = Number(altura_máxima()) + 1;
		if (nombres[i] != "_")
			actualizar_etiqueta_grupo(etiqueta, altura_grupo_anterior);
		vaciar_visitados();
	}
	actualizar_altitud();
}

function crear_etiqueta_grupo(grupo, altura, primero) {
	const nodo = document.createElement("div");
	nodo.classList.add("grupo");
	const texto = document.createElement("span");
	texto.textContent = grupo;
	nodo.appendChild(texto);
	if (!primero)
		altura++;
	nodo.setAttribute("altura", altura);
	nodo.style.bottom = altura * 22 + "px";
	return nodo;
}

function actualizar_etiqueta_grupo(etiqueta, altura) {
	const etiquetas = document.getElementById("grupos");
	altura -= etiqueta.getAttribute("altura");
	etiqueta.style.height = altura * 22 + "px";
	etiquetas.appendChild(etiqueta);
}

function calcular_altitud(periodo) {
	listar_choques(periodo);
	return primer_espacio(altura_grupo_anterior);
}

function primer_espacio(menor) {
	for (let i = 0; i < periodos_chocados.length; i++)
		if (periodos_chocados[i].getAttribute("altura") == menor)
			return primer_espacio(Number(menor) + 1);
	return menor;
}

function listar_choques(periodo) {
	for (let i = 0; i < periodos_visitados.length; i++) {
		const periodo_v = periodos_visitados[i];
		if (chocan(periodo, periodo_v)) {
			periodos_chocados.push(periodo_v);
		}
	}
}

function chocan(periodo_1, periodo_2) {
	return choque_frontal(periodo_1, periodo_2) || choque_trasero(periodo_1, periodo_2) || choque_total(periodo_1, periodo_2);
}

function choque_total(periodo_1, periodo_2) {
	const inicio_1 = Number(en_años(JSON.parse(periodo_1.getAttribute("inicio"))));
	const inicio_2 = Number(en_años(JSON.parse(periodo_2.getAttribute("inicio"))));
	const fin_1 = Number(en_años(JSON.parse(periodo_1.getAttribute("fin"))));
	const fin_2 = Number(en_años(JSON.parse(periodo_2.getAttribute("fin"))));
	return inicio_1 == inicio_2 && fin_1 == fin_2;
}

function choque_frontal(periodo_1, periodo_2) {
	const inicio_1 = Number(en_años(JSON.parse(periodo_1.getAttribute("inicio"))));
	const inicio_2 = Number(en_años(JSON.parse(periodo_2.getAttribute("inicio"))));
	const fin_2 = Number(en_años(JSON.parse(periodo_2.getAttribute("fin"))));
	return inicio_1 > inicio_2 && inicio_1 < fin_2;
}

function choque_trasero(periodo_1, periodo_2) {
	const inicio_2 = Number(en_años(JSON.parse(periodo_2.getAttribute("inicio"))));
	const fin_1 = Number(en_años(JSON.parse(periodo_1.getAttribute("fin"))));
	const fin_2 = Number(en_años(JSON.parse(periodo_2.getAttribute("fin"))));
	return fin_1 < fin_2 && fin_1 > inicio_2;
}

function actualizar_altitud() {
	const periodos = mostrador_periodos.childNodes;
	for (let i = 0; i < periodos.length; i++) {
		const periodo = periodos[i];
		const altitud = periodo.getAttribute("altura");
		periodo.style.bottom = altitud * 22 + "px";
	}
}

function comprobar_altura() {
	if ((Number(altura_máxima()) + 1) * 22 - 2 > límite_altura()) {
		activar_barra_lateral();
		actualizar_barra_lateral();
	} else
		desactivar_barra_lateral();
	bajar_barra();
	elevar_elementos();
}

function actualizar_barra_lateral() {
	const barra = document.getElementById("barra_vertical");
	const longitud = document.getElementById("desplazador_vertical").clientHeight;
	const altura_visible = (Number(altura_máxima()) + 1) * 22 - 2;
	barra.style.height = longitud * límite_altura() / altura_visible + "px";
}

function límite_altura() {
	return document.getElementById("mostrador").clientHeight;
}

function altura_máxima() {
	const periodos = document.getElementById("periodos").childNodes;
	let máximo = 0;
	for (let i = 0; i < periodos.length; i++) {
		const altura = periodos[i].getAttribute("altura");
		if (Number(altura) > máximo)
			máximo = altura;
	}
	return máximo;
}

function crear_periodo(periodo, id) {
	const nodo = document.createElement("div");
	nodo.textContent = periodo.nombre;
	if (periodo.comentario)
		nodo.title = periodo.nombre + "\n" + periodo.comentario;
	else
		nodo.title = periodo.nombre;
	nodo.setAttribute("class", "periodo");
	nodo.setAttribute("inicio", JSON.stringify(periodo.inicio));
	nodo.setAttribute("fin", JSON.stringify(periodo.fin));
	if (periodo.grupo) {
		nodo.setAttribute("grupo", periodo.grupo);
		agregar_a_grupo(periodo.grupo, id);
	} else {
		nodo.setAttribute("grupo", "_");
		agregar_a_grupo("_", id);
	}
	nodo.style.bottom = 0;
	return nodo;
}

function agregar_a_grupo(grupo, id) {
	if (grupos[grupo]) {
		grupos[grupo].push(id);
	} else {
		grupos[grupo] = [id];
	}
}

function crear_evento(evento) {
	const nodo = document.createElement("div");
	nodo.title = evento.comentario;
	nodo.setAttribute("class", "evento");
	nodo.setAttribute("fecha", evento.fecha);
	return nodo;
}

function añadir_periodos(periodos) {
	const fragmento = document.createDocumentFragment();
	for (let i = 0; i < periodos.length; i++) {
		const periodo = periodos[i];
		const nodo_periodo = crear_periodo(periodo, i);
		fragmento.appendChild(nodo_periodo);
	};
	mostrador_periodos.appendChild(fragmento);
}

function añadir_eventos(eventos) {
	const fragmento = document.createDocumentFragment();
	eventos.forEach(evento => {
		const nodo_evento = crear_evento(evento);
		fragmento.appendChild(nodo_evento);
	});
	mostrador_eventos.appendChild(fragmento);
}

function actualizar_límites(objeto) {
	actualizar_mínimo(objeto);
	actualizar_máximo(objeto);
}

function actualizar_mínimo(objeto) {
	if (objeto.inicio)
		comprobar_mínimo(objeto.inicio);
	else
		comprobar_mínimo(objeto.fecha);
}

function comprobar_mínimo(fecha) {
	if (mínimo) {
		if (en_años(mínimo) > en_años(fecha))
			mínimo = fecha;
	} else
		mínimo = fecha;
}

function actualizar_máximo(objeto) {
	if (objeto.fin)
		comprobar_máximo(objeto.fin);
	else
		comprobar_máximo(objeto.fecha);
}

function comprobar_máximo(fecha) {
	if (máximo) {
		if (en_años(máximo) < en_años(fecha))
			máximo = fecha;
	} else
		máximo = fecha;
}

function añadir_margen() {
	const rango = (en_años(máximo) - en_años(mínimo));
	// máximo = Number(máximo) + 0.05 * rango;
	if (hay_grupos())
		mínimo = en_objeto(en_años(mínimo) - 0.14 * rango);
}

function en_objeto(años) {
	const fecha = {
		año: parseInt(años)
	};
	if (años - fecha.año)
		fecha.mes = parseInt((años - fecha.año) * 12);
	if (años - fecha.año - fecha.mes / 12)
		fecha.día = parseInt((años - fecha.año - fecha.mes / 12) * 365);
	return fecha;
}

function limpiar_mostrador() {
	while (mostrador_periodos.firstChild)
		mostrador_periodos.firstChild.remove();
	while (mostrador_eventos.firstChild)
		mostrador_eventos.firstChild.remove();
}