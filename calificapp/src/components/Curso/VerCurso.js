import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Header from "../Header";
import Sidebar from "../Sidebar";
import crud from "../../utils/crud";
import swalt from 'sweetalert/dist/sweetalert.min.js';

const VerCurso = () => {

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

    const [curso, setCursos] = useState([]);

    const cargarCursos = async () => {

        const response = await crud.GET('/api/cursos/all');
        //console.log(response)
        //const mensaje_res = response.msg;
        setCursos(response)
    }


    useEffect(() => {
        cargarCursos();
    })

    const borrarCurso = async (IdCurso, nombre) => {

        swalt({
            title: "Está seguro?",
            text: "Una vez eliminada, no podrás recuperar la información de la Curso: " + nombre,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    const data = {
                        "_id": IdCurso,
                    }

                    const response = crud.DELETE('/api/cursos', data)

                    //if(response.msg === "La curso " + IdCategoria + " eliminado correctamente"){
                    if (response) {
                        console.log("ok")

                        new swalt({
                            title: 'Información',
                            text: "La curso " + nombre + " eliminada correctamente",
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

                    //   swalt("La Curso " + nombre + " seleccionada se ha eliminado!", {
                    //     icon: "success",
                    //   });
                } else {
                    swalt("Curso " + nombre + " no ha sido eliminada");
                }
            });

    }

    const editarCurso = async (IdCurso, nombre) => {


        const data = {
            "_id": IdCurso,
            "nombre": nombre
        }

        console.log(data)
        navigate(`/actualizar-curso/${IdCurso}`)


    }

    //[] Vacío solo se ejecuta una vez el useEffect antes de renderizar 

    // const agregarCurso = () => {
    //     navigate("/agregar-curso")
    // }

    // const actualizarCurso = () => {
    //     navigate("/actualizar-curso")
    // }

    // const eliminarCurso = async (data) => {

    //     const response = await crud.DELETE('/api/cursos', data)
    //     console.log(response)
    // }


    return (
        <>
            <Header />
            <div className='md:flex md:min-h-screen'>
                <Sidebar />
                <main className="min-h-screen">
                    <div>
                        <div className="mt-10 mx-5" >
                            <Link
                                to={`/crear-Acudiente`}
                                className="bg-blue-600 p-3 text-white uppercase font-bold text-center rounded-lg"
                            >Crear Curso
                            </Link>
                        </div>

                        <h1 className='text-4xl mt-10 text-slate-200 font-bold text-center mb-9 md:mb-0'>
                            Listado de Cursos
                        </h1>

                        <div className="mx-10 inline-block">
                            <table className="rounded-xl border table-fixed w-full" >
                                <thead className='bg-slate-400'>
                                    <tr>
                                        {/* <th style={{ width: '20%' }}>Id</th> */}
                                        <th style={{ width: '20%' }}>Nombre</th>
                                        <th style={{ width: '20%' }}>Curso</th>
                                        <th style={{ width: '20%' }}>Docente</th>
                                        <th style={{ width: '20%' }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className=" bg-slate-300 rounded-t-xl border">
                                    {
                                        curso.map(
                                            item =>
                                                <tr key={item._id}>
                                                    {/* <td>{item._id}</td> */}
                                                    <td>{item.nombre}</td>
                                                    <td>{item.curso[0]}<br></br>{item.curso[1]}</td>
                                                    <td>{item.docente} </td>
                                                    <td>
                                                        <div className="inline-flex rounded-md shadow-sm" role="group">
                                                            <button onClick={() => editarCurso(item._id, item.nombre)}
                                                                className="bg-blue-600 w-full p-3 mx-1 text-white uppercase font-bold block  text-center rounded-lg">
                                                                Editar
                                                            </button>
                                                            <button onClick={() => borrarCurso(item._id, item.nombre)} className="bg-blue-600 w-full p-3 mx-1 text-white uppercase font-bold block  text-center rounded-lg">
                                                                Eliminar
                                                            </button>
                                                        </div>
                                                    </td>

                                                </tr>


                                        )


                                    }

                                </tbody>

                            </table>
                        </div>

                        <Link className="text-slate-300 mt-5 hover:text-gray-500 block text-center text-lg font-bold uppercase" to={"/menu-curso"}>Regresar</Link>

                    </div>

                </main>

            </div>

        </>

    )

}

export default VerCurso;