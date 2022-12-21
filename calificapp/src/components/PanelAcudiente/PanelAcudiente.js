import React, { useEffect } from 'react'; 
import { useNavigate} from 'react-router-dom';
import HeaderAcudiente from './HeaderAcudiente.js';
import SidebarAcudiente from './SidebarAcudiente.js';

const PanelAcudiente = () => {
  
  const navigate = useNavigate(); 

  useEffect(() =>{
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token")
      //console.log(token)
      if(!token){
        navigate("/login");
      }
    }
    autenticarUsuario()
  },[navigate]);// [] solo se ejecute una vez el useEffect

  return (
    <>
        <HeaderAcudiente className="-z-10" />
        <div className="z-0 md:flex md:min-h-screen">
            <SidebarAcudiente/>
            <main className="flex-1 text-slate-50 text-3xl mt-8 p-5 block text-center">
            <p>
                 Bienvenido
                 <br></br>
                 "La Educación es el arma más poderosa que puedes usar para cambiar el mundo. (Nelson Mandela)"

              </p>
            </main>
            
        </div>
        
        
        
        </>

        
    );
}

export default PanelAcudiente;