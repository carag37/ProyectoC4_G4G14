import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import crud from '../utilities/crud.js';


function CrearBoletin () {
    const navigate = useNavigate(); 
  
    //variables de entorno, son las que van a capturar lo que se escriba en las cajas
    const [boletin, setBoletin] = useState({
        materia:'',
        alumno:'',
        notas:'',
        observaciones:'',
    
    })

    const {materia, alumno, notas, observaciones} = boletin;

    //funcion que permite leer el evento dentro del formulario
    const onChange = (e) =>{  
    //setBoletin funcion que se pone en las variables de entorno
        setBoletin({
         ...boletin,
        [e.target.name]: e.target.value  //asigna el valor a la variable
        })
    }
 
    const crearBoletin = async() =>{
        //variables que van al back
        const data = {
            materia: boletin.materia,
            alumno: boletin.alumno,
            notas: boletin.notas,
            observaciones: boletin.observaciones
          }
          console.log(data);
          const response = await crud.POST(`/api/boletines`, data);
          const mensaje = response.msg;
          console.log(mensaje);
          if(mensaje === 'El boletin ya existe'){
            swal({
                title: 'Error',
                text: mensaje,
                icon: 'error',
                buttons:{
                  confirm:{
                    text:'OK',
                    value: true,
                    visible: true,
                    className: 'btn btn-danger',
                    closeModal: true
                  }
                }
              })
          }else{
            const mensaje = "El boletin fue creado correctamente";
          swal({
            title: 'Información',
            text: mensaje,
            icon: 'success',
            buttons:{
              confirm:{
                text:'OK',
                value: true,
                visible: true,
                className: 'btn btn-primary',
                closeModal: true
              }
            }
          });      
         }

          
          setBoletin({
            materia:'',
            alumno:'',
            notas:'',
            observaciones:'',
        
          })
          //redireccionar a la pantalla de login
          navigate("/");
        }
      
    


    const onSubmit = (e) => {
       e.preventDefault();  //no deja que la pagina se recargue
        crearBoletin();      //funcion que genera el evento del boton
      }


    return(
        <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
            <div className='md:w-2/3 lg:w-2/5'>
                <h1 className="text-black font-display text-5xl tracking-tight text-transparent">
                    Crear Boletin
                </h1>

            <form 
                onSubmit={onSubmit}
                className='my-10 bg-white shadow rounded-lg p-10'
            >
           <div className='my-5'>
                <label className='uppercase text-gray-600 block text-xl font-bold' >Materia</label>
                <input
                    type="materia"
                    id="materia"
                    name="materia"
                    placeholder='Ingrese la materia'
                    className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                    value={materia}
                    onChange={onChange}
                />
             
                <label className='uppercase text-gray-600 block text-xl font-bold' >Alumno</label>
                <input
                    type="alumno"
                    id="alumno"
                    name="alumno"
                    placeholder='Ingrese la Identificación del Alumno'
                    className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                    value={alumno}
                    onChange={onChange}
                />

                <label className='uppercase text-gray-600 block text-xl font-bold' >notas</label>
                <input
                    type="notas"
                    id="notas"   
                    name="notas"
                    placeholder='Ingrese las Notas (Separadas por coma)'
                    className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                    value={notas}
                    onChange={onChange}
                />
                <label className='uppercase text-gray-600 block text-xl font-bold' >Observaciones</label>
                <input
                    type="observaciones"
                    id="observaciones"   
                    name="observaciones"
                    placeholder='Ingrese alguna observación si lo considera necesario'
                    className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                    value={observaciones}
                    onChange={onChange}
                />
                <br></br>
                <br></br>
               
           </div>

           <input 
             type="submit"  //para crear la accion y lleve al link
             value="Crear Boletin"
             className="bg-blue-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:boletinr-pointer hover:bg-violet-400 transition-colors"
            />
            <Link 
            to={"/"}
            className="block text-center my-5 text-blue-600 uppercase text-sm"
            >Regresar</Link>
         </form>
      </div>
   </main> 
    );
}
export default CrearBoletin;