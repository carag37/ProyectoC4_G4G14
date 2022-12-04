// const express = require("express");
// const router = express.Router();
// const alumnoController = require("../controllers/alumnoControllers");

import express from "express";
const router = express.Router();
//import alumnoController from "../controllers/alumnoController.js"; 
import { leerAlumno, crearAlumno, actualizarAlumno, borrarAlumno } from "../controllers/alumnoController.js";

router.get("/", leerAlumno);

router.post( "/", crearAlumno);

router.put("/:id", actualizarAlumno);

router.delete("/:id", borrarAlumno);

//module.exports = router;
export default router;