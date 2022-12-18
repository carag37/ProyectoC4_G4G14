import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import crud from '../../utils/crud.js';
import swal from 'sweetalert';
import Header from '../Header.js';
import Sidebar from '../Sidebar.js';


function CrearAcudiente() {

    const navigate = useNavigate();

    //variables de entorno, son las que van a capturar lo que se escriba en las cajas
    const [acudiente, setAcudiente] = useState({
        cedula:'',
        nombre:'',
        direccion:'',
        telefono:'',
        parentesco:'',
    })

    const {cedula,nombre,direccion,telefono, parentesco} = acudiente;

    //funcion que permite leer el evento dentro del formulario
    const onChange = (e) =>{  
        //setUsuario funcion que se pone en las variables de entorno
        setAcudiente({
        ...acudiente,
        [e.target.name]: e.target.value  //asigna el valor a la variable
       })
    }

    const nuevoAcudiente = async() =>{
        const data = {
            cedula: acudiente.cedula,
            nombre: acudiente.nombre,
            direccion: acudiente.direccion,
            telefono: acudiente.telefono,
            parentesco: acudiente.parentesco
          }

        console.log(data);
        const response =await crud.POST(`/api/acudientes`,data);
        const mensaje = response.msg; 
        console.log(mensaje);
        if(mensaje === "El acudiente ya existe"){
            const mensaje = "El acudiente ya existe";
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
               setAcudiente({
                nombre:'',
                direccion:'',
                telefono:'',
                parentesco:'',
            
              })
              //redireccionar a la pantalla de admin
              navigate("/admin"); 

        }
    
      
    const onSubmit = (e) => {
       e.preventDefault();  //no deja que la pagina se recargue
        nuevoAcudiente();      //funcion que genera el evento del boton
      }

        
    return (  
      
    <>
      <Header/>
        <div className='md:flex md:min-h-screen'>
          <Sidebar/>
          <main className='flex-1'>
            <div className='mt-10 flex justify-center'>
                <h1 className='text-4xl text-blue-600 font-bold text-center mb-5 md:mb-0'>
                  Crear Cuenta
                </h1>
            </div>

         <div className='mt-10 flex justify-center' >
                <form 
                    className='my-10 bg-white shadow-orange-500 rounded-lg p-10' 
                    onSubmit={onSubmit}
                >
                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Cédula</label>
                        <input
                            type="number"
                            id="cedula"
                            name="cedula"
                            placeholder='Digite la Cedula'
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
                            placeholder='Digite el teléfono'
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            value={telefono}
                            onChange={onChange}
                        />
                        
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Parentesco</label>
                        <input
                            type="text"
                            id="parentesco"
                            name="parentesco"
                            placeholder='Digite el parentesco'
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            value={parentesco}
                            onChange={onChange}
                        />

                        <input 
                            type="submit"
                            value="Crear Acudiente"
                            className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-400 transition-colors"
                        />

                        <Link to={"/home-admin"}
                           className="block text-center my-5 text-violet-600 uppercase text-sm"
                        >Regresar</Link>
                    </div>
                </form>
            
            </div>
            
            
        </main>
      </div>
  </>   
    );
}

export default CrearAcudiente;