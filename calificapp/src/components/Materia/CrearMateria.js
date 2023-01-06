import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'; //, useNavigate 
import Header from "../Header";
import Sidebar from "../Sidebar";
import crud from "../../utils/crud";
import swalt from 'sweetalert/dist/sweetalert.min.js';
import Select from 'react-select';

const CrearMateria = () => {
    const navigate = useNavigate();
    //const [lista, setLista] = useState([]);
    // const [datos, setDatos] = useState([]);

    const [listaD, setListaD] = useState([]);
    const [datosD, setDatosD] = useState([]);

    useEffect(() => {
        async function getNames() {
            const response = await crud.GET('/api/cursos/all');
            let descripcionCursos = [];
            //console.log(response);

            for (let curso = 0; curso < response.length; curso++) {
                let temporal = { value: response[curso].descripcion, label: response[curso].descripcion }
                descripcionCursos.push(temporal);
            }
            //console.log(lista);
            //setLista(descripcionCursos);
        }
        getNames();
        // eslint-disable-next-line
    }, [])

    // const handleChange = selectedOption => {
    //     console.log("Opciones", selectedOption)
    //     setDatos(selectedOption.map(option => option.value));

    // };

    useEffect(() => {
        async function getNamesD() {
            const responseD = await crud.GET('/api/docentes/all');
            let nombreDocente = [];
            //console.log(responseD.docente);

            for (let i = 0; i < responseD.docente.length; i++) {
                let temporal = { value: responseD.docente[i]._id, label: responseD.docente[i].nombre }
                nombreDocente.push(temporal);
            }
            //console.log(listaD);
            setListaD(nombreDocente);
        }
        getNamesD();
        // eslint-disable-next-line
    }, [])

    const handleChangeD = selectedOptionD => {
        //console.log("Opciones", selectedOptionD)
        setDatosD(selectedOptionD.value);

    };

    const [materia, setMateria] = useState({  //{varible, función} el use state también me inicaliza las variables en las cajas según necesidad (traductor, cambios de moneda, etc.)
        nombre: '',
        cursos: [],
        docentes: [],
    })

    const { nombre, curso, docente } = materia;  //para back




    const onChange = (e) => {    //Para leer el contenido que tengo en las cajas a traves de una variable

        setMateria({    //el useState me limita a cambiar los valores de la variable por acá
            ...materia, //lo voy a cambiar con lo que se cargue en usuario
            [e.target.name]: e.target.value  //target es una propiedad de Js que me lee todo lo que trae
        })   //Cargo todo el usuario en la e
    }

    const crearMateria = async () => {

        if (nombre === "" || curso === "" || docente === "") {
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
            const data = {
                nombre: materia.nombre,
                //curso: datos,
                Docente: datosD,

            }

            //console.log(data);

            const response = await crud.POST('/api/materias', data)
            const mensaje_res = response.msg;
            //console.log(mensaje_res);

            if (mensaje_res === "La materia " + data.nombre + " ya existe" || mensaje_res === "El docente " + data.idDocente + " no existe" || mensaje_res === "El curso " + data.curso + " no existe") {

                let mensaje = mensaje_res;

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

                let mensaje = "La materia fue creada correctamente";

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

                setMateria({  //limpiar las cajas
                    nombre: '',
                    cursos: [],
                    docentes: [],
                })

                navigate("/ver-materia")

            }
        }

    }


    const onSubmit = (e) => {  //lo que se ejecuta cuando se presiona el botón
        e.preventDefault(); //evita que la página se cargue constantemente.
        crearMateria();   //nueva función para crear un arreglo de data para enviar al Back
    }

    return (
        <>
            <Header className="-z-10" />
            <div className="z-0 md:flex md:min-h-screen">
                <Sidebar />
                <main className="flex-1 text-slate-200 text-3xl mt-8 p-5 w-1/3 text-center">
                    <div>

                        <h1> Crear Materia</h1>
                        <h3> Ingrese información solicitada</h3>

                        <form
                            className="mx-auto mt-10 bg-slate-200 shadow-cyan-300 rounded-lg py-5 w-2/5"
                            onSubmit={onSubmit}
                        >
                            <div className="mx-auto py-5 w-4/5">
                                <label className="text-2xl font-bold uppercase text-gray-600 block">Nombre</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    placeholder="Ingrese Nombre Materia"
                                    className="w-full text-2xl mt-3 p-4 border rounded-lg bg-gray-100 text-slate-600"
                                    value={nombre}
                                    onChange={onChange}
                                />

                                {/* <label className="text-2xl mt-5 font-bold uppercase text-slate-600 block">Cursos</label>
                                <Select
                                    isMulti
                                    name="cursos"
                                    options={lista}
                                    className="basic-multi-select text-slate-600 block"
                                    classNamePrefix="select"
                                    onChange={handleChange}
                                /> */}

                                <label className="text-2xl mt-5 font-bold uppercase text-slate-600 block">Docente</label>
                                <Select
                                    
                                    name="docentes"
                                    options={listaD}
                                    className="basic-single text-slate-600 block"
                                    classNamePrefix="select"
                                    onChange={handleChangeD}
                                />

                                <input
                                    type="submit"
                                    value="Crear Materia"
                                    className="bg-blue-600 mt-10 text-2xl w-4/5 p-3 border rounded-xl hover:cursor-pointer hover:bg-blue-500 text-white font-bold uppercase"
                                />

                                <Link className="text-gray-700 mt-5 hover:text-gray-500 block text-center text-lg font-bold uppercase" to={"/menu-materia"}>Regresar</Link>

                            </div>

                        </form>

                    </div>

                </main>

            </div>

        </>

    )

}

export default CrearMateria;