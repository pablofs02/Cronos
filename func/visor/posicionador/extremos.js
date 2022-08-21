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

function comprobar_mínimo(fecha) {
	if (mínimo) {
		if (en_años(mínimo) > en_años(fecha))
			mínimo = fecha;
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
		if (en_años(máximo) < en_años(fecha))
			máximo = fecha;
	} else
		máximo = fecha;
}

export function añadir_margen() {
	const rango = (en_años(máximo) - en_años(mínimo));
	// máximo = Number(máximo) + 0.05 * rango;
	if (hay_grupos())
		mínimo = en_objeto(en_años(mínimo) - 0.14 * rango);
}

export function definir_límites(tempo) {
	if (tempo.inicio)
		mínimo = tempo.inicio;
	else
		definir_mínimo(tempo);

	if (tempo.fin)
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