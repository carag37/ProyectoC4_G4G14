import React from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../Header";
import Sidebar from "../Sidebar";

const MenuCurso = () => {
    
    let navigate = useNavigate();
        
    const crearCurso = () => {
        navigate("/crear-curso")
    }

    const verCurso = () => {
        navigate("/ver-curso")
    }

    // const actualizarCurso = () => {
    //     navigate("/actualizar-curso")
    // }

    return (
        <>
            <Header className="-z-10" />
            <div className="z-0 md:flex md:min-h-screen">
                <Sidebar />
                <main className="flex-1 text-slate-200 text-3xl mt-8 p-5 w-1/3 text-center">
                    <div>

                        <h1> Curso</h1>
                        <h3> Seleccione la opción deseada</h3>

                        <form
                            className="mx-auto mt-10 bg-slate-200 shadow-cyan-300 rounded-lg py-5 w-2/5"
                        //onSubmit={onSubmit}
                        >
                            <div className="mx-auto py-5 w-4/5">


                                <input
                                    type="submit"
                                    value="Crear Curso"
                                    className="bg-blue-600 mt-4 text-2xl w-full p-3 border rounded-xl hover:cursor-pointer hover:bg-blue-500 text-white font-bold uppercase"
                                    onClick = { crearCurso }
                                />

                                <input
                                    type="submit"
                                    value="Ver Cursos"
                                    className="bg-blue-600 mt-10 text-2xl w-full p-3 border rounded-xl hover:cursor-pointer hover:bg-blue-500 text-white font-bold uppercase"
                                    onClick = { verCurso }
                                />

                                {/* <input
                                    type="submit"
                                    value="Actualizar Curso"
                                    className="bg-blue-600 mt-10 text-2xl w-full p-3 border rounded-xl hover:cursor-pointer hover:bg-blue-500 text-white font-bold uppercase"
                                    onClick = { actualizarCurso }
                                /> */}

                            </div>

                        </form>

                    </div>

                </main>

            </div>

        </>

    )

}

export default MenuCurso;