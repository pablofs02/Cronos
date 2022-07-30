export function guardar_dato(base, tabla, dato) {
	acceder_almacén("guardar", { base, tabla, dato });
}

export function tomar_dato(base, tabla, dato) {
	return acceder_almacén("tomar", { base, tabla, dato });
}

export function listar_datos(base, tabla) {
	return acceder_almacén("listar", { base, tabla });
}

export function cambiar_dato(base, tabla, dato) {
	acceder_almacén("cambiar", { base, tabla, dato });
}

export function borrar_dato(base, tabla, dato) {
	acceder_almacén("borrar", { base, tabla, dato });
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
			} else if (operación === "tomar") {
				const transacción = base_de_datos.transaction([tabla], "readonly");
				const almacén = transacción.objectStore(tabla);
				const petición_tomar = almacén.get(dato);

				petición_tomar.onsuccess = () => {
					const objeto = petición_tomar.result;
					if (objeto)
						return objeto;
					else
						console.error("No existe un objeto asociada a esa clave.");
				};
			} else if (operación === "listar") {
				const transacción = base_de_datos.transaction([tabla], "readonly");
				const almacén = transacción.objectStore(tabla);
				const petición_listar = almacén.openCursor();
				const lista = [];

				petición_listar.onsuccess = (objeto) => {
					const cursor = objeto.target.result;
					if (cursor) {
						lista.push(cursor.value);
						cursor.continue();
					}
				};

				return lista;
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