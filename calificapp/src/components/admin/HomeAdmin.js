import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate} from 'react-router-dom';
import Header from '../Header.js';
import Sidebar from '../Sidebar.js';
import crud from '../../utils/crud.js';
//import ConsultarAdmin from  './ConsultarAdmin.js'
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
        <Sidebar/>
        <div>
            <Link 
                to={`/crear-admin`}
                className="bg-blue-600 p-3  text-white uppercase font-bold   text-center rounded-lg"
                >Crear Alumno
            </Link>
        </div>
        
        <main className= 'flex-1'>
            <h1 className= 'text-4xl text-blue-600 font-bold text-center mb-9 md:mb-0'>
                Listado de Administradores
            </h1>
            <br></br>
            
            <table className="table table-bordered">
            <thead className='bg-white'>
              <tr>
                <th style={{ width: '25%' }}>Cedula</th>
                <th style={{ width: '25%' }}>Nombre</th>
                <th style={{ width: '25%' }}>Direccion</th>
                <th style={{ width: '25%' }}>Telefono</th>
                
              </tr>
            </thead>
    
            <tbody className="bg-white">
              {
                admin.map(
                item =>
                    <tr key={item._id}>
                        <td className="text-center">{item.idAdmin}</td>
                        <td  className="text-center">{item.cedula}</td>
                        <td  className="text-center">{item.nombre}</td>
                        <td  className="text-center">{item.direccion}</td>
                        <td className="text-center" >{item.telefono}</td>
                        
                        <td>    
                            <Link
                             to={`/actualizar-admin/${item._id}`}
                             className="bg-blue-600 w-full p-3 text-white uppercase font-bold block  text-center rounded-lg"
                            >Editar</Link>
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
        </main>
    </div>      
</>
   
);
}


export default HomeAdmin;