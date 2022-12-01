const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

/*
import express from "express";
const router = express.Router();
import usuarioController from "../controllers/usuarioController"; */

router.get("/", usuarioController.leerUsuario);

router.post( "/", usuarioController.crearUsuario);

router.put("/:id", usuarioController.actualizarUsuario);

router.delete("/:id", usuarioController.borrarUsuario);

//export default router;
module.exports = router;