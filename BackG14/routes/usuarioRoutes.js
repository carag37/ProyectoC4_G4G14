import express from "express";
import loginMiddleware from "../middleware/loginMiddleware.js";
const router = express.Router(); 

import { leerUsuario, crearUsuario, actualizarUsuario, borrarUsuario, leerUserId, leerTipo  } from "../controllers/usuarioController.js";

router.get("/", loginMiddleware,leerUsuario);
router.get("/:id", loginMiddleware,leerUserId);
//router.get("/:tipoUsuario", loginMiddleware,leerTipo);

router.post( "/", crearUsuario);

router.patch("/:id", loginMiddleware,actualizarUsuario);
router.put("/:id", loginMiddleware,actualizarUsuario);

router.delete("/:id", loginMiddleware,borrarUsuario);

export default router;