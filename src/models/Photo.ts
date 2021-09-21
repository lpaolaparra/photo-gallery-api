import { Schema, Document, model } from "mongoose";

const schema = new Schema({
    // trabajamos con el esquema de mongoose, por eso se presenta el String con S
    //mayuscula
    title: String,
    description: String,
    imagePath: String // en donde esta almacenada esa imagen
});

interface IPhoto extends Document {
    // una vez herede la estructura del documento vamos a decirle
    // que todos mi datos tengan lo siguiente.
    // aqui estamos trabajando netamente con TS
    title:string;
    description:string;
    imagePath:string;
}
// lo que hara es crear una coleccion dentro de mongo llamada photos, 
//a partir del schema creado
// este modelo tendra que cumplir con la estructura de la interfaz IPhoto
export default model<IPhoto>('photo',schema);
