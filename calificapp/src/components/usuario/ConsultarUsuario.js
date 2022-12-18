import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate} from 'react-router-dom';
import Header from '../Header';
import crud from '../../utils/crud.js';
import swal from 'sweetalert';
import Sidebar from '../Sidebar';

const ConsultarUsuario = () => {
  
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

  const [usuario, setUsuario] = useState([]);

  const cargarUsuarios = async () => {
      const response = await crud.GET(`/api/usuarios`);
      //console.log(response);
      setUsuario(response.usuario);
  }

  useEffect(() => {
      cargarUsuarios();
  }, [])

  const borrarUsuario = async (idUsuario) =>{
    swal({
      title: "Estas seguro de eliminar el usuario?",
      text: "una vez eliminado, no se podra recuperar este usuario",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        const response = crud.DELETE(`/api/usuarios/${idUsuario}`);
        
        if(response){
          swal("El usuario ha sido borrado", {
            icon: "success",
          });
        }
        cargarUsuarios();
       
      } else {
        swal("se cancelo la acción");
      }
    });
   }


  return (
    <>
        <Header/>
        <div className='md:flex md:min-h-screen'>
            <Sidebar/>
            <div>
                <Link 
                    to={`/crear-cuentaIn`}
                    className="bg-blue-600 p-3  text-white uppercase font-bold   text-center rounded-lg"
                    >Crear Usuario
                </Link>
            </div>
            
            <main className= 'flex-1'>
                <h1 className= 'text-4xl text-blue-600 font-bold text-center mb-5 md:mb-0'>
                    Listado de Usuarios
                </h1>
                <br></br>
                
                <table className="table table-bordered">
                <thead className='bg-white'>
                  <tr>
                    <th style={{ width: '25%' }}>Cedula</th>
                    <th style={{ width: '25%' }}>Nombre</th>
                    <th style={{ width: '25%' }}>Email</th>
                    <th style={{ width: '25%' }}>Tipo</th>
                  </tr>
                </thead>
        
                <tbody className="bg-white">
                  {
                    usuario.map(
                    item =>
                        <tr key={item._id}>
                            <td className="text-center">{item.cedula}</td>
                            <td  className="text-center">{item.nombre}</td>
                            <td  className="text-center">{item.email}</td>
                            <td className="text-center" >{item.tipoUsuario}</td>
                            
                            <td>    
                                <Link 
                                 to={`/actualizar-usuario/${item._id}`}
                                 className="bg-blue-600 w-full p-3 text-white uppercase font-bold block  text-center rounded-lg"
                                >Editar</Link>&nbsp;&nbsp;
                            </td>
                            <td>  
                                <button  
                                    onClick={()=>borrarUsuario(item._id)}
                                    className="bg-blue-600 w-full p-3 text-white uppercase font-bold block  text-center rounded-lg"
                                >Eliminar</button>
                            </td>
                        </tr>
                    )
                    }
                </tbody>
                </table>
            </main>
        </div>      
    </>
       
    );
}
        
export default ConsultarUsuario;