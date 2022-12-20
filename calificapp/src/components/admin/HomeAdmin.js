import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header.js';
import Sidebar from '../Sidebar.js';
import crud from '../../utils/crud.js';
//import ConsultarAdmin from  './ConsultarAdmin.js'
import swal from 'sweetalert';


const HomeAdmin = () => {

  const navigate = useNavigate();

  //const {tipoUsuario} = useParams();

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token")
      //console.log(token)
      if (!token) {
        navigate("/login");
      }
    }
    autenticarUsuario()
  }, [navigate]);// [] hacen que solo se ejecute una vez el useEffect



  const [admin, setAdmins] = useState([]);

  const cargarAdmins = async () => {
    const response = await crud.GET(`/api/admins`);
    //console.log(response.admin);
    setAdmins(response.admin);
  }

  useEffect(() => {
    cargarAdmins();
  }, [navigate]);

  const borrarAdmin = async (idUsuario) => {
    swal({
      title: "Estas seguro de eliminar el usuario administrador?",
      text: "una vez eliminado, no se podra recuperar este usuario",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          const response = crud.DELETE(`/api/admins/${idUsuario}`);

          if (response) {
            swal("El usuario administrador ha sido borrado", {
              icon: "success",
            });
          }
          cargarAdmins();

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
              to={`/home-usuario`}
              className="bg-blue-600 p-3 text-white uppercase font-bold text-center rounded-lg"
            >Crear Administrador
            </Link>
          </div>


          <h1 className='text-4xl mt-10 text-slate-200 font-bold text-center mb-9 md:mb-0'>
            Listado de Administradores
          </h1>
          <br></br>

          <div className = "mx-10">
          <table className = "rounded-xl border" >
            <thead className='bg-slate-400'>
              <tr>
                <th style={{ width: '25%' }}>idAdmin</th>
                <th style={{ width: '25%' }}>Nombre</th>
                <th style={{ width: '25%' }}>Direccion</th>
                <th style={{ width: '25%' }}>Telefono</th>
                <th style={{ width: '25%' }}>Acciones</th>


              </tr>
            </thead>

            <tbody className=" bg-slate-300 rounded-t-xl border">
              {
                admin.map(
                  item =>
                    <tr key={item._id}>
                      <td className="text-center p-1">{item._id}</td>
                      <td className="text-center p-1">{item.nombre}</td>
                      <td className="text-center p-1">{item.direccion}</td>
                      <td className="text-center p-1" >{item.telefono}</td>

                     
                      <td>
                      <div class="inline-flex rounded-md shadow-sm" role="group">
                        <Link
                          to={`/actualizar-admin/${item._id}`}
                          className="bg-blue-600 w-full p-3 mx-1 text-white uppercase font-bold block  text-center rounded-lg"
                        >Editar</Link>
                        
                        <button
                          onClick={() => borrarAdmin(item._id)}
                          className="bg-blue-600 w-full p-3 mx-1 text-white uppercase font-bold block  text-center rounded-lg"
                        >Eliminar</button>
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


export default HomeAdmin;