import express from "express";
import loginMiddleware from "../middleware/loginMiddleware.js";

const router = express.Router();

import { leerAcudiente, crearAcudiente, actualizarAcudiente, borrarAcudiente, leerAcudienteId } from "../controllers/acudienteController.js"; 


router.get("/", loginMiddleware, leerAcudiente);
router.get("/:id", loginMiddleware,leerAcudienteId);

router.post("/", loginMiddleware, crearAcudiente);

router.patch("/:id", loginMiddleware, actualizarAcudiente);

router.delete("/:id", loginMiddleware, borrarAcudiente);

export default router;