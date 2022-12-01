const express = require("express");
const router = express.Router();
const tipoUsuarioController = require("../controllers/tipoUsuarioControllers");

/*import express from "express";
const router = express.Router();
import tipoUsuarioController from "../controllers/tipoUsuarioController"; */

router.get("/", tipoUsuarioController.leerTipoUsuario);

router.post( "/", tipoUsuarioController.crearTipoUsuario);

router.put("/:id", tipoUsuarioController.actualizarTipoUsuario);

router.delete("/:id", tipoUsuarioController.borrarTipoUsuario);

module.exports = router;
//export default router;