import express from "express";
import loginController from "../controllers/loginController.js";
import loginMiddleware from "../middleware/loginMiddleware.js";

const loginRouter = express.Router()

/*loginRouter.post(
    "/",
   loginController.autenticarUsuario
);*/

//loginRouter.get("/", loginMiddleware, loginController.autenticarUsuario);

export default loginRouter