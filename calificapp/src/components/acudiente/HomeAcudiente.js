import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate, useParams} from 'react-router-dom';
import Header from '../Header';
import Menu from '../Menu';
import crud from '../../conexiones/crud';
import swal from 'sweetalert'; 
import ConsultarAcudiente from './ConsultarAcudiente';

const HomeAcudiente = () => {
  
  const navigate = useNavigate(); 

  const {usuarioSistema} = useParams();

  useEffect(() =>{
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token")
      //console.log(token)
      if(!token){
        navigate("/login");
      }
    }
    autenticarUsuario()
  },[navigate]);// [] hacen que solo se ejecute una vez el useEffect


  
    const [acudientes, setAcudiente] = useState([]);
  
    const cargarAcudiente = async () => {
      const response = await crud.GET(`/api/acudientes/${usuarioSistema}`);
      //console.log(response);
      setAcudiente(response);
    }
  //console.log(productos);
    useEffect(() => {
      cargarAcudiente();
    },[]);

  return (
      <>
      <Header/>
      <div className='md:flex md:min-h-screen'>
        <Menu/>
            <main className= 'flex-1'>
              <div className='mt-10 flex justify-center'>
              <h1 className="inline bg-gradient-to-r from-indigo-200 via-violet-700 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                ACUDIENTES
                </h1>
                </div>  
              
            <div className='p-12'>
              <Link
                to={`/crear-acudiente/${usuarioSistema}`}
                className='bg-blue-600 w-full p-3 text-white uppercase font-bold mt-5 text-center rounded-lg'
              >Crear Acudiente</Link>
            </div>

          <div className="bg-gray-400 shadow mt-10 rounded-lg">
            {acudientes.map( acudiente =>
              <ConsultarAcudiente
                key={acudiente._id}
                acudiente={acudiente}
              />
            )}
          </div>

            </main>
        </div>   

</>
    );
}

export default HomeAcudiente;