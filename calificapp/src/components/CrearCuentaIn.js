import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import swalt from 'sweetalert/dist/sweetalert.min.js';
import crud from '../utils/crud';
import Header from "./Header";
import Sidebar from "./Sidebar";




const CrearCuenta = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({  //{varible, función} el use state también me inicaliza las variables en las cajas según necesidad (traductor, cambios de moneda, etc.)
        nombre: '',
        email: '',
        password: '',
        confirmar: '',
        tipoUsuario: ''
    })

    const { nombre, email, password, confirmar, tipoUsuario } = usuario;  //para back

    const onChange = (e) => {    //Para leer el contenido que tengo en las cajas a traves de una variable

        setUsuario({    //el useState me limita a cambiar los valores de la variable por acá
            ...usuario, //lo voy a cambiar con lo que se cargue en usuario
            [e.target.name]: e.target.value  //target es una propiedad de Js que me lee todo lo que trae
        })   //Cargo todo el usuario en la e
    }

    const crearCuenta = async () => {
        //los dos pasword deben ser iguales
        if (password !== confirmar) {
            console.log("Las contraseñas no coinciden")
            const mensaje = "Las contraseñas no coinciden.";

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
                nombre: usuario.nombre,
                email: usuario.email,
                password: usuario.password,
                tipoUsuario: usuario.tipoUsuario

            }
            console.log(data);
            const response = await crud.POST('/api/usuarios', data)
            const mensaje_res = response.msg;
            //console.log(mensaje);
            if (mensaje_res === "El usuario ya existe") {
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

                let mensaje = "El usuario fue creado correctamente";

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

                setUsuario({  //limpiar las cajas
                    nombre: '',
                    email: '',
                    password: '',
                    confirmar: '',
                    tipoUsuario: ''
                })

                //redireccionar a la pantalla de Login

                navigate("/login")


            }
        }

    }


    const onSubmit = (e) => {  //lo que se ejecuta cuando se presiona el botón
        e.preventDefault(); //evita que la página se cargue constantemente.
        crearCuenta();   //nueva función para crear un arreglo de data para enviar al Back
    }



    return (
        <>
            <Header className="-z-10" />
            <div className="z-0 md:flex md:min-h-screen">
                <Sidebar />
                <main className="flex-1 text-slate-200 text-3xl mt-8 p-5 w-1/3 text-center">
                    <div>
                    <h1> Crear Cuenta</h1>
                    <h3> Ingrese información solicitada</h3>

                        <form onSubmit={onSubmit} className="mx-auto mt-10 bg-slate-200 shadow-cyan-300 rounded-lg py-5 w-2/5">

                            <div className="mx-auto py-5 w-4/5">

                                <label className="text-2xl font-bold uppercase text-gray-600 block">Nombre</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    placeholder="Nombre de usuario"
                                    className="w-full text-2xl mt-3 p-4 border rounded-lg bg-gray-100 text-slate-600 "
                                    value={nombre}
                                    onChange={onChange}
                                />


                                <label className="text-2xl font-bold uppercase text-gray-600 block">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email de usuario"
                                    className="w-full text-2xl mt-3 p-4 border rounded-lg bg-gray-100 text-slate-600 "
                                    value={email}
                                    onChange={onChange}
                                />

                                <label className="text-2xl font-bold uppercase text-gray-600 block">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Ingrese su contraseña"
                                    className="w-full text-2xl mt-3 p-4 border rounded-lg bg-gray-100 text-slate-600 "
                                    value={password}
                                    onChange={onChange}

                                />

                                <label className="text-2xl font-bold uppercase text-gray-600 block">Confirme Contraseña</label>
                                <input
                                    type="password"
                                    id="confirmar"
                                    name="confirmar"
                                    placeholder="Confirme su contraseña"
                                    className="w-full text-2xl mt-3 p-4 border rounded-lg bg-gray-100 text-slate-600 "
                                    value={confirmar}
                                    onChange={onChange}

                                />

                                <label className="text-2xl font-bold uppercase text-gray-600 block">Tipo Usuario</label>
                                <input
                                    type="text"
                                    id="tipoUsuario"
                                    name="tipoUsuario"
                                    placeholder="Tipo Usuario"
                                    className="w-full text-2xl mt-3 p-4 border rounded-lg bg-gray-100 text-slate-600 "
                                    value={tipoUsuario}
                                    onChange={onChange}

                                />

                            </div>

                            <input type="submit" value="Crear Cuenta" className="bg-blue-600 mt-5 text-2xl w-3/5 p-3 border rounded-xl hover:notasr-pointer hover:bg-blue-500 text-white font-bold uppercase" />

                            <Link className="text-gray-700 mt-5 hover:text-gray-500 block text-center text-lg font-bold uppercase" to={"/login"}>Regresar</Link>

                        </form>



                    </div>
                </main>
            </div>



        </>


    )

}

export default CrearCuenta;