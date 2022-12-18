import React from "react";
import { Link } from 'react-router-dom';

const Sidebar = () => { //nombre del archivo


    return (
    
        <aside className="-mt-7 md:w-60 rounded-2xl lg:w-70 py-10 bg-slate-200">
            <p className="text-3xl text-center font-bold bg-blue-200 p-4 text-blue-500"> OPCIONES </p>
            <div className="">
            
            <Link 
                to={"/menu-usuarios"}
            className="bg-blue-600 block w-full text-center p-4 text-slate-200 hover:bg-blue-500 text-3xl font-bold">
            Cuentas</Link>
            <Link 
                to={"/menu-materia"}
            className="bg-blue-600 block w-full text-center p-4 text-slate-200 hover:bg-blue-500 text-3xl font-bold">
            Materias</Link>
            <Link 
                to={"/menu-curso"}
            className="bg-blue-600 block w-full text-center p-4 text-slate-200 hover:bg-blue-500 text-3xl font-bold">
            Cursos</Link>
            <Link 
                to={"/menu-boletin"}
            className="bg-blue-600 block w-full text-center p-4 text-slate-200 hover:bg-blue-500 text-3xl font-bold">
            Boletines</Link>
            
            </div>
        </aside>
        
    )

}

export default Sidebar;