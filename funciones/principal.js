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

botón_nueva_línea.addEventListener("click", () => {
	console.log("Creando nueva línea...");
});
botón_cargar_línea.addEventListener("click", () => {
	console.log("Cargando línea...");
});
botón_mis_líneas.addEventListener("click", () => {
	console.log("Viendo mis líneas...");
});