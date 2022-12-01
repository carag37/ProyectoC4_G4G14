import express from "express";
import { createNote, deleteNote, readNote, updateNote } from "../controllers/NoteController.js";

const NoteRouter = express.Router()

//Crear
//POST
NoteRouter.post("/", (req, res) =>{
    createNote(req, res)
})
//Leer
//GET
NoteRouter.get("/", (req, res) =>{
    readNote(req, res)
})
//Actualizar
//PUT
NoteRouter.put("/", (req, res) =>{
    updateNote(req, res)
})
//Eliminar
//DELETE
NoteRouter.delete("/", (req, res) =>{
    deleteNote(req, res)
})

export default NoteRouter;