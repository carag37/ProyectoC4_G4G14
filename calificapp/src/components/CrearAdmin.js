import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import crud from '../utils/crud.js';
import swal from 'sweetalert';


function CrearAdmin() {

    const navigate = useNavigate();

    //variables de entorno, son las que van a capturar lo que se escriba en las cajas
    const [admin, setAdmin] = useState({
        nombre:'',
        direccion:'',
        telefono:'',
    })

    const {nombre,direccion,telefono} = admin;

    //funcion que permite leer el evento dentro del formulario
    const onChange = (e) =>{  
        //setUsuario funcion que se pone en las variables de entorno
        setAdmin({
        ...admin,
        [e.target.name]: e.target.value  //asigna el valor a la variable
       })
    }

    const nuevoAdmin = async() =>{
        const data = {
            nombre: admin.nombre,
            direccion: admin.direccion,
            telefono: admin.telefono
          }
          console.log(data);
        const response =await crud.POST(`/api/admins`,data);
        const mensaje = response.msg; 
        console.log(mensaje);
        if(mensaje === "El administrador ya existe"){
            const mensaje = "El administrador ya existe";
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
               setAdmin({
                nombre:'',
                direccion:'',
                telefono:'',
            
              })
              //redireccionar a la pantalla de login
              navigate("/login"); 

        }
    
      
    const onSubmit = (e) => {
       e.preventDefault();  //no deja que la pagina se recargue
        nuevoAdmin();      //funcion que genera el evento del boton
      }

        
    return (  
        <main className ='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
            <div className ='md:w-2/3 lg:w-2/5'>
                <h1> Usuario Administrador</h1>
                <form 
                    className='my-10 bg-white shadow-orange-500 rounded-lg p-10' 
                    onSubmit={onSubmit}
                >
                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder='Digite el nombre'
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            value={nombre}
                            onChange={onChange}
                        />
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Dirección</label>
                        <input
                            type="text"
                            id="direccion"
                            name="direccion"
                            placeholder='Digite la dirección'
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            value={direccion}
                            onChange={onChange}
                        />
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Teléfono</label>
                        <input
                            type="number"
                            id="telefono"
                            name="telefono"
                            placeholder='Digite el nombre'
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            value={telefono}
                            onChange={onChange}
                        />
                        <input 
                            type="submit"
                            value="Usuario Administrador"
                            className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-400 transition-colors"
                        />

                        <Link to={"/"}
                           className="block text-center my-5 text-violet-600 uppercase text-sm"
                        >Home</Link>
                    </div>
                </form>
            
            </div>
            
            
        </main>
    );
}

export default CrearAdmin;