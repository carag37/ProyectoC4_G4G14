import React from 'react'

export const ConsultarAdmin = ({admin}) => {

    const {cedula,nombre, direccion, telefono} = admin;
    return(
        <div
            className='border-r p-5 flex justify-between items-center'
        >
            <div className='flex flex-col items-start'>
                <p className='mb-1 text-xl text-gray-50'>cedula:{cedula}</p>
                <p className='mb-1 text-xl text-gray-50'>nombre:{nombre}</p>
                <p className='mb-1 text-xl text-gray-50'>direccion:{direccion}</p>
                <p className='mb-1 text-xl text-gray-50 uppercase'>telefono:{telefono}</p>
                
            </div>

            <div className='flex flex-col lg:flex-row gap-2'>
            <button
                          className="bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                          //onClick={() => handleModalEditarTarea(tarea)}
                      >Editar</button>
                <button
                          className="bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                         // onClick={() => handleModalEliminarTarea(tarea)}
                      >Eliminar</button>
            </div>
        
        </div>
    )
}

export default ConsultarAdmin