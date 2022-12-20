import React, { useEffect, useState }  from 'react';
import Header from '../Header.js';
import Sidebar from '../Sidebar.js';
import crud from '../../utils/crud.js';
import {Link, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert'; 

const ActualizarAlumno = () => {
    const navigate = useNavigate(); 

  const {id} = useParams();
    console.log(id);
    
    const [alumno, setAlumno] = useState({
        idAlumno:'',
        nombre:'',
        direccion:'',
        telefono:'',
        edad:'',
        
      })

      const cargarAlumno = async () =>{
        const response = await crud.GET( `/api/alumnos/${id} `);
        console.log(response.alumno);
        setAlumno(response.alumno);
     } 
      useEffect(() =>{          
         cargarAlumno();
         // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);

      
    let {idAlumno, nombre, direccion, telefono, edad } = alumno;

      const onChange = (e) =>{
        setAlumno({
          ...alumno,
          [e.target.name]: e.target.value
        })
      }

      const actualizarAlumno = async () =>{
        const data = {
            idAlumno:alumno.idAlumno,
            nombre: alumno.nombre,
            direccion: alumno.direccion,
            telefono: alumno.telefono,
            edad: alumno.edad
        }
       //console.log(data, idAlumno);
          const response = await crud.PATCH(`/api/alumnos/${idAlumno}`, data);
          console.log(response);
          const mensaje1 = "El alumno se actualizo correctamente";
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
          navigate("/home-alumno");
         
      }
    
      const onSubmit = (e) => {
        e.preventDefault();
        actualizarAlumno();
      }
      
     



    return (
        <>
            <Header className="-z-10" />
            <div className="z-0 md:flex md:min-h-screen">
                <Sidebar />
                <main className="flex-1 text-slate-200 text-3xl mt-8 p-5 w-1/3 text-center">
                    <div>

                        <h1> Actualizar Alumno</h1>
                        <h3> Ingrese información que desea actualizar</h3>

                        <form
                            className="mx-auto mt-10 bg-slate-200 shadow-cyan-300 rounded-lg py-5 w-2/5"
                            onSubmit={onSubmit}
                        >
                            <div className="mx-auto py-5 w-4/5">
                                <label className="text-2xl font-bold uppercase text-gray-600 block">ID</label>
                                <input
                                    type="number"
                                    id="id"
                                    name="id"
                                    placeholder="Ingrese Id"
                                    className="w-full text-2xl mt-3 p-4 border rounded-lg bg-gray-100 text-slate-600 "
                                    value={idAlumno}
                                    onChange={onChange}
                                />

                                <label className="text-2xl mt-5 font-bold uppercase text-gray-600 block">Nombre</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    placeholder="Digite el nombre"
                                    className="w-full text-2xl mt-3 p-4 border rounded-lg bg-gray-100 text-slate-600"
                                    value={nombre}
                                    onChange={onChange}
                                />

                                <label className="text-2xl mt-5 font-bold uppercase text-gray-600 block">Direccion</label>
                                <input
                                    type="text"
                                    id="direccion"
                                    name="direccion"
                                    placeholder="Digite la direccion"
                                    className="w-full text-2xl mt-3 p-4 border rounded-lg bg-gray-100 text-slate-600"
                                    value={direccion}
                                    onChange={onChange}
                                />

                                <label className="text-2xl mt-5 font-bold uppercase text-gray-600 block">Telefono</label>
                                <input
                                    type="number"
                                    id="telefono"
                                    name="telefono"
                                    placeholder="Digite el telefono"
                                    className="w-full text-2xl mt-3 p-4 border rounded-lg bg-gray-100 text-slate-600"
                                    value={telefono}
                                    onChange={onChange}
                                />
                                <label className="text-2xl mt-5 font-bold uppercase text-gray-600 block">Edad</label>
                                <input
                                    type="number"
                                    id="edad"
                                    name="edad"
                                    placeholder="Digite el telefono"
                                    className="w-full text-2xl mt-3 p-4 border rounded-lg bg-gray-100 text-slate-600"
                                    value={edad}
                                    onChange={onChange}
                                />

                                <input
                                    type="submit"
                                    value="Actualizar Alumno"
                                    className="bg-blue-600 mt-10 text-2xl w-4/5 p-3 border rounded-xl hover:notasr-pointer hover:bg-blue-500 text-white font-bold uppercase"
                                />

                            </div>

                            <Link className="text-gray-700 mt-5 hover:text-gray-500 block text-center text-lg font-bold uppercase" 
                                to={"/menu-alumno"}>Regresar</Link>

                        </form>

                    </div>
                </main>

            </div>

        </>

    )

}

export default ActualizarAlumno;