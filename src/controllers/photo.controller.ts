/**
 * voy a crear funciones que me permitan crear una foto, eliminar y listar todas
 * las fotos
 * tan solo voy a escribir logica, y posteriormente esa logica, la voy a utilizar 
 * en las rutas
 * 
 * El req y el res son objetos de express por lo tanto es necesario importar el 
 * modulo
 */

import { request, Request,Response } from "express";
import Photo from "../models/Photo";
import path from "path"; // para formater la dirección de donde esta el archivo
import fs from "fs-extra"; // me permite trabajar con los archivos

 export async function createPhoto(req: Request,res: Response): Promise<Response> {
     // dara un respuesta basado en una promesa, primero va hacer algo
     // y una vez obtiene las operaciones va a poder devolver algo

     // para guardar cosas primero debo asegurarme que va a recibir los datos
     //console.log('saving photos');
     //console.log(req.body)  esto para saber si voy a recibir objetos en formato JSON
     /**
      * quiero que mi metodo ademas de recibir texto reciba una foto, ¿ como puedo 
      * subir una imagen en mi aplicación
      * para ello vamos hacer uso de un modulo llamado multer: lo que va hacer es
      * decirle a nuestro servidor que es capaz de subir imagenes
      */
    const { title, description } = req.body
    //console.log(req.file?.path); es un objeto que nos proporciona multer par poder saber
    // la información de la imagen que se esta subiendo
    const newPhoto = {
        title: title,
        description: description,
        imagePath:req.file?.path
    }; 
    /**
     * como guardamos este campos
     * vamos a tener que importar nuestro modelo
     */

    const photo = new Photo(newPhoto);
    console.log(photo);
    await photo.save();

    return res.json({
        message: 'Photo successfully saved',
        photo
    })
 } 

 export async function getPhotos(req: Request, res: Response): Promise<Response>{
    const photos = await Photo.find(); // me retorna todas las fotos que tengo almacenado
    // nos va a devolver un arreglo de fotos
    return res.json(photos);
 } 

 export async function getPhoto(req: Request, res: Response): Promise<Response>{
    // vamos a buscar a traves del modelo de phot un ID
    const {id} = req.params;
    const photo = await Photo.findById(id); // no estoy devolviendo un objeto, estoy devolviendo un objeto
    //console.log(req.params.id);
    return res.json(photo);
 }

 export async function deletePhoto(req: Request, res: Response): Promise<Response> {
     // elimina la información, no la foto en si no el archivo
    const {id} = req.params;
    const photo = await Photo.findByIdAndRemove(id);
    if(photo) {
       await fs.unlink(path.resolve(photo.imagePath))
    }
    return res.json({
        message: 'photo deleted',
        photo
    })
 }

 export async function updatePhoto(req: Request, res: Response):  Promise<Response>{
     const {id} = req.params;
     const {title, description} = req.body;
    /**
     * le paso el id y los datos que quiero actualizar que va a ser el 
     * titulo y la descripcion
     */
     const updatedPhoto = await Photo.findByIdAndUpdate(id,{
         title,
         description
     },{new: true});

     return res.json({
         message: 'succesfully updated',
         updatedPhoto
     })
 }