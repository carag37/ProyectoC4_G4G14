import express from "express";
import { createSubject, deleteSubject, readSubject, updateSubject } from "../controllers/SubjectController.js";

const SubjectRouter = express.Router()

//Crear
//POST
SubjectRouter.post("/", (req, res) =>{
    createSubject(req, res)
})
//Leer
//GET
SubjectRouter.get("/", (req, res) =>{
    readSubject(req, res)
})
//Actualizar
//PUT
SubjectRouter.put("/", (req, res) =>{
    updateSubject(req, res)
})
//Eliminar
//DELETE
SubjectRouter.delete("/", (req, res) =>{
    deleteSubject(req, res)
})

export default SubjectRouter;