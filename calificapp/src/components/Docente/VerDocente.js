import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header.js';
import Sidebar from '../Sidebar.js';
import crud from '../../utils/crud.js';
import swal from 'sweetalert';

const VerDocente = () => {

    let navigate = useNavigate();

    useEffect(() => {
        const autenticarUsuario = async () => {

            const token = localStorage.getItem("token")
            //console.log(token)
            if (!token) {
                navigate("/login");
            }
        }
        autenticarUsuario()

    }, [navigate]);

    const [docente, setDocentes] = useState([]);

    const cargarDocentes = async () => {

        const response = await crud.GET('/api/docentes/all');
        setDocentes(response.docente)
    }

    useEffect(() => {
        cargarDocentes();
    }, [navigate]);

    const [materia, setMaterias] = useState([]);

    const cargarMaterias = async () => {

        const response = await crud.GET('/api/materias/all');
        //console.log(response)
        //const mensaje_res = response.msg;
        setMaterias(response)
        
    }


    useEffect(() => {
        cargarMaterias();
         // eslint-disable-next-line
    },[]);

    const borrarDocente = async (IdCategoria) => {
        swal({
            title: "Estas seguro de eliminar el docente?",
            text: "Una vez eliminado, no se podra recuperar este usuario",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          
          .then((willDelete) => {
            if (willDelete) {
                        
            const response = crud.DELETE(`/api/docentes/${IdCategoria}`);

            if (response) {
                swal("El docente ha sido borrado", {
                  icon: "success",
                });        
              }
              cargarDocentes();
              navigate("/ver-docente")
    
            } else {
              swal("Se canceló la acción");
            }
          });   
                      
    }
    
    return (
        <>
            <Header />
            <div className='md:flex md:min-h-screen'>
                <Sidebar />
                <main className="min-h-screen w-full text-center">
                    <div>
                        <div className="mt-10 mx-5" >
                            <Link
                    to={`/crear-docente`}
                    className="bg-blue-600 p-3  text-slate-200 uppercase font-bold   text-center rounded-lg"
                    >Crear Docente
                    </Link>
                </div>
                <h1 className='text-4xl mt-10 text-slate-200 font-bold text-center mb-9 md:mb-0'>
                Listado de Docentes
                </h1>
                    <br></br>
                        <div className = "mx-10">
                         <table className = "rounded-xl border" >
                            <thead className='bg-slate-400'>
                                <tr>
                                    <th style={{ width: '20%' }}>Id</th>
                                    <th style={{ width: '10%' }}>Nombre</th>
                                    <th style={{ width: '55%' }}>Materias</th>
                                    <th style={{ width: '35%' }}>Acciones</th>
                                </tr>
                            </thead>

                            <tbody className="bg-slate-300 rounded-t-xl border">
                                {
                                    docente.map(
                                        item =>
                                            <tr key={item._id}>
                                                <td className="text-left p-1 border">{item._id}</td>
                                                <td className="text-left p-1 border">{item.nombre}</td>
                                                <td className="px-2 text-left border">{materia.filter(function(element){ return element.docente.includes(item._id) }).map(ModArr=>ModArr.nombre).join(", ")}</td>
                                                <td>
                                                    <div className="inline-flex rounded-md shadow-sm" role="group">
                                                        <Link
                                                        to={`/actualizar-docente/${item._id}`}
                                                        className="bg-blue-600 w-full p-3 mx-1 text-white uppercase font-bold block  text-center rounded-lg"
                                                        >Editar</Link>
                                                        
                                                        <button
                                                        onClick={() => borrarDocente(item._id)}
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

                        <Link className="text-slate-300 mt-5 hover:text-gray-500 block text-center text-lg font-bold uppercase" to={"/menu-docente"}>Regresar</Link>                   
                </div>
                </main>
            </div>
        </>
    )
}

export default VerDocente;