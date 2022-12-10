import express from "express";
import mwPrueba from "../middlewares/mwPrueba.js";
import { leerUsuario, crearUsuario, actualizarUsuario, borrarUsuario } from "../controllers/usuarioController.js";
import validateToken from "../middlewares/validateToken.js";



const userRouter = express.Router()

//Crear
//POST
userRouter.post("/", mwPrueba, crearUsuario)
//Leer
//GET
//userRouter.get("/:nombre/:edad", leerUsuario)
userRouter.get("/", validateToken, leerUsuario)
//Actualizar
//PUT
userRouter.patch("/:email", actualizarUsuario)  //put para cambiar todos los valores, patch para cambiar algunos o todos
//Eliminar
//DELETE
userRouter.delete("/:email", borrarUsuario)

export default userRouter