import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';
import crud from '../../utils/crud.js';
import swal from 'sweetalert';



const HomeUsuario = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token")
      //console.log(token)
      if (!token) {
        navigate("/login");
      }
    }
    autenticarUsuario()
  }, [navigate]);// [] solo se ejecute una vez el useEffect

  const [usuario, setUsuario] = useState([]);

  const cargarUsuarios = async () => {
    const response = await crud.GET(`/api/usuarios`);
    console.log(response.usuario);
    setUsuario(response.usuario);
  }

  useEffect(() => {
    cargarUsuarios();
  }, [])

  const borrarUsuario = async (idUsuario) => {
    swal({
      title: "Estas seguro de eliminar el usuario?",
      text: "una vez eliminado, no se podra recuperar este usuario",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          const response = crud.DELETE(`/api/usuarios/${idUsuario}`);

          if (response) {
            swal("El usuario ha sido borrado", {
              icon: "success",
            });
          }
          cargarUsuarios();

        } else {
          swal("se cancelo la acción");
        }
      });
  }


  return (
    <>
      <Header />
      <div className='md:flex md:min-h-screen'>
        <Sidebar />

        <main className='flex-1'>

          <div className="mt-10 mx-5" >
            <Link
              to={`/crear-cuenta`}
              className="bg-blue-600 p-3  text-slate-200 uppercase font-bold   text-center rounded-lg"
            >Crear Usuario
            </Link>
          </div>


          <h1 className='text-4xl text-slate-200 font-bold text-center mb-5 md:mb-0'>
            Listado de Usuarios del Sistema
          </h1>
          <br></br>
          <div className="mx-10">
            <table className="rounded-xl border" >
              <thead className='bg-slate-400'>
                <tr>
                  <th style={{ width: '25%' }}>Nombre</th>
                  <th style={{ width: '25%' }}>Email</th>
                  <th style={{ width: '25%' }}>Tipo</th>
                  <th style={{ width: '25%' }}>Acciones</th>
                </tr>
              </thead>

              <tbody className=" bg-slate-300 rounded-t-xl border">
                {
                  usuario.map(
                    item =>
                      <tr key={item._id}>
                        <td className="text-center">{item.nombre}</td>
                        <td className="text-center">{item.email}</td>
                        <td className="text-center" >{item.tipoUsuario}</td>
                        
                        <td>
                        <div className="inline-flex rounded-md shadow-sm" role="group">
                            <Link
                            to={`/crear-admin/${item._id}`}
                            className="bg-blue-600 w-full p-3 mx-1 text-white uppercase font-bold block  text-center rounded-lg"
                          >Admin</Link>&nbsp;&nbsp;
                        
                          <Link
                            to={`/actualizar-usuario/${item._id}`}
                            className="bg-blue-600 w-full p-3 mx-1 text-white uppercase font-bold block  text-center rounded-lg"
                          >Editar</Link>
                        
                          <button
                            onClick={() => borrarUsuario(item._id)}
                            className="bg-blue-600 w-full p-3 mx-1 text-white uppercase font-bold block  text-center rounded-lg"
                          >Eliminar</button>
                          </div>
                        </td>
                      </tr>
                  )
                }
              </tbody>
            </table>
            <Link className="text-white  mt-5 block text-center text-lg font-bold uppercase" 
                  to={"/menu-usuarios"}
                  >Regresar
            </Link>
          </div>
        </main>
      </div>
    </>

  );
}

export default HomeUsuario;