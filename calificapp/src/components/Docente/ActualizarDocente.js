import React, { useEffect, useState }  from 'react';
import Header from '../Header.js';
import Sidebar from '../Sidebar.js';
import crud from '../../utils/crud.js';
import { useNavigate, useParams,Link } from 'react-router-dom';
import swal from 'sweetalert'; 
import Select from 'react-select';

const ActualizarDocente = () => {

  let navigate = useNavigate(); 

  useEffect(() => {
    const autenticarUsuario = async () => {

        const token = localStorage.getItem("token")
        //console.log(token)
        if (!token) {
            navigate("/login");
        }
    }
    autenticarUsuario()

}, [navigate]);

  const {idDocente} = useParams();
     

      const cargarDocente = async () =>{
        const response = await crud.GET(`/api/docentes/one/${idDocente}`);        
        setDocente(response.docente);
      }
     
  useEffect(() => {
        cargarDocente();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    const [docente, setDocente] = useState({
      nombre: '',
      direccion: '',
      telefono: 57,
      materias: [],
      })
      const [lista, setLista]=useState([]);
      const [datos, setDatos]=useState([]);
  
      useEffect( () =>{
          async function getNames(){
          const response =  await crud.GET('/api/materias/all');
          let nombreMaterias = [];
          console.log(response);
                 
          for (let materia = 0; materia < response.length; materia++) {
              let temporal={value:response[materia].nombre, label:response[materia].nombre}
              nombreMaterias.push(temporal); 
         }
          console.log(lista);
          setLista(nombreMaterias);
      }
      getNames(); 
      // eslint-disable-next-line
      },[])
      
      const handleChange = selectedOption => {
          
          setDatos(selectedOption.map(option => option.value));
          console.log("Seleccionadas",selectedOption)  
        };
    
       
    const { nombre, direccion, telefono } = docente;
    let tempo = docente.materias;

    console.log("materias:",tempo)
    
    let anterioresMaterias = [];
    for (let i = 0; i < tempo.length; i++) {
      let temporal={value:tempo[i], label:tempo[i]}
      anterioresMaterias.push(temporal); 
      }
      
      const onChange = (e) =>{
        setDocente({
          ...docente,
          [e.target.name]: e.target.value
        })
      }

      
      const actualizarDocente = async () =>{
        const data = {
          nombre: docente.nombre,
          direccion: docente.direccion,        
          telefono: docente.telefono,
          materias: datos,                 
        }
        console.log("Pruebas",data);
       //console.log(data, idocente);
          const response = await crud.PATCH(`/api/docentes/one/${idDocente}`, data);
          console.log(response);
          const mensaje1 = "El docente se actualizó correctamente";
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
            
          })
          
          setDocente({
            nombre:'',
            direccion:'',
            telefono: 57,
            materias:[],
            usuarioSistema:'',
            estado:true
        
          })   
          navigate("/ver-docente")
      }
    
      const onSubmit = (e) => {
        e.preventDefault();
        actualizarDocente();
      }
      
      console.log("Actualizar:", anterioresMaterias);

      
  return (
    <>
      <Header/>
        <div className='md:flex md:min-h-screen'>
            <Sidebar/>
                <main className='flex-1'>
                    <div className='mt-10 flex justify-center'>
                    <h1 className= 'text-4xl text-blue-600 font-bold text-center mb-5 md:mb-0'>
                        Actualizar Docente
                    </h1>
        </div>
        
        <div className='mt-10 flex justify-center'>
        <form 
              className='my-10 bg-white shadow rounded-lg p-10 '
              onSubmit={onSubmit}
        >
        <div className='my-5'>
                
              <label className='uppercase text-gray-600 block text-xl font-bold' >Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder='Nombre'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                  value={nombre}
                  onChange={onChange}
                />

                <label className='text-2xl font-bold uppercase text-gray-600 block' >Direccion</label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  placeholder='direccion'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                 value={direccion}
                  onChange={onChange}
                />

              <label className='text-2xl font-bold uppercase text-gray-600 block' >Telefono</label>
                <input
                  type="number"
                  id="telefono"
                  name="telefono"
                  placeholder='Digite el número de teléfono'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                  value={telefono}
                  onChange={onChange}
                />
              
              <label className='text-2xl font-bold uppercase text-gray-600 block' >Materias</label>
              <Select
                defaultValue={tempo[0]}
                isMulti
                name="materias"
                options={lista}
                className="basic-multi-select text-slate-600"
                classNamePrefix="select"
                onChange={handleChange}
                 />
              <input 
                type="submit"
                value="Actualizar docente"
                className="bg-blue-600 mt-10 text-2xl w-5/5 p-3 border rounded-xl hover:cursor-pointer hover:bg-blue-500 text-white font-bold uppercase"
                />
            </div >
            <Link className="text-gray-700 mt-5 hover:text-gray-500 block text-center text-lg font-bold uppercase" to={"/menu-docente"}>Regresar</Link>
            </form>
        </div >

        </main>
    </div>
      
    </>
    );
}

export default ActualizarDocente;