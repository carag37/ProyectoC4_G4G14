import express from "express";
import loginMiddleware from "../middleware/loginMiddleware.js";
const router = express.Router(); 

import { leerAlumno, crearAlumno, actualizarAlumno, borrarAlumno } from "../controllers/alumnoController.js"; 

router.get("/", loginMiddleware,leerAlumno);

router.post( "/", loginMiddleware,crearAlumno);

router.patch("/:id", loginMiddleware,actualizarAlumno);

router.delete("/:id", loginMiddleware,borrarAlumno);

export default router;