import React from "react";
import { useNavigate } from "react-router-dom";
import Academia from '../../assets/img/Academia.png';

const HeaderAcudiente = () => { //nombre del archivo
    
    const navigate = useNavigate();

    const cerrarSesion = () => {
        localStorage.removeItem("token");
        navigate("/")
    }

    return (
        <header className="bg-slate-200 rounded-2xl -my-3 px-4 py-5 z-10">
            <div className='md:flex md:justify-between'>
            <img src={Academia} size='40px' width="150" height="100" alt="LogoInstitución"/>
                <h2 className="text-3xl flex justify-center rounded-lg text-blue-600 font-bold p-5 md:mb-0 uppercase" >
                    CalificAPP - Academia Infantil - Panel De Padres y/o Acudientes
                </h2>
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <input type="submit" value="Cerrar sesión" onClick={cerrarSesion}
                        className="bg-blue-600 w-full p-2 rounded-lg hover:cursor-pointer hover:bg-blue-500 text-white font-bold uppercase" />

                </div>
            </div>
        </header>
    )

}

export default HeaderAcudiente;