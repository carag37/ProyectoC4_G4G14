/*const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");*/


import express from "express";
const router = express.Router();
//import usuarioController from "../controllers/usuarioController.js"; 

import { leerUsuario, crearUsuario, actualizarUsuario, borrarUsuario } from "../controllers/usuarioController.js";

router.get("/", leerUsuario);

router.post( "/", crearUsuario);

router.put("/:id", actualizarUsuario);

router.delete("/:id", borrarUsuario);

export default router;
//module.exports = router;