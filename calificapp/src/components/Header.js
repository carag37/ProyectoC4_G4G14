import React from 'react'; 
import { useNavigate} from 'react-router-dom';
import Academia from '../assets/img/Academia.png';



const Header = () => {

    const navigate = useNavigate(); 


    const cerrarSesion = () =>{
        localStorage.removeItem("token");
        navigate("/");
      }
  

  return (
    <header className=" px-4 py-5 border-b bg-white">
        <div className ='md:flex md:justify-between'>
            <img src={Academia} size='40px'/>
            <h2 className= 'text-4xl text-blue-600 font-bold text-center mb-5 md:mb-0'>
                Academia Infantil - Consola de Administrador
            </h2>
            <div className= 'flex-col md:flex-row items-center gap-4'>
                <input
                    type="submit"
                    value="Cerrar Sesion"
                    className="bg-blue-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-400 transition-colors"
                    onClick={cerrarSesion}
                />
            </div>

        </div>
    </header>
      
    );
}

export default Header;