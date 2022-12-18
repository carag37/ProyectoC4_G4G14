import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate, useParams} from 'react-router-dom';
import Header from '../Header';
import Menu from '../Menu';
import crud from '../../utils/crud';
import ConsultarAdmin from './ConsultarAdmin.js';
import swal from 'sweetalert'; 


const HomeAdmin = () => {
  
  const navigate = useNavigate(); 

  //const {tipoUsuario} = useParams();

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


  
    const [admin, setAdmins] = useState([]);
  
    const cargarAdmins = async () => {
      const response = await crud.GET(`/api/admins`);
      //console.log(response);
      setAdmins(response);
    }
  
    useEffect(() => {
      cargarAdmins();
    },[navigate]);

    const borrarAdmin = async (idUsuario) =>{
      swal({
        title: "Estas seguro de eliminar el usuario administrador?",
        text: "una vez eliminado, no se podra recuperar este usuario",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          const response = crud.DELETE(`/api/admins/${idUsuario}`);
          
          if(response){
            swal("El usuario administrador ha sido borrado", {
              icon: "success",
            });
          }
          cargarAdmins();
         
        } else {
          swal("se cancelo la acción");
        }
      });
     }
  


  return (
      <>
      <Header/>
      <div className='md:flex md:min-h-screen'>
        <Menu/>
            <main className= 'flex-1'>
              <div className='mt-10 flex justify-center'>
              <h1 className="block text-center my-5 text-violet-600 uppercase text-sm">
                Listado de Usuarios Administradores
                </h1>
                </div>  
              
            <div className='p-12'>
            <table className="table table-bordered">
                <thead className='bg-white'>
                  <tr>
                    <th style={{ width: '20%' }}>Cedula</th>
                    <th style={{ width: '20%' }}>Nombre</th>
                    <th style={{ width: '20%' }}>Direccion</th>
                    <th style={{ width: '20%' }}>Telefono</th>
                    <th style={{ width: '20%' }}>Estado</th>
                  </tr>
                </thead>
        
                <tbody className="bg-white">
                  {
                    admin.map(
                    item =>
                        <tr key={item._id}>
                            <td className="text-center">{item.cedula}</td>
                            <td  className="text-center">{item.nombre}</td>
                            <td  className="text-center">{item.direccion}</td>
                            <td className="text-center" >{item.telefono}</td>
                            <td className="text-center" >{item.estado}</td>
                            <td>    
                                <Link 
                                 to={`/actualizar-admin/${item._id}`}
                                 className="bg-blue-600 w-full p-3 text-white uppercase font-bold block  text-center rounded-lg"
                                >Editar</Link>&nbsp;&nbsp;
                            </td>
                            <td>  
                                <button  
                                    onClick={()=>borrarAdmin(item._id)}
                                    className="bg-blue-600 w-full p-3 text-white uppercase font-bold block  text-center rounded-lg"
                                >Eliminar</button>
                            </td>
                        </tr>
                        )
                    }
                </tbody>
            </table>
            </div> 
            </main>
      </div>   

      </>
  );
}

export default HomeAdmin;