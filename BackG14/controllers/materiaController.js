import MateriasSchema from "../models/materiaModels.js";
import CursoSchema from "../models/cursoModels.js";
import DocenteSchema from "../models/docenteModels.js";
import { usuarioAutenticado } from "./loginController.js";

//--------------------------CREATE--------------------------------------------

async function crearMateria(req, res) {

    const { nombre, curso, Docente } = req.body;
    let cursoV = [];
    let docenteV
    let docMateria;

    //console.log(req.body)

    if (curso != null) {

        for (let i = 0; i < curso.length; i++) {
            try {
                cursoV[i] = await CursoSchema.find({ "descripcion": curso[i] })
            } catch (error) { return res.status(400).json({ msg: "El curso " + curso[i] + " no existe" }) }
        }
    }

    let idCurso =[]
    //console.log(cursoV)
    for (let i = 0; i < cursoV.length; i++) {
        if(cursoV[i][0]==null){return res.status(400).json({ msg: "El curso " + curso[i] + " no existe"})}
         idCurso.push(cursoV[i][0]._id)
        
        }

    //console.log(Docente)

    if (Docente != null) {
        try {
            docenteV = await DocenteSchema.find({ "_id": Docente })
        } catch (error) { return res.status(400).json({ msg: "El docente " + Docente + " no existe" }) }
    }


    try {
        docMateria = await MateriasSchema.create({

            "nombre": nombre,
            "curso": idCurso,
            "docente": Docente,
            "creador": req.usuario.id

        })
    } catch (error) {
        res.status(400)
        if (error.code == 11000) { return res.json({ msg: "La materia " + nombre + " ya existe" }) }
        res.json(error.message);
        return  //return para evitar enviar 2 respuestas por ejecución
    }

    res.status(201);  //código de algo creado
    res.json(docMateria); //envío el objeto creado como un JSON
    //console.log(docMateria)
}

//--------------------------READ---------------------------------------------

async function leerMateriaId(req, res) {

    const { id } = req.params
    let docMateria;

    try {

        docMateria = await MateriasSchema.findById(id)

        //console.log(docMateria)

       // docDocente = await CursoSchema.find({docMateria.curso})

    } catch (error) {
        res.status(400)
        res.json(error.message);
        return  //return para evitar enviar 2 respuestas por ejecución
    }

    if (docMateria.length == 0) { return res.status(400).json({ msg: "La Materia no existe" }); }

    res.status(200);  //código de Ok, si es SendStatus no hace más consultas.
    res.json(docMateria); //envío el objeto creado como un JSON
}

//-----------------------LEER TODAS-----------------------------------------

async function leerMaterias(req, res) {

    let docMateria;


    try {

        docMateria = await MateriasSchema.find()



    } catch (error) {
        res.status(400)
        res.json(error.message);
        return  //return para evitar enviar 2 respuestas por ejecución
    }

    if (docMateria.length == 0) { return res.status(400).json({ msg: "No hay Materias" }); }

    //docCurso = await CursoSchema.find(docMateria.curso[0])
    //console.log(docMateria.curso[0])

    res.status(200);  //código de Ok, si es SendStatus no hace más consultas.
    res.json(docMateria); //envío el objeto creado como un JSON
}


//-------------------------UPDATE-------------------------------------------

async function actualizarMateria(req, res) {

    const { id } = req.params;
   
    //console.log(req.params)
    
    const{nombreC, cursosC, idDocenteC} = req.body;

    let docMateria

    try {  docMateria = await MateriasSchema.findById({ "_id": id })
    }
    catch (error) { return res.status(400).json({ msg: "La materia no existe" }) }
 
   //console.log(docMateria.nombre)

    if (docMateria.length == 0) { return res.status(400).json({ msg: "La materia no existe" }); }
    docMateria.nombre = nombreC || docMateria.nombre  //en caso de que exista se actualiza la descripción
    
    let docenteV
    if (idDocenteC != null) {
        try {
            docenteV = await DocenteSchema.find({ "_id": idDocenteC })
        } catch (error) { return res.status(400).json({ msg: "El docente " + idDocenteC + " no existe" }) }
    }

    docMateria.docente = idDocenteC || docMateria.docente

    let cursoV = [];
    //console.log(cursosC)
    if (cursosC != null) {
        for (let i = 0; i < cursosC.length; i++) {
            try {
                cursoV[i] = await CursoSchema.find({ "_id": cursosC[i] })
            } catch (error) { return res.status(400).json({ msg: "El curso " + cursosC[i] + " no existe" }) }
            if (cursoV[i].length == 0) { return res.status(400).json({ msg: "El curso " + cursosC[i] + " no existe" }) }
        }

        let curso = []
        let contador = 0
        let mensaje = ""


        for (let i = 0; i < cursosC.length; i++) {
            for (let j = 0; j < docMateria.curso.length; j++) {
                //console.log(cambios.curso[i])
                //console.log(docMateria.curso[j].toString())
                if (cursosC[i].toString() == docMateria.curso[j].toString()) { contador = contador + 1; }
                //console.log(contador)
            }

            console.log(cursosC)

            if (contador == 0) {
                console.log(cursosC[i])
                curso.push(cursosC[i])
            } else {
                mensaje = mensaje + cursosC[i] + " ";
                contador = 0
            }

        }

        //console.log(mensaje + " ya en materia")

        console.log(curso.length)

        for (let i = 0; i < curso.length; i++) {
            console.log(curso[i])
            let mats = curso[i]
            console.log(mats)
            //docMateria.curso.push(mats)
        }

    }

    docMateria.save();
    res.status(200).json({ docMateria })
}

//------------------------Actualizar Cursos en Materias---------------------

async function cargarCursos(req, res) {console.log("Se están cargando Cursos")}

//-------------------------DELETE-------------------------------------------

async function borrarMateria(req, res) {

    const { _id } = req.body
    let docMateria;
    

    try {
        docMateria = await MateriasSchema.findOneAndDelete({  //el find one busca un valor que debe ser único, solo permite consultar con elementos que estén definidos en el modelo
            "_id": _id
        })

    } catch (error) {
        res.status(400)
        res.json(error.message);
        return  //return para evitar enviar 2 respuestas por ejecución
    }

    //console.log(docMateria)
    
    if (!docMateria) {
        return res.status(400).json({ msg: "La materia " + _id + " no ha sido encontrado" });
    } else { res.status(200).json({ msg: "La materia " + _id + " eliminado correctamente" }) }


}

export { leerMateriaId, crearMateria, actualizarMateria, borrarMateria, leerMaterias, cargarCursos}