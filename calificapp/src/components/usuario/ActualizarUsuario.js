import React, { useEffect, useState }  from 'react';
import Header from '../Header.js';
import Menu from '../Menu.js'; 
import crud from '../../utils/crud.js';
import {useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert'; 

const ActualizarUsuario = () => {
    
  const navigate = useNavigate(); 

  const {idUsuario} = useParams();
    console.log(idUsuario);
    
    const [usuario, setUsuario] = useState({
        cedula:'',
        nombre:'',
        password:'',
        tipoUsuario:'',
        estado:'',

      })
      const cargarUsuario = async () =>{
        const response = await crud.GET(`/api/usuarios/${idUsuario}`);
        console.log(response);
        setUsuario(response.usuario);
      }
      useEffect(() =>{ 
        cargarUsuario();
      },[]);

      
    let {cedula, nombre, password, tipoUsuario, estado} = usuario;

      const onChange = (e) =>{
        setUsuario({
          ...usuario,
          [e.target.name]: e.target.value
        })
      }

      const actualizarUsuario = async () =>{
        const data = {
          cedula:usuario.cedula,
          nombre: usuario.nombre,
          password: usuario.password,
          tipoUsuario: usuario.tipoUsuario,
          estado: usuario.estado
        }
       //console.log(data, idCategoria);
          const response = await crud.PATCH(`/api/usuarios/${idUsuario}`, data);
          console.log(response);
          const mensaje1 = "El usuario se actualizo correctamente";
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
        actualizarUsuario();
      }
      
     
      
  return (
    <>
      <Header/>
      <div className='md:flex md:min-h-screen'>
        <Menu/>
        <main className='flex-1'>
        <div className='mt-10 flex justify-center'>
        <h1 className= 'text-4xl text-blue-600 font-bold text-center mb-5 md:mb-0'>
              Actualizar Usuario
            </h1>
        </div>
        
        <div className='mt-10 flex justify-center' >
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
                  placeholder='Digite la cedula'
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

                <label className='uppercase text-gray-600 block text-xl font-bold' >Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder='Digite password'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                 value={password}
                  onChange={onChange}
                />
                <label className='uppercase text-gray-600 block text-xl font-bold' >Tipo de Usuario</label>
                <input
                  type="text"
                  id="tipoUsuario"
                  name="tipoUsuario"
                  placeholder='tipoUsuario'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                 value={tipoUsuario}
                  onChange={onChange}
                />
                <label className='uppercase text-gray-600 block text-xl font-bold' >Estado</label>
                <input
                  type="boolean"
                  id="estado"
                  name="estado"
                  placeholder='estado'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                 value={estado}
                  onChange={onChange}
                />



              </div>

              <input 
                type="submit"
                value="Actualizar Usuario"
                className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-400 transition-colors"
            />

            </form>
        </div >
       

        </main>
      </div>
      
      
      </>
    );
}

export default ActualizarUsuario;