import ResumenSchema from "../models/resumenModels.js";

//--------------------------CREATE--------------------------------------------

async function crearResumen(req, res) {

    const { boletin, materia, notas } = req.body;
    let docResumen;

    try {
        docResumen = await ResumenSchema.create({
            "boletin": boletin,
            "materia": materia,
            "notas": notas
        })
    } catch (error) {
        res.status(400)
        res.json(error.message);
        return  //return para evitar enviar 2 respuestas por ejecución
    }

    res.status(201);  //código de algo creado
    res.json(docResumen); //envío el objeto creado como un JSON
}

//--------------------------READ---------------------------------------------

async function leerResumen(req, res) {

    const {id} = req.body
    let docResumen;

    try {
        
        docResumen = await ResumenSchema.find({
            "id": id,
        })

    } catch (error) {
        res.status(400)
        res.json(error.message);
        return  //return para evitar enviar 2 respuestas por ejecución
    }

    res.status(200);  //código de Ok, si es SendStatus no hace más consultas.
    res.json(docResumen); //envío el objeto creado como un JSON
}

//-------------------------UPDATE-------------------------------------------

async function actualizarResumen(req, res) {

    const { id, cambios } = req.body;
    let docResumen;

    try {
        docResumen = await ResumenSchema.updateOne({  //el updateone busca y edita un valor que debe ser único de elementos definidos en el modelo
            "id": id  //Lo que está entre comillas se debe llamar igual al parámetro en la DB.
        }, cambios, { runValidators: true })//{"edad":123})  //Primer parámetro para buscar, segundo parámetro para editar (objeto Json). //Método 2

    } catch (error) {
        res.status(400)
        res.json(error.message);

        return  //return para evitar enviar 2 respuestas por ejecución
    }


    if (docResumen.matchedCount == 0) {
        return res.status(400).json({ msg: "El resumen " + id + " no ha sido encontrado" });
    }
    
    else { res.status(200).json({ msg: "El resumen " + id + " modificado correctamente" }) }

}

//-------------------------DELETE-------------------------------------------

async function borrarResumen(req, res) {

    const { id } = req.body
    let docResumen;

    try {
        docResumen = await ResumenSchema.findOneAndDelete({  //el find one busca un valor que debe ser único, solo permite consultar con elementos que estén definidos en el modelo
            "id": id
        })

    } catch (error) {
        res.status(400)
        res.json(error.message);
        return  //return para evitar enviar 2 respuestas por ejecución
    }


    if (!docResumen) {
        return res.status(400).json({ msg: " El resumen " + id + " no ha sido encontrado" });
    } else { res.status(200).json({ msg: "El resumen " + id + " eliminado correctamente" }) }


}

export { leerResumen, crearResumen, actualizarResumen, borrarResumen }