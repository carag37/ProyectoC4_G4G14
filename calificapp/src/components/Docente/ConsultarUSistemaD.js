import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams} from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';
import crud from '../../utils/crud.js';



const ConsultarUSistemaD = () => {

  const navigate = useNavigate();
  const {tipoUsuario} = useParams();

 // console.log(tipoUsuario)
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
  
    const response = await crud.GET(`/api/usuarios/tipo/${tipoUsuario}`);
   // console.log(response.usuario);
    //console.log(response);
    setUsuario(response.usuario);
  }

  useEffect(() => {
    cargarUsuarios();
  }, [])

  

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
            Listado de Usuarios del Sistema Perfil Docente
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
                            to={`/crear-docente/${item._id}`}
                            className="bg-blue-600 w-full p-3 mx-1 text-white uppercase font-bold block  text-center rounded-lg"
                          >Crear Docente
                          </Link>
                        
                          </div>
                        </td>
                      </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>

  );
}

export default ConsultarUSistemaD;