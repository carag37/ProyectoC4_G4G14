// const express = require("express");
// const router = express.Router();
// const adminController = require("../controllers/adminControllers");

import express from "express";
const router = express.Router();
import { leerAdmin, crearAdmin, actualizarAdmin, borrarAdmin } from "../controllers/adminController.js"; 

router.get("/", leerAdmin);

router.post( "/", crearAdmin);

router.patch("/:id", actualizarAdmin);

router.delete("/:id", borrarAdmin);

//module.exports = router;
export default router;