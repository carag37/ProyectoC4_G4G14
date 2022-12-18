import React from 'react'; 
import {Link} from 'react-router-dom';

const Menu = () => {
  


  return (
    <aside className='md:w-60 lg:w-70 px-5 py-10 bg-violet-200'>
        <p className= 'text-4xl text-blue-600 font-bold text-center mb-5 md:mb-0'>CalificApp</p>
        <Link to={"/crear-admin"}
            className="bg-blue-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
       >Crear Cuenta</Link>
        <Link to={"/crear-acudiente"}
            className="bg-blue-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
       >Crear Acudiente</Link>
       <Link to={"/crear-cuenta"}
            className="bg-blue-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
       >Crear Materia</Link>

    </aside>
    
    
            
         
      
    );
}

export default Menu;