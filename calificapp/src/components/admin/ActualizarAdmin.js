import React, { useEffect, useState }  from 'react';
import Header from '../Header';
import Menu from '../Menu'; 
import crud from '../../utils/crud.js';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert'; 

const ActualizarAdmin = () => {
    
  const navigate = useNavigate(); 

  const {idAdmin} = useParams();
    console.log(idAdmin);
    
    const [admin, setAdmin] = useState({
        cedula:'',
        nombre:'',
        direccion:'',
        telefono:'',
        estado:'true',
        
      })
      const cargarAdmin = async () =>{
        const response = await crud.GET(`/api/admins/${idAdmin}`);
        console.log(response);
        setAdmin(response.admin);
      }
      useEffect(() =>{ 
        cargarAdmin();
      },[]);

      
    let {cedula, nombre, direccion, telefono, estado } = admin;

      const onChange = (e) =>{
        setAdmin({
          ...admin,
          [e.target.name]: e.target.value
        })
      }

      const actualizarAdmin = async () =>{
        const data = {
            cedula:admin.cedula,
            nombre: admin.nombre,
            direccion: admin.direccion,
            telefono: admin.telefono,
            estado:true
        }
       //console.log(data, idAdmin);
          const response = await crud.PATCH(`/api/admins/${idAdmin}`, data);
          console.log(response);
          const mensaje1 = "El usuario Administrador se actualizo correctamente";
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
          navigate("/admin");
         
      }
    
      const onSubmit = (e) => {
        e.preventDefault();
        actualizarAdmin();
      }
      
     
      
  return (
    <>
      <Header/>
        <div className='md:flex md:min-h-screen'>
            <Menu/>
                <main className='flex-1'>
                    <div className='mt-10 flex justify-center'>
                    <h1 className="inline bg-gradient-to-r from-indigo-200 via-violet-700 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                        Actualizar Usuario Administrador
                    </h1>
        </div>
        
        <div className='mt-10 flex justify-center'>
        <form 
              className='my-10 bg-white shadow rounded-lg p-10 '
              onSubmit={onSubmit}
        >
        <div className='my-5'>
                <label className='uppercase text-gray-600 block text-xl font-bold' >Cedula</label>
                <input
                  type="number"
                  id="cedula"
                  name="cedula"
                  placeholder='cedula'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                 value={cedula}
                  onChange={onChange}
                />

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

                <label className='uppercase text-gray-600 block text-xl font-bold' >Direccion</label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  placeholder='direccion'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                 value={direccion}
                  onChange={onChange}
                />

              <label className='uppercase text-gray-600 block text-xl font-bold' >Telefono</label>
                <input
                  type="number"
                  id="telefono"
                  name="telefono"
                  placeholder='Digite el número de teléfono'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                  value={telefono}
                  onChange={onChange}
                />
              
              <label className='uppercase text-gray-600 block text-xl font-bold' >Estado</label>
                <input
                  type="boolean"
                  id="estado"
                  name="estado"
                  placeholder='Estado de Usuario'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                  value={estado}
                  onChange={onChange}
                />
              </div>
              <input 
                type="submit"
                value="Actualizar Admin"
                className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-400 transition-colors"
                />
            </form>
        </div >

        </main>
    </div>
      
    </>
    );
}

export default ActualizarAdmin;