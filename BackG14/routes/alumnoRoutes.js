import express from "express";
const router = express.Router(); 

import { leerAlumno, crearAlumno, actualizarAlumno, borrarAlumno } from "../controllers/alumnoController.js"; 

router.get("/", leerAlumno);

router.post( "/", crearAlumno);

router.patch("/:id", actualizarAlumno);

router.delete("/:id", borrarAlumno);

export default router;