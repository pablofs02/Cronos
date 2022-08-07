import { ordenar_elementos } from "./orden.js";

const dependencia = "nombre";

export function guardar_tempo(base, tabla, tempo) {
	tempo = ordenar_elementos(tempo);
	acceder_almacén("guardar", { base, tabla, tempo });
}

export function cambiar_tempo(base, tabla, tempo) {
	tempo = ordenar_elementos(tempo);
	acceder_almacén("cambiar", { base, tabla, tempo });
}

export function borrar_tempo(base, tabla, tempo) {
	if (localStorage.getItem("tempo") === tempo.nombre)
		localStorage.removeItem("tempo");
	acceder_almacén("borrar", { base, tabla, tempo });
}

export async function tomar_tempo(base, tabla, id) {
	const base_de_datos = await new Promise((resolver) => {
		const petición = indexedDB.open(base);
		petición.onsuccess = () => resolver(petición.result);
		petición.onupgradeneeded = () => {
			petición.result.createObjectStore(tabla, {
				keyPath: dependencia
			});
		};
	});

	const tempo = await new Promise((resolver) => {
		const transacción = base_de_datos.transaction([tabla], "readonly");
		const petición = transacción.objectStore(tabla).get(id);
		petición.onsuccess = () => resolver(petición.result);
	});

	return tempo;
}

export async function listar_tempos(base, tabla) {
	const base_de_datos = await new Promise((resolver) => {
		const petición = indexedDB.open(base);
		petición.onsuccess = () => resolver(petición.result);
		petición.onupgradeneeded = () => {
			petición.result.createObjectStore(tabla, {
				keyPath: dependencia
			});
		};
	});

	const tempos = await new Promise((resolver) => {
		const transacción = base_de_datos.transaction([tabla], "readonly");
		const petición = transacción.objectStore(tabla).getAll();
		petición.onsuccess = () => resolver(petición.result);
	});

	return tempos;
}

function acceder_almacén(operación, { base, tabla, tempo }) {
	const base_de_datos_indexada = indexedDB;

	if (base_de_datos_indexada) {
		let base_de_datos;
		const petición_abrir = base_de_datos_indexada.open(base);

		petición_abrir.onsuccess = () => {
			base_de_datos = petición_abrir.result;
			const transacción = base_de_datos.transaction([tabla], "readwrite");
			const almacén = transacción.objectStore(tabla);
			if (operación === "guardar")
				almacén.add(tempo);
			else if (operación === "cambiar")
				almacén.put(tempo);
			else if (operación === "borrar")
				almacén.delete(tempo.nombre);
			else
				throw new Error("Operación desconocida.");
		};

		petición_abrir.onupgradeneeded = () => {
			base_de_datos = petición_abrir.result;
			base_de_datos.createObjectStore(tabla, {
				keyPath: dependencia
			});
		};
	}
}