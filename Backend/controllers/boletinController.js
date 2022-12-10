import BoletinSchema from "../models/boletinModels.js";

//--------------------------CREATE--------------------------------------------

async function crearBoletin(req, res) {

    const {materia, notas, usuario, observaciones } = req.body;
    let docBoletin;

    try {
        docBoletin = await BoletinSchema.create({
                    
            "materia": materia,
            "notas":notas,
            "usuario":usuario,
            "observaciones":observaciones

        })
    } catch (error) {
        res.status(400)
        res.json(error.message);
        return  //return para evitar enviar 2 respuestas por ejecución
    }

    res.status(201);  //código de algo creado
    res.json(docBoletin); //envío el objeto creado como un JSON
}

//--------------------------READ---------------------------------------------

async function leerBoletin(req, res) {

    const {_id} = req.body
    let docBoletin;
    
    try {
        
        docBoletin = await BoletinSchema.find({
            "_id": _id,
        })

    } catch (error) {
        res.status(400)
        res.json(error.message);
        return  //return para evitar enviar 2 respuestas por ejecución
    }

    res.status(200);  //código de Ok, si es SendStatus no hace más consultas.
    res.json(docBoletin); //envío el objeto creado como un JSON
}

//-------------------------UPDATE-------------------------------------------

async function actualizarBoletin(req, res) {

    const { _id, cambios } = req.body;
    let docBoletin;

    try {
        docBoletin = await BoletinSchema.updateOne({  //el updateone busca y edita un valor que debe ser único de elementos definidos en el modelo
            "_id": _id  //Lo que está entre comillas se debe llamar igual al parámetro en la DB.
        }, cambios, { runValidators: true })//{"edad":123})  //Primer parámetro para buscar, segundo parámetro para editar (objeto Json). //Método 2

    } catch (error) {
        res.status(400)
        res.json(error.message);

        return  //return para evitar enviar 2 respuestas por ejecución
    }


    if (docBoletin.matchedCount == 0) {
        return res.status(400).json({ msg: "El boletin " + _id + " no ha sido encontrado" });
    }
    
    else { res.status(200).json({ msg: "El boletin " + _id + " modificado correctamente" }) }

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

export { leerBoletin, crearBoletin, actualizarBoletin, borrarBoletin }