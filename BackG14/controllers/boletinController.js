import BoletinSchema from "../models/boletinModels.js";
import AlumnoSchema from "../models/alumnoModels.js";
import MateriaSchema from "../models/materiaModels.js";
import { usuarioAutenticado } from "./loginController.js";

//--------------------------CREATE--------------------------------------------

async function crearBoletin(req, res) {

    const { materia, notas, idAlumno, observaciones } = req.body
    let docBoletin;
    let notasNum;
    let date = new Date().toJSON();
    let alumnoV = await AlumnoSchema.find({ "idAlumno": idAlumno })
    let materiaV = await MateriaSchema.find({ "nombre": materia })

    console.log(notas)

    if (notas !== null) {
        notasNum = notas.split(",").map(function (str) { return parseInt(str); });
        console.log(notasNum)
    }



    if (alumnoV.length == 0 || materiaV == 0) { return res.status(400).json({ msg: "La materia o el alumno no existen" }); }

    const boletin = await BoletinSchema.find({
        "materia": materia,
        "alumno": idAlumno
    });

    if (boletin.length != 0) {
        return res.status(400).json({ msg: "El boletin ya existe para ese alumno y materia" });
    }

    
    let createObs = observaciones + " Creado en: " + date

    try {
        docBoletin = await BoletinSchema.create({

            "materia": materia,
            "notas": notasNum,
            "alumno": idAlumno,
            "observaciones": createObs,
            "creador": req.usuario.id

        })
    } catch (error) {
        res.status(400)
        res.json(error.message);
        console.log(error.message)
        return  //return para evitar enviar 2 respuestas por ejecución
    }

    res.status(201);  //código de algo creado
    res.json(docBoletin); //envío el objeto creado como un JSON
}

//--------------------------READONE---------------------------------------------

async function leerBoletin(req, res) {

    const { id } = req.params

    let docBoletin

    try {

        docBoletin = await BoletinSchema.findById(id)

    } catch (error) {
        res.status(400)
        res.json(error.message);
        return  //return para evitar enviar 2 respuestas por ejecución
    }

    res.status(200);  //código de Ok, si es SendStatus no hace más consultas.
    res.json(docBoletin); //envío el objeto creado como un JSON
}

//-----------------------LEER TODAS-----------------------------------------

async function leerBoletines(req, res) {

    let docBoletin;

    try {

        docBoletin = await BoletinSchema.find()

    } catch (error) {
        res.status(400)
        res.json(error.message);
        return  //return para evitar enviar 2 respuestas por ejecución
    }

    if (docBoletin.length == 0) { return res.status(400).json({ msg: "No hay Boletines" }); }

    //docCurso = await CursoSchema.find(docBoletin.curso[0])
    //console.log(docBoletin.curso[0])

    res.status(200);  //código de Ok, si es SendStatus no hace más consultas.
    res.json(docBoletin); //envío el objeto creado como un JSON
}

//-------------------------UPDATE-------------------------------------------

async function actualizarBoletin(req, res) {

    const { id } = req.params
    const { notas, observaciones } = req.body

    console.log(req.body)


    let date = new Date().toJSON();
    let notasNum
    let docBoletin

    try {
        docBoletin = await BoletinSchema.findById(id)
    } catch (error) {
        res.status(400)
        res.json(error.message);
        return  //return para evitar enviar 2 respuestas por ejecución
    }

    if (docBoletin.length == 0) {
        return res.status(400).json({ msg: "El boletin no existe para el alumno y materia indicados" });
    }

    let updateObs = " / " + observaciones + " Editado en: " + date

    if (notas !== null || observaciones !== null) { docBoletin.observaciones = docBoletin.observaciones + updateObs }

    console.log(docBoletin.observaciones)
    console.log(typeof notas)

    if (notas.length != 0 && typeof notas === 'string') {
        // return res.status(400).json({ msg: "Se ingresaron notas" });
        notasNum = notas.split(",").map(function (str) { return parseInt(str); });
        console.log(notasNum)
        for (let i = 0; i < notasNum.length; i++) {
            let nota = notasNum[i]
            docBoletin.notas.push(nota)
        }
    }

    console.log(docBoletin.notas)


    docBoletin.save();
    res.status(200).json({ docBoletin })

}

//-------------------------DELETE-------------------------------------------

async function borrarBoletin(req, res) {

    const { _id } = req.body
    let docBoletin;

    try {
        docBoletin = await BoletinSchema.findOneAndDelete({  //el find one busca un valor que debe ser único, solo permite consultar con elementos que estén definidos en el modelo
            "_id": _id
        })

    } catch (error) {
        res.status(400)
        res.json(error.message);
        return  //return para evitar enviar 2 respuestas por ejecución
    }


    if (!docBoletin) {
        return res.status(400).json({ msg: " El boletin " + _id + " no ha sido encontrado" });
    } else { res.status(200).json({ msg: "El boletin " + _id + " eliminado correctamente" }) }


}

export { leerBoletin, leerBoletines, crearBoletin, actualizarBoletin, borrarBoletin }