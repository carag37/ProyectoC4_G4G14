import React, { useState, useEffect } from "react";
import crud from "../../utils/crud.js";
import { Link, useNavigate } from 'react-router-dom';
import Header from "../Header";
import Sidebar from "../Sidebar";
import Select from 'react-select';
import swalt from 'sweetalert/dist/sweetalert.min.js';

const CrearBoletin = () => {
    const navigate = useNavigate();
    const [lista, setLista] = useState([]);
    const [datos, setDatos] = useState([]);
    const [listaA, setListaA] = useState([]);
    const [datosA, setDatosA] = useState([]);

    useEffect(() => {
        async function getNames() {
            const response = await crud.GET('/api/materias/all');
            let nombreMaterias = [];
            console.log(response);

            for (let materia = 0; materia < response.length; materia++) {
                let temporal = { value: response[materia].nombre, label: response[materia].nombre }
                nombreMaterias.push(temporal);
            }
            console.log(lista);
            setLista(nombreMaterias);
        }
        getNames();
        // eslint-disable-next-line
    }, [])

    const handleChange = selectedOption => {
        console.log("Opciones", selectedOption)
        setDatos(selectedOption.value);
    };

    useEffect(() => {
        async function getNamesA() {
            const responseA = await crud.GET('/api/alumnos/');
            let nombreAlumno = [];
            console.log(responseA.docente);

            for (let i = 0; i < responseA.alumno.length; i++) {
                let temporal = { value: responseA.alumno[i].idAlumno, label: responseA.alumno[i].idAlumno }
                nombreAlumno.push(temporal);
            }
            console.log(listaA);
            setListaA(nombreAlumno);
        }
        getNamesA();
        // eslint-disable-next-line
    }, [])

    const handleChangeA = selectedOptionA => {
        console.log("Opciones", selectedOptionA)
        setDatosA(selectedOptionA.value);

    };

    const [boletin, setBoletin] = useState({
        materia: '',
        alumno: '',
        notas: [],
        observaciones: ''
    })

    const { materia, alumno, notas, observaciones } = boletin;

    const onChange = (e) => {    //Para leer el contenido que tengo en las cajas a traves de una variable

        setBoletin({    //el useState me limita a cambiar los valores de la variable por acá
            ...boletin, //lo voy a cambiar con lo que se cargue en boletin
            [e.target.name]: e.target.value  //target es una propiedad de Js que me lee todo lo que trae
        })   //Cargo todo el usuario en la e
    }

    const crearBoletin = async () => {

        console.log(notas, materia, alumno)
        if (notas === "" || datos === "" || datosA === "") {
            console.log("Debe diligenciar todos los campos excepto observaciones")
            const mensaje = "Debe diligenciar todos los campos excepto observaciones";

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
                materia: datos,
                idAlumno: datosA,
                notas: boletin.notas,
                observaciones: boletin.observaciones
            }

            console.log(data);

            const response = await crud.POST('/api/boletines', data)
            const mensaje = response.msg;
            console.log(mensaje);

            if (mensaje === "El boletin ya existe para ese alumno y materia") {
                const mensaje = "El boletin ya existe para ese alumno y materia";

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

                let mensaje = "El boletin fue creado correctamente";

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

                setBoletin({
                    materia: '',
                    alumno: '',
                    notas: [],
                    observaciones: ''

                })

                navigate("/ver-boletin")
            }
        }

    }


    const onSubmit = (e) => {  //lo que se ejecuta cuando se presiona el botón
        e.preventDefault(); //evita que la página se cargue constantemente.
        crearBoletin();   //nueva función para crear un arreglo de data para enviar al Back
    }


    return (
        <>
            <Header className="-z-10" />
            <div className="z-0 md:flex md:min-h-screen">
                <Sidebar />
                <main className="flex-1 text-slate-200 text-3xl mt-8 p-5 w-1/3 text-center">
                    <div>

                        <h1> Crear Boletin</h1>
                        <h3> Ingrese información solicitada</h3>

                        <form
                            className="mx-auto mt-10 bg-slate-200 shadow-cyan-300 rounded-lg py-5 w-2/5"
                            onSubmit={onSubmit}
                        >
                            <div className="mx-auto py-5 w-4/5">
                                <label className="text-2xl mt-5 font-bold uppercase text-slate-600 block">Materia</label>
                                <Select

                                    name="materias"
                                    options={lista}
                                    className="basic-single text-slate-600 block"
                                    classNamePrefix="select"
                                    onChange={handleChange}
                                />

                                <label className="text-2xl mt-5 font-bold uppercase text-slate-600 block">Id Alumno</label>
                                <Select
                                    
                                    name="docentes"
                                    options={listaA}
                                    className="basic-single text-slate-600 block"
                                    classNamePrefix="select"
                                    onChange={handleChangeA}
                                />

                                <label className="text-2xl mt-5 font-bold uppercase text-gray-600 block">Notas</label>
                                <input
                                    type="text"
                                    id="notas"
                                    name="notas"
                                    placeholder="Ingrese su notas separados por coma"
                                    className="w-full text-2xl mt-3 p-4 border rounded-lg bg-gray-100 text-slate-600"
                                    value={notas}
                                    onChange={onChange}
                                />

                                <label className="text-2xl mt-5 font-bold uppercase text-gray-600 block">Observaciones</label>
                                <input
                                    type="textarea"
                                    id="observaciones"
                                    name="observaciones"
                                    placeholder="Ingrese sus observaciones"
                                    className="w-full text-2xl mt-3 p-4 border rounded-lg bg-gray-100 text-slate-600"
                                    value={observaciones}
                                    onChange={onChange}
                                />
                                <input
                                    type="submit"
                                    value="Crear Boletin"
                                    className="bg-blue-600 mt-10 text-2xl w-3/5 p-3 border rounded-xl hover:notasr-pointer hover:bg-blue-500 text-white font-bold uppercase"
                                />

                            </div>

                            <Link className="text-gray-700 mt-5 hover:text-gray-500 block text-center text-lg font-bold uppercase" to={"/menu-boletin"}>Regresar</Link>

                        </form>

                    </div>
                </main>

            </div>

        </>

    )

}

export default CrearBoletin;