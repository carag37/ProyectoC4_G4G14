import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Header from "../Header";
import Sidebar from "../Sidebar";
import crud from "../../utils/crud";
import swalt from 'sweetalert/dist/sweetalert.min.js';

const VerBoletin = () => {

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

    const [boletin, setBoletines] = useState([]);

    const cargarBoletines = async () => {

        const response = await crud.GET('/api/boletines/all');
        //console.log(response)
        //const mensaje_res = response.msg;
        setBoletines(response)
    }


    useEffect(() => {
        cargarBoletines();
    },[])

    const borrarBoletin = async (IdBoletin, nombre) => {

        swalt({
            title: "Está seguro?",
            text: "Una vez eliminada, no podrás recuperar la información del Boletin",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    const data = {
                        "_id": IdBoletin,
                    }

                    const response = crud.DELETE('/api/boletines', data)

                    //if(response.msg === "La boletin " + IdCategoria + " eliminado correctamente"){
                    if (response) {
                        console.log("ok")

                        new swalt({
                            title: 'Información',
                            text: "El boletín se ha eliminado correctamente",
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

                    cargarBoletines();
                    cargarBoletines();

                } else {
                    swalt("Boletin no ha sido eliminado");
                }
            });

    }

    const editarBoletin = async (IdBoletin, nombre) => {


        const data = {
            "_id": IdBoletin,
            "nombre": nombre
        }

        console.log(data)
        navigate(`/actualizar-boletin/${IdBoletin}`)


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
                                to={`/crear-boletin`}
                                className="bg-blue-600 p-3 text-white uppercase font-bold text-center rounded-lg"
                            >Crear Boletin
                            </Link>
                        </div>

                        <h1 className='text-4xl mt-10 text-slate-200 font-bold text-center mb-9 md:mb-0'>
                            Listado de Boletines
                        </h1>

                        <div className="mx-10 inline-block my-10">
                            <table className="rounded-xl border table-auto w-full text-xl text-center" >
                                <thead className='bg-slate-500 border-b text-slate-50'>
                                    <tr>
                                        {/* <th style={{ width: '20%' }}>Id</th> */}
                                        <th style={{ width: '15%' }}>Materia</th>
                                        <th style={{ width: '15%' }}>ID Alumno</th>
                                        <th style={{ width: '20%' }}>Notas</th>
                                        <th style={{ width: '20%' }}>Observaciones</th>
                                        <th style={{ width: '30%' }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className=" bg-slate-300 rounded-t-xl border">
                                    {
                                        boletin.map(
                                            item =>
                                                <tr key={item._id}>
                                                    {/* <td>{item._id}</td> */}
                                                    <td className="p-2 border">{item.materia}</td>
                                                    <td className="p-2 border">{item.alumno}</td>
                                                    <td className="p-2 border">{item.notas.join(", ")} </td>
                                                    <td className="text-md p-2 border">{item.observaciones} </td>

                                                    <td className="text-md border p-2">
                                                        <div className="inline-flex rounded-md shadow-sm" role="group">
                                                            <button onClick={() => editarBoletin(item._id, item.nombre)}
                                                                className="bg-blue-600 w-full p-3 mx-1 text-white uppercase font-bold block  text-center rounded-lg">
                                                                Agregar Nota / Observacion
                                                            </button>
                                                            <button onClick={() => borrarBoletin(item._id, item.nombre)} className="bg-blue-600 w-full p-3 mx-1 text-white uppercase font-bold block  text-center rounded-lg">
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
                        <Link className="text-white hover:text-gray-500 block text-center text-lg font-bold uppercase" to={"/menu-boletin"}>Regresar</Link>
                    </div>
                </main>
            </div>
        </>
    )
}
export default VerBoletin;