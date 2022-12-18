import React from "react";
import { Link } from 'react-router-dom';
import Header from "../Header";
import Sidebar from "../Sidebar";

const CrearBoletin = () => {
    return (
        <>
            <Header className="-z-10" />
            <div className="z-0 md:flex md:min-h-screen">
                <Sidebar />
                <main className="flex-1 text-slate-200 text-3xl mt-8 p-5 w-1/3 text-center">
                    <div>

                        <h1> Crear Boletin</h1>
                        <h3> Ingrese información solicitada</h3>

                        <form
                            className="mx-auto mt-10 bg-slate-200 shadow-cyan-300 rounded-lg py-5 w-2/5"
                        //onSubmit={onSubmit}
                        >
                            <div className="mx-auto py-5 w-4/5">
                                <label className="text-2xl font-bold uppercase text-gray-600 block">Materia</label>
                                <input
                                    type="text"
                                    id="materia"
                                    name="materia"
                                    placeholder="Ingrese Materia"
                                    className="w-full text-2xl mt-3 p-4 border rounded-lg bg-gray-100 text-slate-600 "
                                //value={materia}
                                //onChange={onChange}
                                />

                                <label className="text-2xl mt-5 font-bold uppercase text-gray-600 block">Alumnos</label>
                                <input
                                    type="text"
                                    id="alumno"
                                    name="alumno"
                                    placeholder="Ingrese alumno"
                                    className="w-full text-2xl mt-3 p-4 border rounded-lg bg-gray-100 text-slate-600"
                                //value={notas}
                                //onChange={onChange}
                                />

                                <label className="text-2xl mt-5 font-bold uppercase text-gray-600 block">Notas</label>
                                <input
                                    type="text"
                                    id="notas"
                                    name="notas"
                                    placeholder="Ingrese su notas separados por coma"
                                    className="w-full text-2xl mt-3 p-4 border rounded-lg bg-gray-100 text-slate-600"
                                //value={notas}
                                //onChange={onChange}
                                />

                                <label className="text-2xl mt-5 font-bold uppercase text-gray-600 block">Observaciones</label>
                                <input
                                    type="textarea"
                                    id="observaciones"
                                    name="observaciones"
                                    placeholder="Ingrese sus observaciones"
                                    className="w-full text-2xl mt-3 p-4 border rounded-lg bg-gray-100 text-slate-600"
                                //value={notas}
                                //onChange={onChange}
                                />
                                <input
                                    type="submit"
                                    value="Crear Boletin"
                                    className="bg-blue-600 mt-10 text-2xl w-3/5 p-3 border rounded-xl hover:notasr-pointer hover:bg-blue-500 text-white font-bold uppercase"
                                />

                            </div>

                            <Link className="text-gray-700 mt-5 hover:text-gray-500 block text-center text-lg font-bold uppercase" to={"/menu-boletin"}>Regresar</Link>

                        </form>

                    </div>
                </main>

            </div>

        </>

    )

}

export default CrearBoletin;