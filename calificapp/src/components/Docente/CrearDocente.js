import React, { useState } from "react";
import { Link } from 'react-router-dom'; //, useNavigate 
import Header from "../Header";
import Sidebar from "../Sidebar";
import crud from "../../utils/crud.js";
import swalt from 'sweetalert/dist/sweetalert.min.js';

const CrearDocente = () => {
    //const navigate = useNavigate();
    const [docente, setDocente] = useState({
        nombre:'',
        direccion:'',
        telefono:57,
        materias:[],
        usuarioSistema:'',
        estado:true    
    })

    const {nombre, direccion, telefono, materias, usuarioSistema,estado} = docente;
    
    const onChange = (e) => {    //Para leer el contenido que tengo en las cajas a traves de una variable

        setDocente({    //el useState me limita a cambiar los valores de la variable por acá
            ...docente, //lo voy a cambiar con lo que se cargue en usuario
            [e.target.name]: e.target.value  //target es una propiedad de Js que me lee todo lo que trae
        })   //Cargo todo el usuario en la e
    }

    const crearDocente = async () => {
        
        if (nombre === "" || direccion==="" || telefono==="" || materias===""  || usuarioSistema==="") {
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
            nombre: docente.nombre,
            direccion: docente.direccion,
            telefono: docente.telefono,
            materias: [docente.materias],
            usuarioSistema:docente.usuarioSistema,
            estado:docente.estado
            }

            console.log(data);
            
            const response = await crud.POST('/api/docentes', data)
            const mensaje = response.msg;
            console.log(mensaje);

            if(mensaje === 'El docente ya existe'){
                const mensaje ="El docente ya existe";

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

                let mensaje = "El docente fue creado correctamente";

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

                setDocente({
                    nombre:'',
                    direccion:'',
                    telefono: 57,
                    materias:[],
                    usuarioSistema:'',
                    estado:true
                
                  })

                

            }
        }

    }


    const onSubmit = (e) => {  //lo que se ejecuta cuando se presiona el botón
        e.preventDefault(); //evita que la página se cargue constantemente.
        crearDocente();   //nueva función para crear un arreglo de data para enviar al Back
    }

    return (
        <>
            <Header className="-z-10" />
            <div className="z-0 md:flex md:min-h-screen">
                <Sidebar />
                <main className="flex-1 text-slate-200 text-3xl mt-8 p-5 w-1/3 text-center">
                    <div>

                        <h1> Crear Docente</h1>
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
                                    placeholder="Ingrese Nombre docente"
                                    className="w-full text-2xl mt-3 p-4 border rounded-lg bg-gray-100 text-slate-600"
                                    value={nombre}
                                    onChange={onChange}
                                />

                                <label className="text-2xl mt-5 font-bold uppercase text-gray-600 block">Direccion</label>
                                <input
                                    type="text"
                                    id="direccion"
                                    name="direccion"
                                    placeholder="Ingrese su direccion"
                                    className="w-full text-2xl mt-3 p-4 border rounded-lg bg-gray-100 text-slate-600"
                                    value={direccion}
                                    onChange={onChange}
                                />
                                <label className="text-2xl mt-5 font-bold uppercase text-gray-600 block">Telefono</label>
                                <input
                                    type="text"
                                    id="telefono"
                                    name="telefono"
                                    placeholder="Ingrese el telefono"
                                    className="w-full text-2xl mt-3 p-4 border rounded-lg bg-gray-100 text-slate-600"
                                    value={telefono}
                                    onChange={onChange}
                                />
                                <label className="text-2xl mt-5 font-bold uppercase text-gray-600 block">Materias</label>
                                <input
                                    type="text"
                                    id="materias"
                                    name="materias"
                                    placeholder="Ingrese materias separadas por una coma"
                                    className="w-full text-2xl mt-3 p-4 border rounded-lg bg-gray-100 text-slate-600"
                                    value={materias}
                                    onChange={onChange}
                                />
                                <label className="text-2xl mt-5 font-bold uppercase text-gray-600 block">Usuario Sistema</label>
                                <input
                                    type="text"
                                    id="usuarioSistema"
                                    name="usuarioSistema"
                                    placeholder="Ingrese usuario del Sistema"
                                    className="w-full text-2xl mt-3 p-4 border rounded-lg bg-gray-100 text-slate-600"
                                    value={usuarioSistema}
                                    onChange={onChange}
                                />

                                <input
                                    type="submit"
                                    value="Crear Docente"
                                    className="bg-blue-600 mt-10 text-2xl w-4/5 p-3 border rounded-xl hover:cursor-pointer hover:bg-blue-500 text-white font-bold uppercase"
                                />

                                <Link className="text-gray-700 mt-5 hover:text-gray-500 block text-center text-lg font-bold uppercase" to={"/menu-docente"}>Regresar</Link>

                            </div>

                        </form>

                    </div>

                </main>

            </div>

        </>

    )

}

export default CrearDocente;