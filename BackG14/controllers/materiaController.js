import MateriaSchema from "../models/materiaModels.js";
import CursoSchema from "../models/cursoModels.js";
import DocenteSchema from "../models/docenteModels.js";

//--------------------------CREATE--------------------------------------------

async function crearMateria(req, res) {

    const { nombre, curso, idDocente } = req.body;
    let cursoV = [];
    let docenteV
    let docMateria;



    if (curso != null) {

        for (let i = 0; i < curso.length; i++) {
            try {
                cursoV[i] = await CursoSchema.find({ "descripcion": curso[i] })
            } catch (error) { return res.status(400).json({ msg: "El curso " + curso[i] + " no existe" }) }
        }
    }

    let idCurso =[]
    console.log(cursoV)
    for (let i = 0; i < cursoV.length; i++) {
        if(cursoV[i][0]==null){return res.status(400).json({ msg: "El curso " + curso[i] + " no existe"})}
         idCurso.push(cursoV[i][0]._id)
        
        }

    

    if (idDocente != null) {
        try {
            docenteV = await DocenteSchema.find({ "_id": idDocente })
        } catch (error) { return res.status(400).json({ msg: "El docente " + idDocente + " no existe" }) }
    }


    try {
        docMateria = await MateriaSchema.create({

            "nombre": nombre,
            "curso": idCurso,
            "docente": idDocente,

        })
    } catch (error) {
        res.status(400)
        if (error.code == 11000) { return res.json({ msg: "La materia " + nombre + " ya existe" }) }
        res.json(error.message);
        return  //return para evitar enviar 2 respuestas por ejecución
    }

    res.status(201);  //código de algo creado
    res.json(docMateria); //envío el objeto creado como un JSON
}

//--------------------------READ---------------------------------------------

async function leerMateria(req, res) {

    const { nombre } = req.body
    let docMateria;


    try {

        docMateria = await MateriaSchema.find({
            "nombre": nombre,
        })

    } catch (error) {
        res.status(400)
        res.json(error.message);
        return  //return para evitar enviar 2 respuestas por ejecución
    }

    if (docMateria.length == 0) { return res.status(400).json({ msg: "El Curso no existe" }); }

    res.status(200);  //código de Ok, si es SendStatus no hace más consultas.
    res.json(docMateria); //envío el objeto creado como un JSON
}

//-------------------------UPDATE-------------------------------------------

async function actualizarMateria(req, res) {

    const { nombre, cambios } = req.body;

    let docMateria = await MateriaSchema.find({ "nombre": nombre })

    if (docMateria.length == 0) { return res.status(400).json({ msg: "La materia " + nombre + " no existe" }); }

    if (cambios == null) { return res.status(200).json({ msg: "No se solicitaron cambios" }); }

    
    docMateria[0].nombre = cambios.nombre || docMateria[0].nombre  //en caso de que exista se actualiza la descripción
    
    let docenteV

    if (cambios.docente != null) {
        try {
            docenteV = await DocenteSchema.find({ "_id": cambios.docente })
        } catch (error) { return res.status(400).json({ msg: "El docente " + cambios.docente + " no existe" }) }
    }

    docMateria[0].docente = cambios.docente || docMateria[0].docente

    let cursoV = [];

    if (cambios.curso != null) {
        for (let i = 0; i < cambios.curso.length; i++) {
            try {
                cursoV[i] = await CursoSchema.find({ "_id": cambios.curso[i] })

            } catch (error) { return res.status(400).json({ msg: "El curso " + cambios.curso[i] + " no existe" }) }

            if (cursoV[i].length == 0) { return res.status(400).json({ msg: "El curso " + cambios.curso[i] + " no existe" }) }
        }

        let curso = []
        let contador = 0
        let mensaje = ""


        for (let i = 0; i < cambios.curso.length; i++) {
            for (let j = 0; j < docMateria[0].curso.length; j++) {
                //console.log(cambios.curso[i])
                //console.log(docMateria[0].curso[j].toString())
                if (cambios.curso[i].toString() == docMateria[0].curso[j].toString()) { contador = contador + 1; }
                //console.log(contador)
            }

            if (contador == 0) {
                curso.push(cambios.curso[i])
            } else {
                mensaje = mensaje + cambios.curso[i] + " ";
                contador = 0
            }

        }

        console.log(mensaje + " ya en materia")

        for (let i = 0; i < curso.length; i++) {
            let mats = curso[i]
            docMateria[0].curso.push(mats)
        }

    }

    docMateria[0].save();
    res.status(200).json({ docMateria })
}

//-------------------------DELETE-------------------------------------------

async function borrarMateria(req, res) {

    const { nombre } = req.body
    let docMateria;

    try {
        docMateria = await MateriaSchema.findOneAndDelete({  //el find one busca un valor que debe ser único, solo permite consultar con elementos que estén definidos en el modelo
            "nombre": nombre
        })

    } catch (error) {
        res.status(400)
        res.json(error.message);
        return  //return para evitar enviar 2 respuestas por ejecución
    }


    if (!docMateria) {
        return res.status(400).json({ msg: " El materia " + nombre + " no ha sido encontrado" });
    } else { res.status(200).json({ msg: "El materia " + nombre + " eliminado correctamente" }) }


}

export { leerMateria, crearMateria, actualizarMateria, borrarMateria }