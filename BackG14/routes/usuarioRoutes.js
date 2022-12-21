import express from "express";
import loginMiddleware from "../middleware/loginMiddleware.js";
const router = express.Router(); 

import { leerUsuario, crearUsuario, actualizarUsuario, borrarUsuario, leerUserId, leerEmail  } from "../controllers/usuarioController.js";

router.get("/", loginMiddleware,leerUsuario);
router.get("/:id", loginMiddleware,leerUserId);
router.get("/:email", loginMiddleware,leerEmail);

router.post( "/", crearUsuario);

router.patch("/:id", loginMiddleware,actualizarUsuario);
router.put("/:id", loginMiddleware,actualizarUsuario);

router.delete("/:id", loginMiddleware,borrarUsuario);

export default router;