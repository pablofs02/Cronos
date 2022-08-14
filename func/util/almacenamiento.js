import { ordenar_elementos } from "./orden.js";

const dependencia = "nombre";
const base = "Cronos";
const tabla = "Tempos";

export function guardar_tempo(tempo) {
	tempo = ordenar_elementos(tempo);
	acceder_almacén("guardar", tempo);
}

export function borrar_tempo(tempo) {
	if (sessionStorage.getItem("tempo") === tempo.nombre)
		sessionStorage.removeItem("tempo");
	acceder_almacén("borrar", tempo);
}

export async function tomar_tempo(id) {
	const base_de_datos = await new Promise((resolver) => {
		const petición = indexedDB.open(base);
		petición.onsuccess = () => resolver(petición.result);
		petición.onupgradeneeded = () => {
			petición.result.createObjectStore(tabla, {
				keyPath: dependencia
			});
		};
	});

	const tempo = await new Promise(resolver => {
		const transacción = base_de_datos.transaction([tabla], "readonly");
		const petición = transacción.objectStore(tabla).get(id);
		petición.onsuccess = () => resolver(petición.result);
	});

	return tempo;
}

export async function listar_tempos() {
	const base_de_datos = await new Promise(resolver => {
		const petición = indexedDB.open(base);
		petición.onsuccess = () => resolver(petición.result);
		petición.onupgradeneeded = () => {
			petición.result.createObjectStore(tabla, {
				keyPath: dependencia
			});
		};
	});

	const tempos = await new Promise(resolver => {
		const transacción = base_de_datos.transaction([tabla], "readonly");
		const petición = transacción.objectStore(tabla).getAll();
		petición.onsuccess = () => resolver(petición.result);
	});

	return tempos;
}

function acceder_almacén(operación, tempo) {
	let base_de_datos;
	const petición = indexedDB.open(base);

	petición.onsuccess = () => {
		base_de_datos = petición.result;
		const transacción = base_de_datos.transaction([tabla], "readwrite");
		const almacén = transacción.objectStore(tabla);
		if (operación === "guardar")
			almacén.put(tempo);
		else if (operación === "borrar")
			almacén.delete(tempo.nombre);
		else
			throw new Error("Operación desconocida.");
	};

	petición.onupgradeneeded = () => {
		base_de_datos = petición.result;
		base_de_datos.createObjectStore(tabla, {
			keyPath: dependencia
		});
	};
}