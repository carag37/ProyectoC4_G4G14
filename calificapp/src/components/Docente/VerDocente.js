import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Header from "../Header";
import Sidebar from "../Sidebar";
import crud from "../../utils/crud";
import swalt from 'sweetalert/dist/sweetalert.min.js';

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
        setDocentes(response)
    }


    useEffect(() => {
        cargarDocentes();
    })

    const borrarDocente = async (IdCategoria, nombre) => {

           
            const data = {
                "_id": IdCategoria,               
            }
            
            const response = await crud.DELETE('/api/docentes', data)

            if(response.msg === "El docente " + IdCategoria + " eliminado correctamente"){

                console.log("ok")

                new swalt({
                            title: 'Información',
                            text: "El docente " + nombre + " eliminado correctamente",
                            icon: 'success',
                            button: {
                                confirm: {
                                    text: 'OK',
                                    value: true,
                                    visible: true,
                                    className: 'btn btn-primary',
                                    closeModal: true
                                }
                            }
                        })
            }
                    
           


    }

    const editarDocente = async (IdCategoria, nombre) => {

           
        const data = {
            "_id": IdCategoria,
            "nombre": nombre               
        }

        console.log(data)
        navigate("/actualizar-docente")        
       


}

    return (
        <>
            <Header className="-z-10" />
            <div className="z-0 md:flex md:min-h-screen">
                <Sidebar />
                <main className="flex-1 text-slate-200 text-3xl mt-8 p-5 w-1/3 text-center">
                    <div>

                        <h1> Docente</h1>
                        <h3> Listado de Docentes</h3>

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th style={{ width: '20%' }}>Id</th>
                                    <th style={{ width: '30%' }}>Nombre</th>
                                    <th style={{ width: '50%' }}>Materias</th>
                                </tr>
                            </thead>
                            <tbody className="bg-slate-200 text-slate-700 text-sm">
                                {
                                    docente.map(
                                        item =>
                                            <tr key={item._id}>
                                                <td>{item._id}</td>
                                                <td>{item.nombre}</td>
                                                <td>{item.materias}</td>
                                                <td>
                                                    <button onClick={()=>editarDocente(item._id, item.nombre)}>
                                                       Editar 
                                                    </button>
                                                    <button onClick={()=>borrarDocente(item._id, item.nombre)}>
                                                        Eliminar 
                                                    </button>
                                                 
                                                </td>

                                            </tr>


                                    )


                                }

                            </tbody>

                        </table>

                        <Link className="text-slate-300 mt-5 hover:text-gray-500 block text-center text-lg font-bold uppercase" to={"/menu-materia"}>Regresar</Link>

                    </div>

                </main>

            </div>

        </>

    )

}

export default VerDocente;