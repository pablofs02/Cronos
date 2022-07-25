const base_de_datos = indexedDB;

if (base_de_datos) {
	let respuesta;
	const petición = base_de_datos.open("Cronos", 1);

	petición.onsuccess = () => {
		respuesta = petición.result;
		console.log("Base abierta", respuesta);
	};

	petición.onupgradeneeded = () => {
		respuesta = petición.result;
		console.log("Base creada", respuesta);
		const almacén = respuesta.createObjectStore("líneas_temporales");
	};

	petición.onerror = (error) => {
		console.error(error);
	};
}