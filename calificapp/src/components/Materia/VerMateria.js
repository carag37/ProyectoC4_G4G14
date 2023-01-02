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
         // eslint-disable-next-line
    },[]);

    const [cursos, setCursos] = useState([]);

    const cargarCursos = async () => {

        const response = await crud.GET('/api/cursos/all');
        //console.log(response)
        setCursos(response)

        
        
    }

    useEffect(() => {
        cargarCursos();
                 // eslint-disable-next-line
    },[]);





    const borrarMateria = async (IdMateria, nombre) => {

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
                        "_id": IdMateria,
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
                    cargarMaterias();

                    //   swalt("La Materia " + nombre + " seleccionada se ha eliminado!", {
                    //     icon: "success",
                    //   });
                } else {
                    swalt("Materia " + nombre + " no ha sido eliminada");
                }
            });

    }

    const editarMateria = async (IdMateria, nombre) => {


        const data = {
            "_id": IdMateria,
            "nombre": nombre
        }

        console.log(data)
        navigate(`/actualizar-materia/${IdMateria}`)


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
                <main className="min-h-screen w-full rounded-lg">
                    <div>
                        <div className="mt-10 mx-5" >
                            <Link
                                to={`/crear-materia`}
                                className="bg-blue-600 p-3 text-white uppercase font-bold text-center rounded-lg"
                            >Crear Materia
                            </Link>
                        </div>

                        <h1 className='text-4xl mt-10 text-white font-bold text-center mb-9 md:mb-0'>
                            Listado de Materias
                        </h1>

                        <div className="w-full px-20 my-5">
                            <table className="rounded-xl border table-auto text-lg w-full rounded-t-xl" >
                                <thead className='bg-slate-400'>
                                    <tr>
                                        {/* <th style={{ width: '20%' }}>Id</th> */}
                                        <th style={{ width: '20%' }}>Nombre</th>
                                        <th style={{ width: '20%' }}>Curso</th>
                                        <th style={{ width: '20%' }}>Docente</th>
                                        <th style={{ width: '20%' }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className=" bg-slate-300 border">
                                    
                                    {
                                        materia.map(
                                            item =>
                                                <tr key={item._id}>
                                                    {/* <td>{item._id}</td> */}
                                                    <td className="px-2 border">{item.nombre}</td>
                                                    <td className="px-2 border">{cursos.filter(function(element){ return element.materia.includes(item.nombre) }).map(ModArr=>ModArr.descripcion).join(", ")}</td>
                                                    <td className="px-2 border">{item.docente} </td>
                                                    <td className="p-2 border">
                                                        <div className="inline-flex rounded-md shadow-sm" role="group">
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
                        <Link className="text-white mb-20 hover:text-gray-300 block text-center text-xl font-bold uppercase" to={"/menu-materia"}>Regresar</Link>
                    </div>
                </main>
            </div>
        </>
    )
}

export default VerMateria;