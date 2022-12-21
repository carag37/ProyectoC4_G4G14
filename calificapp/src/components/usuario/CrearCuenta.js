import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import swalt from 'sweetalert/dist/sweetalert.min.js';
import crud from '../../utils/crud';
import Header from '../Header';
import Sidebar from '../Sidebar';




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

                navigate("/home-usuario")


             }
        }

    }


    const onSubmit = (e) => {  //lo que se ejecuta cuando se presiona el botón
        e.preventDefault(); //evita que la página se cargue constantemente.
        crearCuenta();   //nueva función para crear un arreglo de data para enviar al Back
    }

//className="containter mx-auto mt-5 md:mt-20 p- md:flex md:justify-center"

    return (
    <>
      <Header />
      <div className='md:flex md:min-h-screen'>
        <Sidebar />
        <main  className= 'flex-1 md:justify-center'>
            <div className="md:w-2/5 lg:w-2/5">
                <h1 className="text-3xl block text-center font-bold text-slate-200">
                    CalificAPP - Crear Cuenta
                </h1>

                <form 
                    onSubmit={onSubmit} 
                    className='my-10 bg-white shadow rounded-lg p-10'
                >

                    <div className="my-5">
                        <label className="text-2xl font-bold uppercase text-slate-600 block">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Nombre de usuario"
                            className="w-full text-2xl mt-1 p-2 border rounded-lg bg-slate-200 "
                            value={nombre}
                            onChange={onChange}
                        />


                        <label className="text-2xl font-bold uppercase text-slate-600 block">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email de usuario"
                            className="w-full text-2xl mt-1 p-2 border rounded-lg bg-slate-200 "
                            value={email}
                            onChange={onChange}
                        />

                        <label className="text-2xl font-bold uppercase text-slate-600 block">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Ingrese su contraseña"
                            className="w-full text-2xl mt-1 p-2 border rounded-lg bg-slate-200 "
                            value={password}
                            onChange={onChange}

                        />

                        <label className="text-2xl font-bold uppercase text-slate-600 block">Confirme Contraseña</label>
                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Confirme su contraseña"
                            className="w-full text-2xl mt-1 p-2 border rounded-lg bg-slate-200 "
                            value={confirmar}
                            onChange={onChange}

                        />

                        <label className="text-2xl font-bold uppercase text-slate-600 block">Tipo Usuario</label>
                        <input
                            type="text"
                            id="tipoUsuario"
                            name="tipoUsuario"
                            placeholder="Tipo Usuario"
                            className="w-full text-2xl mt-1 p-2 border rounded-lg bg-slate-200 "
                            value={tipoUsuario}
                            onChange={onChange}

                        />

                    </div>

                    <input type="submit" 
                        value="Crear Cuenta" 
                        className="bg-blue-600 mb-3 text-2xl w-full p-2 border rounded-lg hover:cursor-pointer hover:bg-blue-500 text-slate-200 font-bold uppercase" 
                    />

                    <Link className="text-slate-600 mb-3 hover:text-slate-500 block text-center text-sm font-bold uppercase"  
                        to={"/home-usuario"}
                        >Regresar
                    </Link>

                </form>



            </div>
        </main>
        </div>
   </>

    )

}

export default CrearCuenta;