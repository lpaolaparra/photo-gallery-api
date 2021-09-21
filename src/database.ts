/**
 * Vamos a tener que conectarnos a la base de datos
 */
import { connect } from "mongoose";

export async function startConnection(){
    await connect('mongodb://localhost/photo-gallery-db');
    console.log('Database in connected');

}