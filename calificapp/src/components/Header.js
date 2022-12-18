import React from "react";
import { useNavigate } from "react-router-dom";
import Academia from '../assets/img/Academia.png';

const Header = () => { //nombre del archivo
    
    const navigate = useNavigate();

    const cerrarSesion = () => {
        localStorage.removeItem("token");
        navigate("/")
    }

    return (
        <header className="bg-slate-200 rounded-2xl -my-3 px-4 py-5 z-10">
            <div className='md:flex md:justify-between'>
            <img src={Academia} size='40px' alt="LogoInstitución"/>
                <h2 className="text-3xl flex justify-center rounded-lg text-blue-600 font-bold p-5 md:mb-0 uppercase" >
                    CalificAPP - Academia Infantil - Panel Administrador
                </h2>
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <input type="submit" value="Cerrar sesión" onClick={cerrarSesion}
                        className="bg-blue-600 w-full p-2 rounded-lg hover:cursor-pointer hover:bg-blue-500 text-white font-bold uppercase" />

                </div>
            </div>
        </header>


        //    <main className="containter mx-auto mt-5 md:mt-20 p- md:flex md:justify-center">
        //         <div className = "md:w-2/3 lg:w-2/5">
        //             <h1 className="text-3xl block text-center bg-gradient-to-r  from-violet-500 via-gray-300 to-violet-500 text-transparent bg-clip-text "> 
        //             CalificAPP - Header
        //             </h1>
        //             <input type="submit" value="Cerrar sesión" onClick={cerrarSesion}
        //             className="bg-violet-600 w-full p-2 rounded-lg hover:cursor-pointer hover:bg-violet-500 text-white font-bold uppercase" />
        //         </div>

        //     </main>

    )

}

export default Header;