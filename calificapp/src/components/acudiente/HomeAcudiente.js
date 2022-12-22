import React, { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import Header from '../Header.js';
import Sidebar from '../Sidebar.js';
import crud from '../../utils/crud.js';
//import ConsultarAcudiente from './ConsultarAcudiente';
import swal from 'sweetalert';


const HomeAcudiente = () => {

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
  }, [navigate]);// [] hacen que solo se ejecute una vez el useEffect



  const [acudientes, setAcudiente] = useState([]);

  const cargarAcudiente = async () => {
    const response = await crud.GET('/api/acudientes/');
    //console.log(response);
    
    setAcudiente(response.acudiente);
  }
  //console.log(productos);
  useEffect(() => {
    cargarAcudiente();
  });

  const borrarAcudiente = async (idUsuario) => {
    swal({
      title: "Estas seguro de eliminar el usuario Acudienteistrador?",
      text: "una vez eliminado, no se podra recuperar este usuario",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          const response = crud.DELETE(`/api/Acudientes/${idUsuario}`);

          if (response) {
            swal("El usuario Acudienteistrador ha sido borrado", {
              icon: "success",
            });
          }
          cargarAcudiente();

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
              to={`/consultar-usistemaac/${'Acudiente'}`}
              className="bg-blue-600 p-3 text-white uppercase font-bold text-center rounded-lg"
            >Crear Usuario Sistema
            </Link>
            <p className='text-2xs mt-8 text-slate-200 font-bold text-center mb-9 md:mb-0'>
              Para crear el Acudiente, debe primero crear el Usuario en el Sistema
            </p>
          </div>

          <h1 className='text-4xl mt-10 text-slate-200 font-bold text-center mb-20 md:mb-0'>
            Listado de Acudientes
          </h1>
          <br></br>

          <div className = "mx-10">
          <table className = "rounded-xl border" >
            <thead className='bg-slate-400'>
              <tr>
                <th style={{ width: '10%' }}>Nombre</th>
                <th style={{ width: '10%' }}>Direccion</th>
                <th style={{ width: '10%' }}>Telefono</th>
                <th style={{ width: '50%' }}>Alumno</th>
                <th style={{ width: '10%' }}>Parentezco</th>
                <th style={{ width: '10%' }}>Acciones</th>


              </tr>
            </thead>

            <tbody className=" bg-slate-300 rounded-t-xl border">
              {
                acudientes.map(
                  
                  item =>
                    <tr key={item._id}>
                      <td className="text-center p-1">{item.nombre}</td>
                      <td className="text-center p-1">{item.direccion}</td>
                      <td className="text-center p-1" >{item.telefono}</td>
                      <td className="text-center p-1" >{item.alumno}</td>
                      <td className="text-center p-1" >{item.parentesco}</td>         
                      <td>
                      <div class="inline-flex rounded-md shadow-sm" role="group">
                        <Link
                          to={`/actualizar-Acudiente/${item._id}`}
                          className="bg-blue-600 w-full p-3 mx-1 text-white uppercase font-bold block  text-center rounded-lg"
                        >Editar</Link>
                        
                        <button
                          onClick={() => borrarAcudiente(item._id)}
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

export default HomeAcudiente;