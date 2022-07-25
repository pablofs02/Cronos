export function guardar_dato(dato, tabla, base) {
	const base_de_datos_indexada = indexedDB;

	if (base_de_datos_indexada) {
		let base_de_datos;
		const petición = base_de_datos_indexada.open(base, 1);

		petición.onsuccess = () => {
			base_de_datos = petición.result;
			console.log("Base abierta", base_de_datos);
			const transacción = base_de_datos.transaction([tabla], "readwrite");
			const almacén = transacción.objectStore(tabla);
			almacén.add(dato);
			console.log("Guardado: ", dato);
		};

		petición.onupgradeneeded = () => {
			base_de_datos = petición.result;
			console.log("Base creada", base_de_datos);
			base_de_datos.createObjectStore(tabla, {
				keyPath: "nombre"
			});
		};

		petición.onerror = (error) => {
			console.error(error);
		};
	}
}