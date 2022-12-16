import express from "express";
import loginMiddleware from "../middleware/loginMiddleware.js";

const router = express.Router();

import { leerAcudiente, crearAcudiente, actualizarAcudiente, borrarAcudiente } from "../controllers/acudienteController.js"; 


router.get("/", loginMiddleware, leerAcudiente);
router.post("/", loginMiddleware, crearAcudiente);
router.patch("/:id", loginMiddleware, actualizarAcudiente);
router.delete("/:id", loginMiddleware, borrarAcudiente);

export default router;