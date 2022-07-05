import carga_json from "./json.js";

// Carga de JSON.
const línea_temporal = carga_json("archivos/hola.json");

línea_temporal.then(datos => {
	console.log(datos);
});

// Botones.
const botón_nueva_línea = document.getElementById("nueva_línea");
const botón_cargar_línea = document.getElementById("cargar_línea");
const botón_mis_líneas = document.getElementById("mis_líneas");

const panel = document.getElementById("panel");

const panel_línea = "paneles/línea.html";
const panel_colección = "paneles/colección.html";

botón_nueva_línea.addEventListener("click", () => {
	panel.setAttribute("src", panel_línea);
});
botón_cargar_línea.addEventListener("click", () => {
	panel.setAttribute("src", panel_colección);
	console.log("Cargando línea...");
});
botón_mis_líneas.addEventListener("click", () => {
	panel.setAttribute("src", panel_colección);
});

// Almacén de datos.
const almacén = window.indexedDB;

let hola = {
	nombre: "yo",
	apellido: "no"
};

if (almacén) {
	let bd;
	const petición = almacén.open("líneas", 1);

	petición.onsuccess = () => {
		bd = petición.result;
		console.log("Base abierta", bd);
	};

	petición.onupgradeneeded = () => {
		bd = petición.result;
		console.log("Base creada", bd);
		const obj = bd.createObjectStore("líneas");
		obj.add(hola);
	};

	petición.onerror = (error) => {
		console.log("Error:", error);
	};
}