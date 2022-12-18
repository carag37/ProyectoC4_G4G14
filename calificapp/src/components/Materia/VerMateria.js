import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Header from "../Header";
import Sidebar from "../Sidebar";
import crud from "../../utils/crud";
import swalt from 'sweetalert/dist/sweetalert.min.js';

const VerMateria = () => {

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

    const [materia, setMaterias] = useState([]);

    const cargarMaterias = async () => {

        const response = await crud.GET('/api/materias/all');
        //console.log(response)
        //const mensaje_res = response.msg;
        setMaterias(response)
    }


    useEffect(() => {
        cargarMaterias();
    })

    const borrarMateria = async (IdCategoria, nombre) => {

           
            const data = {
                "_id": IdCategoria,               
            }
            
            const response = await crud.DELETE('/api/materias', data)

            if(response.msg === "La materia " + IdCategoria + " eliminado correctamente"){

                console.log("ok")

                new swalt({
                            title: 'Información',
                            text: "La materia " + nombre + " eliminada correctamente",
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

    const editarMateria = async (IdCategoria, nombre) => {

           
        const data = {
            "_id": IdCategoria,
            "nombre": nombre               
        }

        console.log(data)
        navigate("/actualizar-materia")        
       


}

    //[] Vacío solo se ejecuta una vez el useEffect antes de renderizar 

    // const agregarCurso = () => {
    //     navigate("/agregar-curso")
    // }

    // const actualizarMateria = () => {
    //     navigate("/actualizar-materia")
    // }

    // const eliminarMateria = async (data) => {

    //     const response = await crud.DELETE('/api/materias', data)
    //     console.log(response)
    // }


    return (
        <>
            <Header className="-z-10" />
            <div className="z-0 md:flex md:min-h-screen">
                <Sidebar />
                <main className="flex-1 text-slate-200 text-3xl mt-8 p-5 w-1/3 text-center">
                    <div>

                        <h1> Materia</h1>
                        <h3> Listado de Materias</h3>

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th style={{ width: '25%' }}>Id</th>
                                    <th style={{ width: '25%' }}>Nombre</th>
                                    <th style={{ width: '25%' }}>Curso</th>
                                    <th style={{ width: '25%' }}>Docente</th>
                                </tr>
                            </thead>
                            <tbody className="bg-slate-200 text-slate-700 text-sm">
                                {
                                    materia.map(
                                        item =>
                                            <tr key={item._id}>
                                                <td>{item._id}</td>
                                                <td>{item.nombre}</td>
                                                <td>{item.curso}</td>
                                                <td>{item.docente} </td>
                                                <td>
                                                    <button onClick={()=>editarMateria(item._id, item.nombre)}>
                                                       Editar 
                                                    </button>
                                                    <button onClick={()=>borrarMateria(item._id, item.nombre)}>
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

export default VerMateria;