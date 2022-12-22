import express from "express";
import loginMiddleware from "../middleware/loginMiddleware.js";
const router = express.Router(); 

import { leerUsuario, crearUsuario, actualizarUsuario, borrarUsuario, leerUserId, leerEmail, leerUserTipo  } from "../controllers/usuarioController.js";

router.get("/", loginMiddleware,leerUsuario);
router.get("/:id", loginMiddleware,leerUserId);
router.get("/email/:email", loginMiddleware,leerEmail);
router.get("/tipo/:tipoUsuario", loginMiddleware,leerUserTipo);

router.post( "/", crearUsuario);

router.patch("/:id", loginMiddleware,actualizarUsuario);
router.put("/:id", loginMiddleware,actualizarUsuario);

router.delete("/:id", loginMiddleware,borrarUsuario);

export default router;