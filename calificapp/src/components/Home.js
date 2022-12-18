import React from 'react';
import { Link } from "react-router-dom";
import Academia from '../assets/img/Academia.png';

function Home() {
        
    return (  
        <main className="containter mx-auto mt-5 md:mt-20 p- md:flex md:justify-center">
        <div className = "md:w-2/3 lg:w-2/5 mx-auto text-center">
            <h1 className="text-5xl block font-bold  text-slate-200"> 
            CalificAPP - Academia Infantil
            <img src={Academia} alt="Academia Infantil" className="mt-10 mx-auto"/>
            </h1>

            <Link className="text-gray-300 mt-10 p-5  hover:bg-gray-500 block text-center border rounded-lg text-3xl font-bold" to={"/login"}>Ingrese al Sistema</Link>
        </div>
    </main>
    
    );
}

export default Home;