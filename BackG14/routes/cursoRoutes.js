import express from "express";
const router = express.Router();
import { leerCurso, crearCurso, actualizarCurso, borrarCurso } from "../controllers/cursoController.js"; 

router.get("/", leerCurso);

router.post( "/", crearCurso);

router.patch("/:id", actualizarCurso);

router.delete("/:id", borrarCurso);

export default router;