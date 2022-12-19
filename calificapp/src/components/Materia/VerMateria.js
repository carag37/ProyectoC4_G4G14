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
    console.log(response)
        //const mensaje_res = response.msg;
        setMaterias(response)
    }


    useEffect(() => {
        cargarMaterias();
    })

    const borrarMateria = async (IdCategoria, nombre) => {

        swalt({
            title: "Está seguro?",
            text: "Una vez eliminada, no podrás recuperar la información de la Materia: " + nombre,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    const data = {
                        "_id": IdCategoria,
                    }

                    const response = crud.DELETE('/api/materias', data)

                    //if(response.msg === "La materia " + IdCategoria + " eliminado correctamente"){
                    if (response) {
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

                    //   swalt("La Materia " + nombre + " seleccionada se ha eliminado!", {
                    //     icon: "success",
                    //   });
                } else {
                    swalt("Materia " + nombre + " no ha sido eliminada");
                }
            });

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
            <Header />
            <div className='md:flex md:min-h-screen'>
                <Sidebar />
                <main className='flex-1'>
                    <div>
                        <div className="mt-10 mx-5" >
                            <Link
                                to={`/crear-Acudiente`}
                                className="bg-blue-600 p-3 text-white uppercase font-bold text-center rounded-lg"
                            >Crear Materia
                            </Link>
                        </div>

                        <h1 className='text-4xl mt-10 text-slate-200 font-bold text-center mb-9 md:mb-0'>
                            Listado de Materias
                        </h1>

                        <div className="mx-10">
                            <table className="rounded-xl border" >
                            <thead className='bg-slate-400'>
                                    <tr>
                                        <th style={{ width: '20%' }}>Id</th>
                                        <th style={{ width: '20%' }}>Nombre</th>
                                        <th style={{ width: '20%' }}>Curso</th>
                                        <th style={{ width: '20%' }}>Docente</th>
                                        <th style={{ width: '20%' }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className=" bg-slate-300 rounded-t-xl border">
                                    {
                                        materia.map(
                                            item =>
                                                <tr key={item._id}>
                                                    <td>{item._id}</td>
                                                    <td>{item.nombre}</td>
                                                    <td>{item.curso + " "}</td>
                                                    <td>{item.docente} </td>
                                                    <td>
                                                    <div class="inline-flex rounded-md shadow-sm" role="group">
                                                        <button onClick={() => editarMateria(item._id, item.nombre)} 
                                                        className="bg-blue-600 w-full p-3 mx-1 text-white uppercase font-bold block  text-center rounded-lg">
                                                            Editar
                                                        </button>
                                                        <button onClick={() => borrarMateria(item._id, item.nombre)} className="bg-blue-600 w-full p-3 mx-1 text-white uppercase font-bold block  text-center rounded-lg">
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

                        <Link className="text-slate-300 mt-5 hover:text-gray-500 block text-center text-lg font-bold uppercase" to={"/menu-materia"}>Regresar</Link>

                    </div>

                </main>

            </div>

        </>

    )

}

export default VerMateria;