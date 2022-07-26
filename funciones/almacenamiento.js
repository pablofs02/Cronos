export function guardar_dato(base, tabla, dato) {
	acceder_almacén("guardar", { base, tabla, dato });
}

export function tomar_dato(base, tabla, dato) {
	acceder_almacén("tomar", { base, tabla, dato });
}

export function listar_datos(base, tabla) {
	acceder_almacén("listar", { base, tabla });
}

export function cambiar_dato(base, tabla, dato) {
	acceder_almacén("cambiar", { base, tabla, dato });
}

function acceder_almacén(operación, { base, tabla, dato }) {
	const base_de_datos_indexada = indexedDB;

	if (base_de_datos_indexada) {
		let base_de_datos;
		const petición_abrir = base_de_datos_indexada.open(base, 1);

		petición_abrir.onsuccess = () => {
			base_de_datos = petición_abrir.result;
			console.log("Base abierta", base_de_datos);
			if (operación === "guardar") {
				const transacción = base_de_datos.transaction([tabla], "readwrite");
				const almacén = transacción.objectStore(tabla);
				almacén.add(dato);
				console.log("Guardado: ", dato);
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
						console.log(objeto);
					else
						console.error("No existe un objeto asociada a esa clave.");
				};
			} else if (operación === "listar") {
				const transacción = base_de_datos.transaction([tabla], "readonly");
				const almacén = transacción.objectStore(tabla);
				const petición_listar = almacén.openCursor();

				petición_listar.onsuccess = (objeto) => {
					const cursor = objeto.target.result;
					if (cursor) {
						console.log("Dato extraído: ", cursor.value);
						cursor.continue();
					}
				};
			} else {
				console.error("Operación desconocida.");
			}
		};

		petición_abrir.onupgradeneeded = () => {
			base_de_datos = petición_abrir.result;
			console.log("Base creada", base_de_datos);
			base_de_datos.createObjectStore(tabla, {
				keyPath: "nombre"
			});
		};
	}
}