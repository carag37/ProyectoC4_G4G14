import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate} from 'react-router-dom';
import Header from '../Header';
import crud from '../../utils/crud.js';
import swal from 'sweetalert';
import Sidebar from '../Sidebar';


const HomeAlumno = () => {
  
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

  const [alumno, setAlumno] = useState([]);

  const cargarAlumnos = async () => {
      const response = await crud.GET(`/api/alumnos`);
      //console.log(response);
      setAlumno(response.alumno);
  }

  useEffect(() => {
      cargarAlumnos();
  }, [])

  const borrarAlumno = async (idAlumno) =>{
    swal({
      title: "Estas seguro de eliminar el alumno?",
      text: "una vez eliminado, no se podra recuperar",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        const response = crud.DELETE(`/api/alumnos/${idAlumno}`);
        
        if(response){
          swal("El alumno ha sido borrado", {
            icon: "success",
          });
        }
        cargarAlumnos();
       
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
                    to={`/crear-alumno`}
                    className="bg-blue-600 p-3  text-white uppercase font-bold   text-center rounded-lg"
                    >Crear Alumno
                </Link>
            </div>
            
            <main className= 'flex-1'>
                <h1 className= 'text-4xl text-blue-600 font-bold text-center mb-9 md:mb-0'>
                    Listado de Alumnos
                </h1>
                <br></br>
                
                <table className="table table-bordered">
                <thead className='bg-white'>
                  <tr>
                    <th style={{ width: '20%' }}>ID</th>
                    <th style={{ width: '20%' }}>Nombre</th>
                    <th style={{ width: '20%' }}>Direccion</th>
                    <th style={{ width: '20%' }}>Telefono</th>
                    <th style={{ width: '20%' }}>Edad</th>
                  </tr>
                </thead>
        
                <tbody className="bg-white">
                  {
                    alumno.map(
                    item =>
                        <tr key={item._id}>
                            <td className="text-center">{item.idAlumno}</td>
                            <td  className="text-center">{item.nombre}</td>
                            <td  className="text-center">{item.direccion}</td>
                            <td  className="text-center">{item.telefono}</td>
                            <td className="text-center" >{item.edad}</td>
                            <td>    
                                <Link
                                 to={`/crear-curso`}
                                 className="bg-blue-600 w-full p-3 text-white uppercase font-bold block  text-center rounded-lg"
                                >Asignar Curso</Link>
                            </td>
                            <td>    
                                <Link
                                 to={`/actualizar-alumno/${item._id}`}
                                 className="bg-blue-600 w-full p-3 text-white uppercase font-bold block  text-center rounded-lg"
                                >Editar</Link>
                            </td>
                            <td>  
                                <button  
                                    onClick={()=>borrarAlumno(item._id)}
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
        
export default HomeAlumno;