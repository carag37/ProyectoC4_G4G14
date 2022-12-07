import express from "express";

const router = express.Router();

import { leerAcudiente, crearAcudiente, actualizarAcudiente, borrarAcudiente } from "../controllers/acudienteController.js"; 


router.get("/", leerAcudiente);
router.post("/", crearAcudiente);
router.patch("/:id", actualizarAcudiente);
router.delete("/:id", borrarAcudiente);

export default router;