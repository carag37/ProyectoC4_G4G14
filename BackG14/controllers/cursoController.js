import CursoSchema from "../models/cursoModels.js";

//--------------------------CREATE--------------------------------------------

async function crearCurso(req, res) {

    const { descripcion, materia } = req.body;
    
    let docCurso;

    try {
        docCurso = await CursoSchema.create({
                    
            "descripcion": descripcion,
            "materia": materia,

        })
    } catch (error) {
        res.status(400)
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
    console.log(descripcion)
    try {
        
        docCurso = await CursoSchema.find({
            "descripcion": descripcion,
        })

    } catch (error) {
        res.status(400)
        res.json(error.message);
        return  //return para evitar enviar 2 respuestas por ejecución
    }

    res.status(200);  //código de Ok, si es SendStatus no hace más consultas.
    res.json(docCurso); //envío el objeto creado como un JSON
}

//-------------------------UPDATE-------------------------------------------

async function actualizarCurso(req, res) {

    const { descripcion, cambios } = req.body;
    let docCurso;

    try {
        docCurso = await CursoSchema.updateOne({  //el updateone busca y edita un valor que debe ser único de elementos definidos en el modelo
            "descripcion": descripcion  //Lo que está entre comillas se debe llamar igual al parámetro en la DB.
        }, cambios, { runValidators: true })//{"edad":123})  //Primer parámetro para buscar, segundo parámetro para editar (objeto Json). //Método 2

    } catch (error) {
        res.status(400)
        res.json(error.message);

        return  //return para evitar enviar 2 respuestas por ejecución
    }


    if (docCurso.matchedCount == 0) {
        return res.status(400).json({ msg: "El curso " + descripcion + " no ha sido encontrado" });
    }
    
    else { res.status(200).json({ msg: "El curso " + descripcion + " modificado correctamente" }) }

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
