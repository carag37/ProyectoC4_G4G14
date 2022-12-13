import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import crud from '../utilities/crud.js';


function CrearCuenta () {
    const navigate = useNavigate(); 
  
    //variables de entorno, son las que van a capturar lo que se escriba en las cajas
    const [usuario, setUsuario] = useState({
        nombre:'',
        email:'',
        password:'',
        tipoUsuario:'Administrador',
    
    })

    const {nombre, email, password, tipoUsuario} = usuario;

    //funcion que permite leer el evento dentro del formulario
    const onChange = (e) =>{  
    //setUsuario funcion que se pone en las variables de entorno
        setUsuario({
         ...usuario,
        [e.target.name]: e.target.value  //asigna el valor a la variable
        })
    }
 
    const crearCuenta = async() =>{
        //variables que van al back
        const data = {
            nombre: usuario.nombre,
            email: usuario.email,
            password: usuario.password
          }
          console.log(data);
          const response = await crud.POST(`/api/usuarios`, data);
          const mensaje = response.msg;
          console.log(mensaje);
          if(mensaje === 'El usuario ya existe'){
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
            const mensaje = "El usuario fue creado correctamente";
          swal({
            title: 'Información',
            text: mensaje,
            icon: 'success',
            buttons:{
              confirm:{
                text:'OK',
                value: true,
                visible: true,
                className: 'btn btn-primary',
                closeModal: true
              }
            }
          });      
         }

          
          setUsuario({
            nombre:'',
            email:'',
            password:'',
            tipoUsuario:'',
        
          })
          //redireccionar a la pantalla de login
          navigate("/");
        }
      
    


    const onSubmit = (e) => {
       e.preventDefault();  //no deja que la pagina se recargue
        crearCuenta();      //funcion que genera el evento del boton
      }


    return(
        <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
            <div className='md:w-2/3 lg:w-2/5'>
                <h1 className="text-black font-display text-5xl tracking-tight text-transparent">
                    Crear Cuenta
                </h1>

            <form 
                onSubmit={onSubmit}
                className='my-10 bg-white shadow rounded-lg p-10'
            >
           <div className='my-5'>
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
                <br></br>
                <br></br>
                <div>
                    <label for="administrador" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Administrador
                    </label>
                    <input 
                        id="administrador" 
                        type="radio" 
                        value={tipoUsuario} 
                        name="administrador" 
                        onChange={onChange}
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                              
                    <label for="docente" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Docente
                    </label>
                    <input 
                        checked id="docente" 
                        type="radio" 
                        value={tipoUsuario}
                        name="docente" 
                        onChange={onChange}
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="acudiente" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Acudiente
                    </label>
                    <input 
                        id="acudiente" 
                        type="radio" 
                        value={tipoUsuario}
                        name="acudiente"
                        onChange={onChange} 
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                </div>
           </div>

           <input 
             type="submit"  //para crear la accion y lleve al link
             value="Crear Cuenta"
             className="bg-blue-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-400 transition-colors"
            />
            <Link 
            to={"/"}
            className="block text-center my-5 text-blue-600 uppercase text-sm"
            >Regresar</Link>
         </form>
      </div>
   </main> 
    );
}
export default CrearCuenta;