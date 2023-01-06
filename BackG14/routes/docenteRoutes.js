import express  from "express";
import { leerDocente,leerDocentes, crearDocente, actualizarDocente, borrarDocente, cargarMaterias } from "../controllers/docenteController.js";
import loginMiddleware from "../middleware/loginMiddleware.js";

const router=express.Router()

//Registro Docente
//POST
router.post("/", loginMiddleware,crearDocente)
//Visualizar Docente
//GET
router.get("/one/:id",loginMiddleware, leerDocente)
//router.get("/", loginMiddleware,leerDocentes)
router.get("/all",loginMiddleware, leerDocentes)


//Actualizar Docente
//PUT
router.patch("/one/:id",loginMiddleware, actualizarDocente)
router.put("/", loginMiddleware, cargarMaterias)
//Eliminar Docente
//DELETE
router.delete("/:id",loginMiddleware,borrarDocente)

export default router