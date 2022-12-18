import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import swalt from 'sweetalert/dist/sweetalert.min.js';
import crud from '../utils/crud';




const CrearInicio = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({  //{varible, función} el use state también me inicaliza las variables en las cajas según necesidad (traductor, cambios de moneda, etc.)
        cedula:'',
        nombre: '',
        email: '',
        password: '',
        confirmar: '',
        tipoUsuario: ''
    })

    const { cedula, nombre, email, password, confirmar, tipoUsuario } = usuario;  //para back

    const onChange = (e) => {    //Para leer el contenido que tengo en las cajas a traves de una variable

        setUsuario({    //el useState me limita a cambiar los valores de la variable por acá
            ...usuario, //lo voy a cambiar con lo que se cargue en usuario
            [e.target.name]: e.target.value  //target es una propiedad de Js que me lee todo lo que trae
        })   //Cargo todo el usuario en la e
    }

    const crearInicio = async () => {
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
                cedula: usuario.cedula,
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
                    cedula:'',
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

    const onSubmit = (e) => {
       e.preventDefault();  //no deja que la pagina se recargue
        crearInicio();      //funcion que genera el evento del boton
      }

    return(

          <div className='md:flex md:min-h-screen'>
            
            <main className='flex-1'>
              <div className='mt-10 flex justify-center'>
                  <h1 className='text-4xl text-blue-600 font-bold text-center mb-5 md:mb-0'>
                    Crear Cuenta
                  </h1>
              </div>

       <div className='mt-10 flex justify-center' >
        
            <form 
                onSubmit={onSubmit}
                className='my-10 bg-white shadow rounded-lg p-10'
            >
           <div className='my-5'>
                <label className='uppercase text-gray-600 block text-xl font-bold' >Cedula</label>
                <input
                    type="number"
                    id="cedula"
                    name="cedula"
                    placeholder='Ingrese la cedula'
                    className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                    value={cedula}
                    onChange={onChange}
                />  
                <label className='uppercase text-gray-600 block text-xl font-bold' >Nombre</label>
                <input
                    type="nombre"
                    id="nombre"
                    name="nombre"
                    placeholder='Ingrese su nombre'
                    className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                    value={nombre}
                    onChange={onChange}
                />
             
                <label className='uppercase text-gray-600 block text-xl font-bold' >Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder='Ingrese el E-Mail'
                    className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                    value={email}
                    onChange={onChange}
                />

                <label className='uppercase text-gray-600 block text-xl font-bold' >password</label>
                <input
                    type="password"
                    id="password"   
                    name="password"
                    placeholder='Ingrese el Password'
                    className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
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
                <label className='uppercase text-gray-600 block text-xl font-bold' >Tipo de Usuario</label>
                <input
                    type="tipoUsuario"
                    id="tipoUsuario"   
                    name="tipoUsuario"
                    placeholder='Ingrese Administrador o Docente o Acudiente'
                    className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                    value={tipoUsuario}
                    onChange={onChange}
                />
                 
           </div>

           <input 
             type="submit"  //para crear la accion y lleve al link
             value="Crear Cuenta"
             className="bg-blue-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-400 transition-colors"
            />
            <Link 
            to={"/login"}
            className="block text-center my-5 text-blue-600 uppercase text-sm"
            >Regresar</Link>
         </form>
        </div>
       </main> 
    
      </div>
    );
}

export default CrearInicio;