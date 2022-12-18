import React, { useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import crud from '../../utils/crud.js';
import swal from 'sweetalert';
import Header from '../Header.js';
import Sidebar from '../Sidebar';


function CrearAdmin() {

    const navigate = useNavigate();
    const {usuarioSistema} = useParams();

    //variables de entorno, son las que van a capturar lo que se escriba en las cajas
    const [admin, setAdmin] = useState({
        cedula:'',
        nombre:'',
        direccion:'',
        telefono:'',
        usuarioSistema:'',
    })

    const {cedula, nombre, direccion,telefono} = admin;

    //funcion que permite leer el evento dentro del formulario
    const onChange = (e) =>{  
        //setUsuario funcion que se pone en las variables de entorno
        setAdmin({
        ...admin,
        [e.target.name]: e.target.value  //asigna el valor a la variable
         // eslint-disable-next-line react-hooks/exhaustive-deps
       })
    }

    const crearAdmin = async() =>{
        const data = {
            cedula: admin.cedula,
            nombre: nombre.nombre,
            direccion: admin.direccion,
            telefono: admin.telefono,
            usuarioSistema:usuarioSistema
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
                cedula:'',
                nombre:'',
                direccion:'',
                telefono:'',
            
              })
              //redireccionar a la pantalla de login
              navigate(`/home-admin`); 

        }
    
      
    const onSubmit = (e) => {
       e.preventDefault();  //no deja que la pagina se recargue
        crearAdmin();      //funcion que genera el evento del boton
      }

        
    return (  
    <>
      <Header/>
        <div className='md:flex md:min-h-screen'>
          <Sidebar/>
          <main className='flex-1'>
            <div className='mt-10 flex justify-center'>
                <h1 className='text-4xl text-blue-600 font-bold text-center mb-5 md:mb-0'>
                  Crear Cuenta Administrador
                </h1>
            </div>

         <div className='mt-10 flex justify-center' >

                <form 
                    className='my-10 bg-white shadow-orange-500 rounded-lg p-10' 
                    onSubmit={onSubmit}
                >
                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Cedula</label>
                        <input
                            type="number"
                            id="cedula"
                            name="cedula"
                            placeholder='Digite la cedula'
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            value={cedula}
                            onChange={onChange}
                        />
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
                            placeholder='Digite el telefono'
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            value={telefono}
                            onChange={onChange}
                        />
                        
                        <input 
                            type="submit"
                            value="Usuario Administrador"
                            className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-400 transition-colors"
                        />

                        <Link to={"/admin"}
                           className="block text-center my-5 text-violet-600 uppercase text-sm font-bold"
                        >Regresar</Link>
                    </div>
                </form>
            

            </div>
            
            
        </main>
        </div>
        </>     
    );
}

export default CrearAdmin;