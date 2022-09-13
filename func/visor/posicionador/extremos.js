import { tempo_actual } from "../../modo/editor/cargador.js";
import { guardar_tempo } from "../../util/almacenamiento.js";
import { en_años } from "../../util/elementos.js";

export let máximo;
export let mínimo;

export function actualizar_límites(objeto) {
	actualizar_mínimo(objeto);
	actualizar_máximo(objeto);
}

export function actualizar_mínimo(objeto) {
	if (objeto.inicio)
		comprobar_mínimo(objeto.inicio);
	else
		comprobar_mínimo(objeto.fecha);
}

export function corregir_extremos(objeto) {
	if (en_años(objeto.inicio) === en_años(mínimo)) {
		tempo_actual.inicio = {};
		mínimo = null;
		if (tempo_actual.periodos.length && tempo_actual.eventos.length)
			definir_mínimo(tempo_actual);
	}

	if (en_años(objeto.fin) === en_años(máximo)) {
		tempo_actual.fin = {};
		máximo = null;
		if (tempo_actual.periodos.length && tempo_actual.eventos.length)
			definir_máximo(tempo_actual);
	}
	guardar_tempo(tempo_actual);
}

function comprobar_mínimo(fecha) {
	if (mínimo) {
		if (en_años(mínimo) > en_años(fecha)) {
			mínimo = fecha;
			tempo_actual.inicio = fecha;
		}
	} else
		mínimo = fecha;
}

export function actualizar_máximo(objeto) {
	if (objeto.fin)
		comprobar_máximo(objeto.fin);
	else
		comprobar_máximo(objeto.fecha);
}

function comprobar_máximo(fecha) {
	if (máximo) {
		if (en_años(máximo) < en_años(fecha)) {
			máximo = fecha;
			tempo_actual.fin = fecha;
		}
	} else
		máximo = fecha;
}

export function definir_límites(tempo) {
	if (tempo.inicio.año)
		mínimo = tempo.inicio;
	else
		definir_mínimo(tempo);

	if (tempo.fin.año)
		máximo = tempo.fin;
	else
		definir_máximo(tempo);

	guardar_tempo(tempo);
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