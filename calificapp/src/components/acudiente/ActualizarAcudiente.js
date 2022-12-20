import React, { useEffect, useState }  from 'react';
import Header from '../Header.js';
import Sidebar from '../Sidebar.js';
import crud from '../../utils/crud.js';
import {useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert'; 

const ActualizarAcudiente = () => {
  const navigate = useNavigate(); 
    
  const {idAcudiente} = useParams();
  console.log(idAcudiente);

    const [acudiente, setAcudiente] = useState({
        nombre: '',
        direccion: '',
        telefono: '',
        //alumno:'' ,
        parentesco: '',
      })
      
      const cargarAcudiente = async () =>{
        const response = await crud.GET(`/api/acudientes/${idAcudiente}`);
       // console.log(response);
        setAcudiente(response.acudiente);
      }
      useEffect(() =>{ 
        cargarAcudiente();
      },[]);

    let { nombre, direccion, telefono, parentesco } = acudiente;

      const onChange = (e) =>{
        setAcudiente({
          ...acudiente,
          [e.target.name]: e.target.value
        })
      }

      const actualizarAcudiente = async () =>{
        const data = {
            nombre: acudiente.nombre,
            direccion: acudiente.direccion,
            telefono: acudiente.telefono,
            //alumno: acudiente.alumno,
            parentesco: acudiente.parentesco
        }
        const response = await crud.PATCH(`/api/acudiente/${idAcudiente}`, data);
        console.log(response);
        const mensaje1 = "El acudiente se actualizo correctamente";
        swal({
          title:'Información',
          text: mensaje1,
          icon: 'success',
          buttons:{
            confirm:{
              text: 'OK',
              value: true,
              visible: true,
              className: 'btn btn-primary',
              closeModal: true
            }
          }
        });
        navigate("/home-acudiente");
       
    }
  
    const onSubmit = (e) => {
      e.preventDefault();
      actualizarAcudiente();
    }
    
   
  return (
    <>
      <Header/>
      <div className='md:flex md:min-h-screen'>
        <Sidebar/>
        <main className='flex-1'>
        <div className='mt-10 flex justify-center'>
        <h1 className='text-4xl text-blue-600 font-bold text-center mb-5 md:mb-0'>
              Actualizar Acudiente
            </h1>
        </div>
        
        <div className='mt-10 flex justify-center' >
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
                            value="Actualizar  Acudiente"
                            className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-400 transition-colors"
                        />
                    </div>
            </form>
        </div >
       

        </main>
      </div>
      </>
    );
}

export default ActualizarAcudiente;