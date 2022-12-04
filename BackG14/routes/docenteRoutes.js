import express  from "express";
import { leerDocente, crearDocente, actualizarDocente, borrarDocente } from "../controllers/docenteController.js";

const router=express.Router()

//Registro Docente
//POST
router.post("/", crearDocente)
//Visualizar Docente
//GET
router.get("/", leerDocente)
//Actualizar Docente
//PUT
router.put("/", actualizarDocente)
//Eliminar Docente
//DELETE
router.delete("/",borrarDocente)

export default router