// const express = require("express");
// const router = express.Router();
// const alumnoController = require("../controllers/alumnoControllers");

import express from "express";
const router = express.Router();
//import alumnoController from "../controllers/alumnoController.js"; 
import { leerAlumno, crearAlumno, actualizarAlumno, borrarAlumno } from "../controllers/usuarioController.js";

router.get("/", alumnoController.leerAlumno);

router.post( "/", alumnoController.crearAlumno);

router.put("/:id", alumnoController.actualizarAlumno);

router.delete("/:id", alumnoController.borrarAlumno);

//module.exports = router;
export default router;