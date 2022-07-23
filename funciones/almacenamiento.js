// ¡Almacen que no almacena!
const almacén = window.indexedDB;

if (almacén) {
	let bd;
	const petición = almacén.open("líneas", 1);

	petición.onsuccess = () => {
		bd = petición.result;
		// console.log("Base abierta", bd);
	};

	petición.onupgradeneeded = () => {
		bd = petición.result;
		// console.log("Base creada", bd);
		const obj = bd.createObjectStore("líneas");
	};

	petición.onerror = (error) => {
		console.log("Error: ", error);
	};
}