import express from "express";
import { leerUsuario, crearUsuario, actualizarUsuario, borrarUsuario } from "../controllers/usuarioController.js";


const userRouter = express.Router()

//Crear
//POST
userRouter.post("/", crearUsuario)
//Leer
//GET
userRouter.get("/:nombre/:edad", leerUsuario)
//Actualizar
//PUT
userRouter.patch("/:email", actualizarUsuario)  //put para cambiar todos los valores, patch para cambiar algunos o todos
//Eliminar
//DELETE
userRouter.delete("/:email", borrarUsuario)

export default userRouter