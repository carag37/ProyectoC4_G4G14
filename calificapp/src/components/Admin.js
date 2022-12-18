import React, { useEffect } from 'react'; 
import { useNavigate} from 'react-router-dom';
import Header from './Header';
import Sidebar from "./Sidebar";



const Admin = () => {
  
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
        <Header className="-z-10" />
        <div className="z-0 md:flex md:min-h-screen">
            <Sidebar/>
            <main className="flex-1 text-slate-50 text-3xl mt-8 p-5 block text-center">
                Bienvenido 
            </main>
            
        </div>
        
        
        
        </>

        
    );
}

export default Admin;