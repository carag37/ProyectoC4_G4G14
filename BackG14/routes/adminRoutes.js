import express from "express";
import loginMiddleware from "../middleware/loginMiddleware.js";
import { leerAdmin, crearAdmin, actualizarAdmin, borrarAdmin, leerAdminUser } from "../controllers/adminController.js";

const router = express.Router();
 

router.get("/", loginMiddleware, leerAdmin);
router.get("/:id", loginMiddleware,leerAdminUser);

router.post( "/", loginMiddleware,crearAdmin);

router.patch("/:id", loginMiddleware,actualizarAdmin);

router.delete("/:id",loginMiddleware, borrarAdmin);

//module.exports = router;
export default router;