import React, { useEffect, useState }  from 'react';
import Header from '../Header.js';
import Sidebar from '../Sidebar.js';
import crud from '../../utils/crud.js';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert'; 

const ActualizarDocente = () => {
    
  const navigate = useNavigate(); 

  const {idDocente} = useParams();
    console.log(idDocente);
    
    const [docente, setDocente] = useState({
      nombre: '',
      direccion: '',
      telefono: 57,
      materias: [],
      })
      const cargarDocente = async () =>{
        const response = await crud.GET(`/api/docentes/one/${idDocente}`);
        console.log(response.docente);
        setDocente(response.docente);
      }
      useEffect(() =>{ 
        cargarDocente();
      },[]);

      
    let { nombre, direccion, telefono, materias } = docente;

      const onChange = (e) =>{
        setDocente({
          ...docente,
          [e.target.name]: e.target.value
        })
      }

      const actualizarDocente = async () =>{
        const data = {
          nombre: docente.nombre,
          direccion: docente.direccion,
          materias: [docente.materias],
          telefono: docente.telefono,
                 
        }
       //console.log(data, idocente);
          const response = await crud.PATCH(`/api/docentes/one/${idDocente}`, data);
          console.log(response);
          const mensaje1 = "El docente se actualizó correctamente";
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
          
          navigate("/ver-docente");
          window.location.reload();
         
      }
    
      const onSubmit = (e) => {
        e.preventDefault();
        actualizarDocente();
      }
      
     
      
  return (
    <>
      <Header/>
        <div className='md:flex md:min-h-screen'>
            <Sidebar/>
                <main className='flex-1'>
                    <div className='mt-10 flex justify-center'>
                    <h1 className= 'text-4xl text-blue-600 font-bold text-center mb-5 md:mb-0'>
                        Actualizar Docente
                    </h1>
        </div>
        
        <div className='mt-10 flex justify-center'>
        <form 
              className='my-10 bg-white shadow rounded-lg p-10 '
              onSubmit={onSubmit}
        >
        <div className='my-5'>
                
              <label className='uppercase text-gray-600 block text-xl font-bold' >Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder='Nombre'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                  value={nombre}
                  onChange={onChange}
                />

                <label className='text-2xl font-bold uppercase text-gray-600 block' >Direccion</label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  placeholder='direccion'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                 value={direccion}
                  onChange={onChange}
                />

              <label className='text-2xl font-bold uppercase text-gray-600 block' >Telefono</label>
                <input
                  type="number"
                  id="telefono"
                  name="telefono"
                  placeholder='Digite el número de teléfono'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                  value={telefono}
                  onChange={onChange}
                />
              
              <label className='text-2xl font-bold uppercase text-gray-600 block' >Materias</label>
                <input
                  type="text"
                  id="materias"
                  name="materias"
                  placeholder='Materias del docente'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                  value={materias}
                  onChange={onChange}
                />
              </div>
              <input 
                type="submit"
                value="Actualizar docente"
                className="bg-blue-600 mt-10 text-2xl w-5/5 p-3 border rounded-xl hover:cursor-pointer hover:bg-blue-500 text-white font-bold uppercase"
                />
            </form>
        </div >

        </main>
    </div>
      
    </>
    );
}

export default ActualizarDocente;