import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import crud from '../utils/crud.js';
import swal from 'sweetalert';


function Login() {

    const navigate = useNavigate();

    //variables de entorno, son las que van a capturar lo que se escriba en las cajas
    const [usuario, setUsuario] = useState({
        email: '',
        password: '',
    })

    const { email, password } = usuario;

    //funcion que permite leer el evento dentro del formulario
    const onChange = (e) => {
        //setUsuario funcion que se pone en las variables de entorno
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value  //asigna el valor a la variable
        })
    }

    const autenticarUsuario = async () => {
        const data = {
            email: usuario.email,
            password: usuario.password
        }
        console.log(data);
        const response = await crud.POST('/api/login', data);
        const mensaje = response.msg;
        console.log(mensaje);
        if (mensaje === 'El usuario no existe') {
            const mensaje = 'El usuario no existe';
            swal({
                title: 'Error',
                text: mensaje,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'OK',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            })

        } else if (mensaje === "El Password es incorrecto") {
            const mensaje = "El Password es incorrecto";
            swal({
                title: 'Error',
                text: mensaje,
                icon: 'error',
                buttons: {
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
            const jwt = response.token;

            localStorage.setItem('token', jwt);
            //redireccionar a la pantalla de admistrador

            navigate("/admin");

        }
    }




    const onSubmit = (e) => {
        e.preventDefault();  //no deja que la pagina se recargue
        autenticarUsuario();      //funcion que genera el evento del boton
    }


    return (
        <main className="containter mx-auto mt-5 md:mt-20 p- md:flex md:justify-center">
            <div className="md:w-2/3 lg:w-2/5">
                <h1 className="text-3xl block text-center font-bold text-slate-200">
                    CalificAPP - Iniciar Sesión
                </h1>
                <form
                    className="my-10 bg-white shadow-blue-300 rounded-lg p-6"
                    onSubmit={onSubmit}
                >
                    <div className='my-5'>
                        <label className="text-2xl font-bold uppercase text-slate-600 block">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder='Email del usuario'
                            className='w-full text-2xl mt-1 p-2 border rounded-lg bg-slate-200 '
                            value={email}
                            onChange={onChange}
                        />
                        <label className="text-2xl font-bold uppercase text-slate-600 block">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder='Password'
                            className='w-full text-2xl mt-1 p-2 border rounded-lg bg-slate-200 '
                            value={password}
                            onChange={onChange}
                        />
                        <input
                            type="submit"
                            value="Iniciar Sesión"
                            className="bg-blue-600 mb-3 text-2xl w-full p-2 border rounded-lg hover:cursor-pointer hover:bg-blue-500 text-slate-200 font-bold uppercase"
                        />

                        
                        <Link  
                            className="text-slate-600 mb-3 hover:text-slate-500 block text-center text-sm font-bold uppercase" 
                            to={"/crear-inicio"}>
                            Crear Cuenta
                        </Link>

                        <Link to={"/cambiar-clave"}
                            className="text-slate-600 mb-3 hover:text-slate-500 block text-center text-sm font-bold uppercase"
                            >Cambiar Contraseña
                        </Link>

                        <Link 
                            className="text-slate-600 mb-3 hover:text-slate-500 block text-center text-sm font-bold uppercase" 
                            to={"/login"}>Regresar
                        </Link>



                    </div>
                </form>

            </div>


        </main>
    );
}

export default Login;