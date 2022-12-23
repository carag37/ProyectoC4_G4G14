import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'; //, useNavigate 
import Header from "../Header";
import Sidebar from "../Sidebar";
import crud from "../../utils/crud";
import swalt from 'sweetalert/dist/sweetalert.min.js';

const ActualizarBoletin = () => {

    const navigate = useNavigate();

    const { idBoletin } = useParams()

    const [boletin, setBoletin] = useState({  //{varible, función} el use state también me inicaliza las variables en las cajas según necesidad (traductor, cambios de moneda, etc.)
        materia: '',
        alumno: '',
        notas: '',
        observaciones: '',
    })

    const cargarBoletin = async () => {
        const response = await crud.GET(`/api/boletines/one/${idBoletin}`);
        console.log(response)
        setBoletin(response)
    }

    useEffect(() => {
        cargarBoletin();
        // eslint-disable-next-line
    }, []);

    let { materia, alumno } = boletin;  //para back

    const onChange = (e) => {    //Para leer el contenido que tengo en las cajas a traves de una variable

        setBoletin({    //el useState me limita a cambiar los valores de la variable por acá
            ...boletin, //lo voy a cambiar con lo que se cargue en usuario
            [e.target.name]: e.target.value  //target es una propiedad de Js que me lee todo lo que trae
        })   //Cargo todo el usuario en la e
    }

    console.log(boletin)

    const actualizarBoletin = async () => {

        const data = {
            materia: boletin.materia,
            alumno: boletin.alumno,
            notas: boletin.notas,
            observaciones: boletin.observaciones,
        }


        const response = await crud.PATCH(`/api/boletines/${idBoletin}`, data)

        console.log(response.msg);

        let mensaje = "El boletin fue editado correctamente";

        new swalt({
            title: 'Información',
            text: mensaje,
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

        });
        navigate("/ver-boletin")

    }

    const onSubmit = (e) => {  //lo que se ejecuta cuando se presiona el botón
        e.preventDefault(); //evita que la página se cargue constantemente.
        actualizarBoletin();   //nueva función para crear un arreglo de data para enviar al Back
    }



    return (
        <>
            <Header className="-z-10" />
            <div className="z-0 md:flex md:min-h-screen">
                <Sidebar />
                <main className="flex-1 text-slate-200 text-3xl mt-8 p-5 w-1/3 text-center">
                    <div>

                        <h1> Actualizar Boletin</h1>
                        <h3> Ingrese información que desea actualizar</h3>

                        <form
                            className="mx-auto mt-10 bg-slate-200 shadow-cyan-300 rounded-lg py-5 w-2/5"
                            onSubmit={onSubmit}
                        >
                            <div className="mx-auto py-5 w-4/5">
                                <label className="text-2xl font-bold uppercase text-gray-600 block">Materia</label>
                                <input readonly="true"
                                    type="text"
                                    id="materia"
                                    name="materia"
                                    placeholder="Ingrese Materia"
                                    className="w-full text-2xl mt-3 p-4 rounded-lg bg-gray-300 text-slate-500 "
                                    value={materia}
                                    onChange={onChange}
                                />

                                <label className="text-2xl mt-5 font-bold uppercase text-gray-600 block">Id Alumno</label>
                                <input readonly="true"
                                    type="text"
                                    id="alumno"
                                    name="alumno"
                                    placeholder="Ingrese alumno"
                                    className="w-full text-2xl mt-3 p-4 rounded-lg bg-gray-300 text-slate-500"
                                    value={alumno}
                                    onChange={onChange}
                                />

                                <label className="text-2xl mt-5 font-bold uppercase text-gray-600 block">Notas</label>
                                <input
                                    type="text"
                                    id="notas"
                                    name="notas"
                                    placeholder="Ingrese su notas separados por coma"
                                    className="w-full text-2xl mt-3 p-4 border rounded-lg bg-gray-100 text-slate-600"
                                    //value={notas}
                                    onChange={onChange}
                                />

                                <label className="text-2xl mt-5 font-bold uppercase text-gray-600 block">Observaciones</label>
                                <input
                                    type="textarea"
                                    id="observaciones"
                                    name="observaciones"
                                    placeholder="Ingrese sus observaciones"
                                    className="w-full text-2xl mt-3 p-4 border rounded-lg bg-gray-100 text-slate-600"
                                    //value={observaciones}
                                    onChange={onChange}
                                />
                                <input
                                    type="submit"
                                    value="Actualizar Boletin"
                                    className="bg-blue-600 mt-10 text-2xl w-4/5 p-3 border rounded-xl hover:notasr-pointer hover:bg-blue-500 text-white font-bold uppercase"
                                />

                            </div>

                            <Link className="text-gray-700 mt-5 hover:text-gray-500 block text-center text-lg font-bold uppercase" to={"/ver-boletin"}>Regresar</Link>

                        </form>

                    </div>
                </main>

            </div>

        </>

    )

}

export default ActualizarBoletin;