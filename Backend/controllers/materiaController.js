import MateriaSchema from "../models/materiaModels.js";

//--------------------------CREATE--------------------------------------------

async function crearMateria(req, res) {

    const { nombre, curso, docente } = req.body;
    let docMateria;

    try {
        docMateria = await MateriaSchema.create({
                    
            "nombre": nombre,
            "curso": curso,
            "docente": docente

        })
    } catch (error) {
        res.status(400)
        res.json(error.message);
        return  //return para evitar enviar 2 respuestas por ejecución
    }

    res.status(201);  //código de algo creado
    res.json(docMateria); //envío el objeto creado como un JSON
}

//--------------------------READ---------------------------------------------

async function leerMateria(req, res) {

    const {nombre} = req.body


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

    res.status(200);  //código de Ok, si es SendStatus no hace más consultas.
    res.json(docMateria); //envío el objeto creado como un JSON
}

//-------------------------UPDATE-------------------------------------------

async function actualizarMateria(req, res) {

    const { nombre, cambios } = req.body;
    let docMateria;

    try {
        docMateria = await MateriaSchema.updateOne({  //el updateone busca y edita un valor que debe ser único de elementos definidos en el modelo
            "nombre": nombre  //Lo que está entre comillas se debe llamar igual al parámetro en la DB.
        }, cambios, { runValidators: true })//{"edad":123})  //Primer parámetro para buscar, segundo parámetro para editar (objeto Json). //Método 2

    } catch (error) {
        res.status(400)
        res.json(error.message);

        return  //return para evitar enviar 2 respuestas por ejecución
    }


    if (docMateria.matchedCount == 0) {
        return res.status(400).json({ msg: "La materia " + nombre + " no ha sido encontrado" });
    }
    
    else { res.status(200).json({ msg: "La materia " + nombre + " modificado correctamente" }) }

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
        return res.status(400).json({ msg: " La materia" + nombre +"no ha sido encontrado" });
    } else { res.status(200).json({ msg: "La materia " + nombre + " eliminado correctamente" }) }


}

export { leerMateria, crearMateria, actualizarMateria, borrarMateria }