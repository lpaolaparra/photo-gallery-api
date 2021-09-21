/**
 * Archivo encargado de arrancar la aplicación
 */
import app from "./app";
import { startConnection } from "./database";

/**
 * app quiero que escuches por el puerto 3000 y una vez inicia, ejecute
 * la siguiente función
 */

async function main() {
    startConnection();
    // para usar el puerto que se ajusto en app
    await app.listen(app.get('port'));
    console.log('Server on port', app.get('port'));
}

main();

// en vez de utilizar un callback, voy a usar una función llamada main


