import CursoSchema from "../models/cursoModels.js";
import MateriaSchema from "../models/materiaModels.js";

//--------------------------CREATE--------------------------------------------

async function crearCurso(req, res) {

    const { descripcion, materia } = req.body;
    let materiaV = [];
    let docCurso;

    if (materia != null) {

        for (let i = 0; i < materia.length; i++) {
            try {
                materiaV[i] = await MateriaSchema.find({ "_id": materia[i] })
            } catch (error) { return res.status(400).json({ msg: "La materia " + materia[i] + " no existe" }) }
        }
    }

    try {
        docCurso = await CursoSchema.create({

            "descripcion": descripcion,
            "materia": materia,
            "creador": req.usuario.id

        })
    } catch (error) {
        res.status(400)
        if (error.code == 11000) { return res.json({ msg: "El curso " + descripcion + " ya existe" }) }
        res.json(error.message);
        return  //return para evitar enviar 2 respuestas por ejecución
    }

    res.status(201);  //código de algo creado
    res.json(docCurso); //envío el objeto creado como un JSON
}

//--------------------------READ---------------------------------------------

async function leerCurso(req, res) {

    const { descripcion } = req.body
    let docCurso;


    try {

        docCurso = await CursoSchema.find({
            "descripcion": descripcion,
        })

    } catch (error) {
        res.status(400)
        res.json(error.message);
        return  //return para evitar enviar 2 respuestas por ejecución
    }

    if (docCurso.length == 0) { return res.status(400).json({ msg: "El curso no existe" }); }

    res.status(200);  //código de Ok, si es SendStatus no hace más consultas.
    res.json(docCurso); //envío el objeto creado como un JSON
}

//-------------------------UPDATE-------------------------------------------

async function actualizarCurso(req, res) {

    const { descripcion, cambios } = req.body;

    let docCurso = await CursoSchema.find({ "descripcion": descripcion })

    if (docCurso.length == 0) { return res.status(400).json({ msg: "El curso " + descripcion + " no existe" }); }

    if (cambios == null) { return res.status(200).json({ msg: "No se solicitaron cambios" }); }

    docCurso[0].descripcion = cambios.descripcion || docCurso[0].descripcion  //en caso de que exista se actualiza la descripción

    let materiaV = [];

    if (cambios.materia != null) {
        for (let i = 0; i < cambios.materia.length; i++) {
            try {
                materiaV[i] = await MateriaSchema.find({ "_id": cambios.materia[i] })

            } catch (error) { return res.status(400).json({ msg: "La materia " + cambios.materia[i] + " no existe" }) }
        
        if(materiaV[i].length==0){return res.status(400).json({ msg: "La materia " + cambios.materia[i] + " no existe" })}
        }

        

        let materia = []
        let contador = 0
        let mensaje = ""


        for (let i = 0; i < cambios.materia.length; i++) {
            for (let j = 0; j < docCurso[0].materia.length; j++) {
                //console.log(cambios.materia[i])
                //console.log(docCurso[0].materia[j].toString())
                if (cambios.materia[i].toString() == docCurso[0].materia[j].toString()) { contador = contador + 1; }
                //console.log(contador)
            }

            if (contador == 0) {
                materia.push(cambios.materia[i])
            } else {
                mensaje = mensaje + cambios.materia[i] + " ";
                contador = 0
            }
            
        }

        console.log(mensaje + " ya en curso")

        for (let i = 0; i < materia.length; i++) {
            let mats = materia[i]
            docCurso[0].materia.push(mats)
        }

       

    }

    docCurso[0].save();
    res.status(200).json({ docCurso })
}

//-------------------------DELETE-------------------------------------------

async function borrarCurso(req, res) {

    const { descripcion } = req.body
    let docCurso;

    try {
        docCurso = await CursoSchema.findOneAndDelete({  //el find one busca un valor que debe ser único, solo permite consultar con elementos que estén definidos en el modelo
            "descripcion": descripcion
        })

    } catch (error) {
        res.status(400)
        res.json(error.message);
        return  //return para evitar enviar 2 respuestas por ejecución
    }


    if (!docCurso) {
        return res.status(400).json({ msg: " El curso " + descripcion + " no ha sido encontrado" });
    } else { res.status(200).json({ msg: "El curso " + descripcion + " eliminado correctamente" }) }


}

export { leerCurso, crearCurso, actualizarCurso, borrarCurso }
