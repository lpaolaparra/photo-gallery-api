/**
 * sera la aplicación de servidor
 */

import express from 'express';
import morgan from 'morgan';
import indexRoutes from './routes/index';
import path from 'path';

// el objeto que me devuelve express lo guardo en app
const app = express();

// SETTINGS OUR PROJECT

// voy a utilizar en su configuración de puerto y lo vamos a establecer en un numero
/**
 * Ahora si lo desplegamos en cualquier servicio en la nube, probablemente nos den un puerto, asi que
 * lo querremos tomar
 */
app.set('port',process.env.PORT || 4000);

// MIDDLEWARES

app.use(morgan('dev'));
/**
 * voy a poder entender los datos que me esten enviando y de esta manera poder guardarlos 
 * en una base de datos
 */
app.use(express.json());

// ROUTES
/**
 * Cada vez que se llame la url localhost:4000/api todo lo que llegue a esta ruta
 * va a ser manejado por el archivo que esta ubicado en ./routes/index.ts
 */
app.use('/api',indexRoutes);

// this folder for this application will be used storage public files
// para que las imagenes sean mostradas en el navegador
app.use('/uploads',express.static(path.resolve('uploads')))

export default app;