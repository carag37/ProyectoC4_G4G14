import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'; //, useNavigate 
import Header from "../Header";
import Sidebar from "../Sidebar";
import crud from "../../utils/crud";
import swalt from 'sweetalert/dist/sweetalert.min.js';

const ActualizarMateria = () => {

    const {idMateria} = useParams()
    //console.log(idMateria)

    const cargarCategoria = async () => {
        const response = await crud.GET(`/api/materias/one/${idMateria}`);
        //console.log(response)
        setMateria(response)
    }

    useEffect(() => {
        cargarCategoria();
    })


    const navigate = useNavigate();
    const [materia, setMateria] = useState({  //{varible, función} el use state también me inicaliza las variables en las cajas según necesidad (traductor, cambios de moneda, etc.)
        nombre: '',
        nombreN: '',
        curso: '',
        docente: '',
    })

    const { nombre, nombreN, curso, docente } = materia;  //para back

    const onChange = (e) => {    //Para leer el contenido que tengo en las cajas a traves de una variable

        setMateria({    //el useState me limita a cambiar los valores de la variable por acá
            ...materia, //lo voy a cambiar con lo que se cargue en usuario
            [e.target.name]: e.target.value  //target es una propiedad de Js que me lee todo lo que trae
        })   //Cargo todo el usuario en la e
    }

    const actualizarMateria = async (nombre) => {

        if (nombre === "") {
            console.log("Debe diligenciar el campo de nombre")
            const mensaje = "Debe diligenciar el campo de nombre";

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
            
            const cambios = {nombre: materia.nombreN, curso: [materia.curso], idDocente: materia.docente}

            const data = {
                nombre: materia.nombre,
                cambios: cambios
            }

            console.log(data);

            const response = await crud.PATCH('/api/materias', data)
            const mensaje_res = response.msg;
            console.log(mensaje_res);
            navigate("/admin")


            let mensaje = "La materia fue editada correctamente";

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
                nombreN: '',
                curso: '',
                docente: '',
            })

        }

    }


    const onSubmit = (e) => {  //lo que se ejecuta cuando se presiona el botón
        e.preventDefault(); //evita que la página se cargue constantemente.
        actualizarMateria();   //nueva función para crear un arreglo de data para enviar al Back
    }

    return (
        <>
            <Header className="-z-10" />
            <div className="z-0 md:flex md:min-h-screen">
                <Sidebar />
                <main className="flex-1 text-slate-200 text-3xl mt-8 p-5 w-1/3 text-center">
                    <div>

                        <h1> Actualizar Materia</h1>
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

                                <label className="text-2xl mt-5 font-bold uppercase text-gray-600 block">Nombre Nuevo</label>
                                <input
                                    type="text"
                                    id="nombreN"
                                    name="nombreN"
                                    placeholder="Ingrese Nombre Nuevo Materia"
                                    className="w-full text-2xl mt-3 p-4 border rounded-lg bg-gray-100 text-slate-600"
                                    value={nombreN}
                                    onChange={onChange}
                                />

                                <label className="text-2xl mt-5 font-bold uppercase text-gray-600 block">Cursos</label>
                                <input
                                    type="text"
                                    id="curso"
                                    name="curso"
                                    placeholder="Ingrese su cursos separados por coma"
                                    className="w-full text-2xl mt-3 p-4 border rounded-lg bg-gray-100 text-slate-600"
                                    value={curso}
                                    onChange={onChange}
                                />
                                <label className="text-2xl mt-5 font-bold uppercase text-gray-600 block">Docentes</label>
                                <input
                                    type="text"
                                    id="docente"
                                    name="docente"
                                    placeholder="Ingrese docentes separados por una coma"
                                    className="w-full text-2xl mt-3 p-4 border rounded-lg bg-gray-100 text-slate-600"
                                    value={docente}
                                    onChange={onChange}
                                />

                                <input
                                    type="submit"
                                    value="Actualizar Materia"
                                    className="bg-blue-600 mt-10 text-2xl w-full p-3 border rounded-xl hover:cursor-pointer hover:bg-blue-500 text-white font-bold uppercase"
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

export default ActualizarMateria;