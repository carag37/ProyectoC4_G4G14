import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import crud from '../../utils/crud.js';
import swal from 'sweetalert';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Select from 'react-select';


function CrearAlumno() {

  const navigate = useNavigate();
  const [lista, setLista] = useState([]);
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    async function getNames() {
      const response = await crud.GET('/api/cursos/all');
      let descripcionCursos = [];
      console.log(response);

      for (let curso = 0; curso < response.length; curso++) {
        let temporal = { value: response[curso].descripcion, label: response[curso].descripcion }
        descripcionCursos.push(temporal);
      }
      console.log(lista);
      setLista(descripcionCursos);
    }
    getNames();
    // eslint-disable-next-line
  }, [])

  const handleChange = selectedOption => {
    console.log("Opciones", selectedOption)
    setDatos(selectedOption.map(option => option.value));

  };

  //variables de entorno, son las que van a capturar lo que se escriba en las cajas
  const [alumno, setAlumno] = useState({
    idAlumno: '',
    nombre: '',
    direccion: '',
    telefono: '',
    edad: '',
    curso: '',
  })

  const { idAlumno, nombre, direccion, telefono, edad } = alumno;   //revisar Curso

  //funcion que permite leer el evento dentro del formulario
  const onChange = (e) => {
    //setUsuario funcion que se pone en las variables de entorno
    setAlumno({
      ...alumno,
      [e.target.name]: e.target.value  //asigna el valor a la variable
    })
  }

  const crearAlumno = async () => {
    const data = {
      idAlumno: alumno.idAlumno,
      nombre: alumno.nombre,
      direccion: alumno.direccion,
      telefono: alumno.telefono,
      edad: alumno.edad,
      curso: datos[0]
    }
    console.log(data);
    const response = await crud.POST(`/api/alumnos`, data);
    const mensaje = response.msg;
    console.log(mensaje);
    if (mensaje === "El alumno ya existe") {
      const mensaje = "El alumno ya existe";
      swal({
        title: 'Error',
        text: mensaje,
        icon: 'error',
        buttons: {
          confirm: {
            text: 'OK',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        }
      })

    } else {
      const mensaje = "El alumno fue creado correctamente";
      swal({
        title: 'Información',
        text: mensaje,
        icon: 'success',
        buttons: {
          confirm: {
            text: 'OK',
            value: true,
            visible: true,
            className: 'btn btn-primary',
            closeModal: true
          }
        }
      });
    }
    setAlumno({
      idAlumno: '',
      nombre: '',
      direccion: '',
      edad: '',
      curso: '',

    })
    //redireccionar a la pantalla de login
    navigate("/home-alumno");

  }


  const onSubmit = (e) => {
    e.preventDefault();  //no deja que la pagina se recargue
    crearAlumno();      //funcion que genera el evento del boton
  }


  return (
    <>
      <Header className="-z-10" />
      <div className="z-0 md:flex md:min-h-screen">
        <Sidebar />
        <main className="flex-1 text-slate-600 text-3xl mt-8 p-5 w-1/3 text-center">

          <div className='mt-10 flex justify-center'>
            <h1 className='text-4xl text-slate-200 font-bold text-center md:mb-0'>
              Crear Cuenta
            </h1>
          </div>

          <div className='mt-5 flex justify-center' >
            <form
              className="mx-auto mt-5 bg-slate-200 shadow-cyan-300 rounded-lg py-5 w-2/5"
              onSubmit={onSubmit}
            >
              <div className="mx-auto w-4/5">
                <label className='uppercase text-gray-600 block text-xl font-bold'>ID</label>
                <input
                  type="number"
                  id="idAlumno"
                  name="idAlumno"
                  placeholder='Digite el ID del Alumno'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                  value={idAlumno}
                  onChange={onChange}
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
                  placeholder='Digite el nombre'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                  value={telefono}
                  onChange={onChange}
                />
                <label className='uppercase text-gray-600 block text-xl font-bold'>Edad</label>
                <input
                  type="number"
                  id="edad"
                  name="edad"
                  placeholder='Digite la edad'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                  value={edad}
                  onChange={onChange}
                />
                <label className="text-2xl mt-5 font-bold uppercase text-slate-600 block">Cursos</label>
                <Select
                  isMulti
                  name="cursos"
                  options={lista}
                  className="basic-multi-select text-slate-600 block"
                  classNamePrefix="select"
                  onChange={handleChange}
                />
                <input
                  type="submit"
                  value="Crear Alumno"
                  className="bg-blue-600 mt-10 text-2xl w-4/5 p-3 border rounded-xl hover:cursor-pointer hover:bg-blue-500 text-white font-bold uppercase"
                />

                <Link
                  to={"/home-alumno"}
                  className="text-gray-700 mt-5 hover:text-gray-500 block text-center text-lg font-bold uppercase" 
                >Regresar
                </Link>
              </div>
            </form>

          </div>


        </main>
      </div>
    </>
  );
}

export default CrearAlumno;