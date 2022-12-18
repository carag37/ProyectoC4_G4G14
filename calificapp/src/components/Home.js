import React from 'react';
import { Link } from "react-router-dom";
import Academia from '../assets/img/Academia.png';



function Home() {
        
    return (  
        <main className ='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
            <div className ='md:w-2/3 lg:w-2/5'>
                <h1> Academia Infantil</h1>
                <img src={Academia} width="150" height="150"/>
                <Link to={"/login"}
                         className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                        >Inicio de Sesión</Link>
                
            </div>
            
            
        </main>
    );
}

export default Home;