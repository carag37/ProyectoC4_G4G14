import express from "express";
import {login,usuarioAutenticado} from "../controllers/loginController.js";
import loginMiddleware from "../middleware/loginMiddleware.js";

 
const router = express.Router();

router.post("/", login);

router.get("/", loginMiddleware, usuarioAutenticado);

export default router;