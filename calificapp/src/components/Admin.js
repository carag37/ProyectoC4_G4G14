import React, { useEffect } from 'react'; 
import { useNavigate} from 'react-router-dom';
import Header from './Header';
import Menu from './Menu';


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
        <Header/>
        <div className='md:flex md:min-h-screen'>
            <Menu/>
            <h1> LISTADO DE USUARIOS</h1>
            
        </div>
        
    </>
    );
}

export default Admin;