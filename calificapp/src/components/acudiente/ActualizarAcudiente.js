import React, { useState }  from 'react';
import Header from './Header';
import Sidebar from './Sidebar'; 
import crud from '../conexiones/crud';
import { Link, useNavigate } from 'react-router-dom';

const ActualizarAcudiente = () => {
  const navigate = useNavigate(); 
    
  const {idAcudiente} = useParams();
  console.log(idAcudiente);

    const [acudiente, setAcudiente] = useState({
        cedula:'',
        nombre: '',
        direccion: '',
        telefono: '',
        //alumno:'' ,
        parentesco: '',
      })
      
      const cargarAcudiente = async () =>{
        const response = await crud.GET(`/api/acudientes/${idAcudiente}`);
       // console.log(response);
        setCategoria(response.acudiente;
      }
      useEffect(() =>{ 
        cargarCategoria();
      },[]);

    let { cedula, nombre, direccion, telefono, parentesco } = acudiente;

      const onChange = (e) =>{
        setAcudiente({
          ...acudiente,
          [e.target.name]: e.target.value
        })
      }

      const actualizarAcudiente = async () =>{
        const data = {
            cedula: acudiente.cedula,
            nombre: acudiente.nombre,
            direccion: acudiente.direccion,
            telefono: acudiente.telefono,
            //alumno:'' ,
            parentesco: acudiente.parentesco
        }
        const response = await crud.PATCH(`/api/acudiente/${idAcudiente}`, data);
        console.log(response);
        const mensaje1 = "El acudiente se actualizo correctamente";
        swal({
          title:'Información',
          text: mensaje1,
          icon: 'success',
          buttons:{
            confirm:{
              text: 'OK',
              value: true,
              visible: true,
              className: 'btn btn-primary',
              closeModal: true
            }
          }
        });
        navigate("/home-acudiente");
       
    }
  
    const onSubmit = (e) => {
      e.preventDefault();
      actualizarAcudiente();
    }
    
   
  return (
    <>
      <Header/>
      <div className='md:flex md:min-h-screen'>
        <Sidebar/>
        <main className='flex-1'>
        <div className='mt-10 flex justify-center'>
        <h1 className="inline bg-gradient-to-r from-indigo-200 via-violet-700 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
              Actualizar Acudiente
            </h1>
        </div>
        
        <div className='mt-10 flex justify-center' >
        <form 
                    className='my-10 bg-white shadow-orange-500 rounded-lg p-10' 
                    onSubmit={onSubmit}
                >
                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Cédula</label>
                        <input
                            type="number"
                            id="cedula"
                            name="cedula"
                            placeholder='Digite la Cedula'
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            value={cedula}
                            //onChange={onChange}
                        />
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder='Digite el nombre'
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            value={nombre}
                            onChange={onChange}
                        />
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Dirección</label>
                        <input
                            type="text"
                            id="direccion"
                            name="direccion"
                            placeholder='Digite la dirección'
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            value={direccion}
                            onChange={onChange}
                        />
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Teléfono</label>
                        <input
                            type="number"
                            id="telefono"
                            name="telefono"
                            placeholder='Digite el teléfono'
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            value={telefono}
                            onChange={onChange}
                        />
                        
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Parentesco</label>
                        <input
                            type="text"
                            id="parentesco"
                            name="parentesco"
                            placeholder='Digite el parentesco'
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            value={parentesco}
                            onChange={onChange}
                        />

                        <input 
                            type="submit"
                            value="Crear Acudiente"
                            className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-400 transition-colors"
                        />

                        <Link to={"/home-admin"}
                           className="block text-center my-5 text-violet-600 uppercase text-sm"
                        >Regresar</Link>
                    </div>
            </form>
        </div >
       

        </main>
      </div>
      
      
    
      
      
      </>
    );
}

export default ActualizarAcudiente;