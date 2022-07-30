export function guardar_dato(base, tabla, dato) {
	acceder_almacén("guardar", { base, tabla, dato });
}

export function cambiar_dato(base, tabla, dato) {
	acceder_almacén("cambiar", { base, tabla, dato });
}

export function borrar_dato(base, tabla, dato) {
	acceder_almacén("borrar", { base, tabla, dato });
}

export async function tomar_tempo(base, tabla, dato) {
	var base_de_datos = await new Promise((resolver) => {
		var almacén = indexedDB.open(base);
		almacén.onsuccess = () => resolver(almacén.result);
	});

	var tempo = await new Promise((resolver) => {
		var transacción = base_de_datos.transaction([tabla], "readonly");
		var petición = transacción.objectStore(tabla).get(dato);
		petición.onsuccess = () => resolver(petición.result);
	});

	return tempo;
}

export async function listar_tempos(base, tabla) {
	var base_de_datos = await new Promise((resolver) => {
		var almacén = indexedDB.open(base);
		almacén.onsuccess = () => resolver(almacén.result);
	});

	var tempos = await new Promise((resolver) => {
		var transacción = base_de_datos.transaction([tabla], "readonly");
		var petición = transacción.objectStore(tabla).getAll();
		petición.onsuccess = () => resolver(petición.result);
	});

	return tempos;
}

function acceder_almacén(operación, { base, tabla, dato }) {
	const base_de_datos_indexada = indexedDB;

	if (base_de_datos_indexada) {
		let base_de_datos;
		const petición_abrir = base_de_datos_indexada.open(base, 1);

		petición_abrir.onsuccess = () => {
			base_de_datos = petición_abrir.result;
			if (operación === "guardar") {
				const transacción = base_de_datos.transaction([tabla], "readwrite");
				const almacén = transacción.objectStore(tabla);

				almacén.add(dato);
			} else if (operación === "cambiar") {
				const transacción = base_de_datos.transaction([tabla], "readwrite");
				const almacén = transacción.objectStore(tabla);

				almacén.put(dato);
			} else if (operación === "borrar") {
				const transacción = base_de_datos.transaction([tabla], "readwrite");
				const almacén = transacción.objectStore(tabla);

				almacén.delete(dato.nombre);
			} else {
				console.error("Operación desconocida.");
			}
		};

		petición_abrir.onupgradeneeded = () => {
			base_de_datos = petición_abrir.result;
			base_de_datos.createObjectStore(tabla, {
				keyPath: "nombre"
			});
		};
	}
}