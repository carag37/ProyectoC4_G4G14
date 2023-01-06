import React, { useState, useEffect } from "react";
import crud from "../../utils/crud.js";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from "../Header";
import Sidebar from "../Sidebar";
import Select from 'react-select';
import swalt from 'sweetalert/dist/sweetalert.min.js';

const ActualizarCurso = () => {
    
    const navigate = useNavigate();
    const { idCurso } = useParams()

    const cargarCurso = async () => {
        const response = await crud.GET(`/api/cursos/one/${idCurso}`);
        //console.log(response)
        setCurso(response)
    }

    useEffect(() => {
        cargarCurso();
        // eslint-disable-next-line
    }, []);



    const [lista, setLista] = useState([]);
    const [datos, setDatos] = useState([]);
   
    async function getNames() {
        const response = await crud.GET('/api/materias/all');
        let nombreMaterias = [];
        //console.log(response);

        for (let materia = 0; materia < response.length; materia++) {
            let temporal = { value: response[materia].nombre, label: response[materia].nombre }
            nombreMaterias.push(temporal);
        }
        //console.log(nombreMaterias);
        setLista(nombreMaterias);
        return nombreMaterias;
    }



    const handleChange = selectedOption => {
        console.log("Opciones", selectedOption)
        setDatos(selectedOption.map(option => option.value));

    };

    const [curso, setCurso] = useState({
        descripcion: '',
        materias: [],
    })

    const { descripcion, materias } = curso;

    const onChange = (e) => {    //Para leer el contenido que tengo en las cajas a traves de una variable

        setCurso({    //el useState me limita a cambiar los valores de la variable por acá
            ...curso, //lo voy a cambiar con lo que se cargue en usuario
            [e.target.name]: e.target.value  //target es una propiedad de Js que me lee todo lo que trae
        })   //Cargo todo el usuario en la e
    }

 //----------------------PRECARGAR MATERIAS DE CURSO -------------------------------// 
    
//  const matCurso = useRef(null);

//  useEffect(() => {
//      precargarMatCurso(matCurso.current);
//      // eslint-disable-next-line
//  }, []);

let matCurso = [];



 useEffect(() => {
        
    async function obtenerMaterias() {

    await getNames()
    //console.log(nombreMaterias)
    
    }
    
    obtenerMaterias()
    function precargarMatCurso() {
    
        async function obtenerOpcionesSeleccionadas() {
            const respuesta = await crud.GET(`/api/cursos/one/${idCurso}`);
            const opcionesSeleccionadas = await respuesta.materia;
            return opcionesSeleccionadas
          }
        
        async function seleccionarOpciones() {
            const opcionesSeleccionadas = await obtenerOpcionesSeleccionadas();
            console.log(opcionesSeleccionadas)
            setDatos(opcionesSeleccionadas)
            
   
            let defaultValue = []
            for (let i = 0; i < opcionesSeleccionadas.length ; i++){
               defaultValue.push({label:opcionesSeleccionadas[i], value: opcionesSeleccionadas[i]})
            }
            //console.log(defaultValue)
            
           matCurso.splice(0,matCurso.length)
   
           for (let i = 0; i<defaultValue.length ; i++)
           {
           matCurso.push(defaultValue[i])
           }
   
            //console.log(matCurso)
   
            }
        
   
        seleccionarOpciones();
   
    }

    precargarMatCurso()

    console.log(matCurso)

    // eslint-disable-next-line
}, [])

 //-------------------- Funciones para el Botón de actualizar -------------------------------//

    const actualizarCurso = async () => {

        if (descripcion === "" || materias === "") {
            console.log("Debe diligenciar todos los campos")
            const mensaje = "Debe diligenciar todos los campos";

            new swalt({
                title: 'Error',
                text: mensaje,
                icon: 'error',
                button: {
                    confirm: {
                        text: 'OK',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }

            })

        } else {
            console.log("Pruebas", datos)
            const data = {
                descripcion: curso.descripcion,
                materia: datos,
            }

            console.log(data);

            const response = await crud.PATCH('/api/cursos', data)
            const mensaje = response.msg;
            //console.log(mensaje);

            if (mensaje === 'El curso ya existe') {
                const mensaje = "El curso ya existe";

                new swalt({
                    title: 'Error',
                    text: mensaje,
                    icon: 'error',
                    button: {
                        confirm: {
                            text: 'OK',
                            value: true,
                            visible: true,
                            className: 'btn btn-danger',
                            closeModal: true
                        }
                    }

                })

            } else {

                let mensaje = "El curso fue creado correctamente";

                new swalt({
                    title: 'Información',
                    text: mensaje,
                    icon: 'success',
                    button: {
                        confirm: {
                            text: 'OK',
                            value: true,
                            visible: true,
                            className: 'btn btn-primary',
                            closeModal: true
                        }
                    }

                })

                setCurso({
                    descripcion: '',
                    materias: ''

                })

                navigate("/ver-curso")
            }
        }

    }

    const onSubmit = (e) => {  //lo que se ejecuta cuando se presiona el botón
        e.preventDefault(); //evita que la página se cargue constantemente.
        actualizarCurso();   //nueva función para crear un arreglo de data para enviar al Back
    }



    return (
        <>
            <Header className="-z-10" />
            <div className="z-0 md:flex md:min-h-screen">
                <Sidebar />
                <main className="flex-1 text-slate-200 text-3xl mt-8 p-5 w-2/3 text-center">
                    <div>

                        <h1> Actualizar Curso</h1>
                        <h3> Ingrese información solicitada</h3>

                        <form
                            className="mx-auto mt-10 bg-slate-200 shadow-cyan-300 rounded-lg py-5 w-3/5"
                            onSubmit={onSubmit}
                        >
                            <div className="mx-auto py-5 w-4/5">
                                <label className="text-2xl font-bold uppercase text-gray-600 block">Descripcion</label>
                                <input readOnly={true}
                                    type="text"
                                    id="descripcion"
                                    name="descripcion"
                                    placeholder="Ingrese Descripcion Curso"
                                    className="w-full text-2xl mt-3 p-4 border rounded-lg bg-gray-100 text-slate-600"
                                    value={descripcion}
                                    onChange={onChange}
                                />

                                <label className="text-2xl mt-5 font-bold uppercase text-slate-600 block">Materias</label>
                                <Select
                                    defaultValue={matCurso}
                                    placeholder={matCurso}
                                    isMulti
                                    name="materias"
                                    options={lista}
                                    className="basic-multi-select text-slate-600 block"
                                    classNamePrefix="select"
                                    onChange={handleChange}
                                />


                                <input
                                    type="submit"
                                    value="Actualizar Curso"
                                    className="bg-blue-600 mt-10 text-2xl w-4/5 p-3 border rounded-xl hover:materiar-pointer hover:bg-blue-500 text-white font-bold uppercase"
                                />

                            </div>


                            <Link className="text-gray-700 mt-5 hover:text-gray-500 block text-center text-lg font-bold uppercase" to={"/ver-curso"}>Regresar</Link>

                        </form>

                    </div>
                </main>

            </div>



        </>


    )

}

export default ActualizarCurso;