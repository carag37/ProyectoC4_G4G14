import BoletinSchema from "../models/boletinModels.js";
import AlumnoSchema from "../models/alumnoModels.js";
import MateriaSchema from "../models/materiaModels.js";

//--------------------------CREATE--------------------------------------------

async function crearBoletin(req, res) {

    const { materia, notas, alumno, observaciones } = req.body
    let docBoletin;
    let alumnoV = await AlumnoSchema.find({"_id": alumno}) 
    let materiaV = await MateriaSchema.find({"_id": materia})

    if (alumnoV.length==0 || materiaV==0){ return res.status(400).json({ msg: "La materia o el alumno no existen"}); }
    
    const boletin = await BoletinSchema.find({ 
        "materia": materia,
        "alumno": alumno
    });
    
    if (boletin.length!=0) {        
        return res.status(400).json({ msg: "El boletin ya existe para el alumno " + alumnoV[0].nombre +  " con id " + alumnoV[0].idAlumno + " para la materia " + materiaV[0].nombre});
    }

    try {
        docBoletin = await BoletinSchema.create({

            "materia": materia,
            "notas": notas,
            "alumno": alumno,
            "observaciones": observaciones

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

    const {nombreMateria, idAlumno} = req.body
    
    let docBoletin
    let alumnoV = await AlumnoSchema.find({"idAlumno": idAlumno}) 
    let materiaV = await MateriaSchema.find({"nombre": nombreMateria})

    if (alumnoV.length==0 || materiaV==0){ return res.status(400).json({ msg: "La materia o el alumno no existen"}); }

    let materia = materiaV[0]._id;
    let alumno = alumnoV[0]._id

    try {

        docBoletin = await BoletinSchema.find({
            "materia": materia,
            "alumno": alumno

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

    const {nombreMateria, idAlumno, cambios} = req.body
    
    let docBoletin
    let alumnoV = await AlumnoSchema.find({"idAlumno": idAlumno}) 
    let materiaV = await MateriaSchema.find({"nombre": nombreMateria})

    if (alumnoV.length==0 || materiaV==0){ return res.status(400).json({ msg: "La materia o el alumno no existen"}); }

    let materia = materiaV[0]._id;
    let alumno = alumnoV[0]._id

    try {
        docBoletin = await BoletinSchema.find({  //el updateone busca y edita un valor que debe ser único de elementos definidos en el modelo
            "materia": materia,
            "alumno": alumno  //Lo que está entre comillas se debe llamar igual al parámetro en la DB.
        })//{"edad":123})  //Primer parámetro para buscar, segundo parámetro para editar (objeto Json). //Método 2
   
    } catch (error) {
        res.status(400)
        res.json(error.message);

        return  //return para evitar enviar 2 respuestas por ejecución
    }


    if (docBoletin.length == 0) {
        return res.status(400).json({ msg: "El boletin no existe para el alumno " + alumnoV[0].nombre +  " con id " + alumnoV[0].idAlumno + " para la materia " + materiaV[0].nombre });
    }

    if (cambios==null){return res.status(200).json({ msg: "No se solicitaron cambios"});}

    docBoletin[0].materia = cambios.materia || docBoletin[0].materia
    docBoletin[0].alumno = cambios.alumno || docBoletin[0].alumno
    docBoletin[0].observaciones = cambios.observaciones || docBoletin[0].observaciones

   

    if (docBoletin[0].notas.length != 0 && cambios.notas != null){
    
    for (let i = 0; i<cambios.notas.length; i++){ 
        let nota=cambios.notas[i]
        docBoletin[0].notas.push(nota)
    }
    }


    docBoletin[0].save();
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

export { leerBoletin, crearBoletin, actualizarBoletin, borrarBoletin }