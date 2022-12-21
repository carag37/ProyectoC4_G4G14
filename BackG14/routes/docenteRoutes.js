import express  from "express";
import { leerDocente,leerDocentes, crearDocente, actualizarDocente, borrarDocente } from "../controllers/docenteController.js";

const router=express.Router()

//Registro Docente
//POST
router.post("/", crearDocente)
//Visualizar Docente
//GET
router.get("/:id", leerDocente)
router.get("/", leerDocentes)
router.get("/all", leerDocentes)


//Actualizar Docente
//PUT
router.patch("/:id", actualizarDocente)
//Eliminar Docente
//DELETE
router.delete("/:id",borrarDocente)

export default router