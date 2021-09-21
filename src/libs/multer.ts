/**
 * Solo para saber que aqui esta la configuración de multer
 */

import multer from "multer";
import {v4 as uuid} from "uuid";
import  path  from "path";

// permite poder decirle en donde quiero que coloque las imagenes
// en especifico de uploads
// y multer es el encargo de subir las imagenes

/**
 * destination toma la carpeta desde la raiz de todo el proyecto
 * con filename vamos a poder empezar a renombrar los archivos que reciba, es decir,
 * cuando un usuario suba una imagen a este servidor, el va a darnos un archivo con un nombre
 * pero que pasa si otro usuario nos sube otro archivo que tiene el mismo nombre
 * no podemos sobreescribirlo, lo que vamos hacer es que internamente vamos a renombrar
 * los archivos o las fotos y de esa forma seran unicos cada uno de esos archivos
 * 
 * necesitamos pasarle un id, para eso usamo un modulo de npm uuid, el cual genera un
 * string aleatorio, el cual va a servir para colocarle el nombre a los archivos.
 * y cada archivo va a tener una extensión
 */
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req,file,cb)=>{
        cb(null, uuid() + path.extname(file.originalname))
    }
})

export default multer({storage}); 
/**
 * cuando yo importe este modulo multer en otros archivos, ya va a estar listo solo para
 * decirle, ok estos son los archivos que vas a aceptar y el resto ya va a saber donde colocarlo
 */