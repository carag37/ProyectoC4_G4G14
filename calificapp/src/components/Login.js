import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import crud from '../utils/crud.js';
import swal from 'sweetalert';


function Login() {

    const navigate = useNavigate();

    //variables de entorno, son las que van a capturar lo que se escriba en las cajas
    const [usuario, setUsuario] = useState({
        email:'',
        password:'',
    })

    const {email, password} = usuario;

    //funcion que permite leer el evento dentro del formulario
    const onChange = (e) =>{  
        //setUsuario funcion que se pone en las variables de entorno
        setUsuario({
        ...usuario,
        [e.target.name]: e.target.value  //asigna el valor a la variable
       })
    }

    const autenticarUsuario = async() =>{
        const data = {
            email: usuario.email,
            password: usuario.password
          }
          console.log(data);
        const response =await crud.POST('/api/login',data);
        const mensaje = response.msg; 
        console.log(mensaje);
        if(mensaje === 'El usuario no existe'){
            const mensaje ='El usuario no existe';
            swal({
                title: 'Error',
                text: mensaje,
                icon: 'error',
                buttons:{
                  confirm:{
                    text:'OK',
                    value: true,
                    visible: true,
                    className: 'btn btn-danger',
                    closeModal: true
                  }
                }
              })

        }else if(mensaje==="El Password es incorrecto"){
            const mensaje ="El Password es incorrecto";
            swal({
                title: 'Error',
                text: mensaje,
                icon: 'error',
                buttons:{
                  confirm:{
                    text:'OK',
                    value: true,
                    visible: true,
                    className: 'btn btn-danger',
                    closeModal: true
                  }
                }
              })
        }else{
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
        <main className ='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
            <div className ='md:w-2/3 lg:w-2/5'>
                <h1> Inicio Sesion</h1>
                <form 
                    className='my-10 bg-white shadow-orange-500 rounded-lg p-10' 
                    onSubmit={onSubmit}
                >
                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder='Email del usuario'
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            value={email}
                            onChange={onChange}
                        />
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder='Password'
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            value={password}
                            onChange={onChange}
                        />
                        <input 
                            type="submit"
                            value="Iniciar Sesión"
                            className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-400 transition-colors"
                        />

                        <Link to={"/crear-cuenta"}
                         className="block text-center my-5 text-violet-600 uppercase text-sm"
                        >Crear Cuenta</Link>
                        <Link to={"/cambiar-clave"}
                         className="block text-center my-5 text-violet-600 uppercase text-sm"
                        >Cambiar Contraseña</Link>

                    </div>
                </form>
            
            </div>
            
            
        </main>
    );
}

export default Login;