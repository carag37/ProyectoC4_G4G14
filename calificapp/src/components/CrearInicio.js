import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import crud from '../utils/crud.js';


function CrearInicio () {
    const navigate = useNavigate(); 
  
    //variables de entorno, son las que van a capturar lo que se escriba en las cajas
    const [usuario, setUsuario] = useState({
        cedula:'',
        nombre:'',
        email:'',
        password:'',
        tipoUsuario:'',
    
    })

    const {cedula,nombre, email, password, tipoUsuario} = usuario;
    //const tipo= document.getElementById("Administrador").checked;

    //funcion que permite leer el evento dentro del formulario
    const onChange = (e) =>{  
    //setUsuario funcion que se pone en las variables de entorno
        setUsuario({
         ...usuario,
        [e.target.name]: e.target.value  //asigna el valor a la variable
        })
        console.log(usuario);
    }
 

    const crearCuenta = async() =>{
        //variables que van al back
        const data = {
            cedula: usuario.cedula,
            nombre: usuario.nombre,
            email: usuario.email,
            password: usuario.password,
            tipoUsuario:usuario.tipoUsuario
          }
          console.log(data);
          const response = await crud.POST(`/api/usuarios`, data);
          const mensaje = response.msg;
          console.log(mensaje);
          if(mensaje === 'El usuario ya existe'){
            const mensaje ="El usuario ya existe";
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
            cedula:'',
            nombre:'',
            email:'',
            password:'',
            tipoUsuario:'' ,
        
          })
          
          //redireccionar a la pantalla de login
          navigate("/login");
          

        }

    const onSubmit = (e) => {
       e.preventDefault();  //no deja que la pagina se recargue
        crearCuenta();      //funcion que genera el evento del boton
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
                <br></br>
                <br></br>
                      <div className = "value">
                        <input 
                          checked id="Administrador" 
                          type="radio" 
                          name="tipoUsuario"
                          value={tipoUsuario} 
                          onChange={onChange}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Administrador
                        </label>
                        <input 
                          id="Docente" 
                          type="radio" 
                          name="tipoUsuario"
                          value={"Docente"}
                          onChange={onChange}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Docente
                        </label>
                        
                        <input 
                          id="acudiente" 
                          type="radio" 
                          value={"acudiente"}
                          name="Acudiente"
                          onChange={onChange} 
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                         Acudiente
                        </label>
                      </div> 
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