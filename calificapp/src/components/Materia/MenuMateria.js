import React from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../Header";
import Sidebar from "../Sidebar";

const MenuMateria = () => {
    
    let navigate = useNavigate();
        
    const crearMateria = () => {
        navigate("/crear-materia")
    }

    const verMateria = () => {
        navigate("/ver-materia")
    }

    const actualizarMateria = () => {
        navigate("/actualizar-materia")
    }

    return (
        <>
            <Header className="-z-10" />
            <div className="z-0 md:flex md:min-h-screen">
                <Sidebar />
                <main className="flex-1 text-slate-200 text-3xl mt-8 p-5 w-1/3 text-center">
                    <div>

                        <h1> Materia</h1>
                        <h3> Seleccione la opción deseada</h3>

                        <form
                            className="mx-auto mt-10 bg-slate-200 shadow-cyan-300 rounded-lg py-5 w-2/5"
                        //onSubmit={onSubmit}
                        >
                            <div className="mx-auto py-5 w-4/5">


                                <input
                                    type="submit"
                                    value="Crear Materia"
                                    className="bg-blue-600 mt-4 text-2xl w-full p-3 border rounded-xl hover:cursor-pointer hover:bg-blue-500 text-white font-bold uppercase"
                                    onClick = { crearMateria }
                                />

                                <input
                                    type="submit"
                                    value="Ver Materias"
                                    className="bg-blue-600 mt-10 text-2xl w-full p-3 border rounded-xl hover:cursor-pointer hover:bg-blue-500 text-white font-bold uppercase"
                                    onClick = { verMateria }
                                />

                                <input
                                    type="submit"
                                    value="Actualizar Materia"
                                    className="bg-blue-600 mt-10 text-2xl w-full p-3 border rounded-xl hover:cursor-pointer hover:bg-blue-500 text-white font-bold uppercase"
                                    onClick = { actualizarMateria }
                                />

                            </div>

                        </form>

                    </div>

                </main>

            </div>

        </>

    )

}

export default MenuMateria;