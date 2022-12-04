// const express = require("express");
// const router = express.Router();
// const adminController = require("../controllers/adminControllers");

import express from "express";
const router = express.Router();
import adminController from "../controllers/adminControllers.js"; 

router.get("/", adminController.leerAdministrador);

router.post( "/", adminController.crearAdministrador);

router.put("/:id", adminController.actualizarAdministrador);

router.delete("/:id", adminController.borrarAdministrador);

module.exports = router;
//export default router;