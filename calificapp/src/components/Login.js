import React from 'react';
import { Link } from "react-router-dom";


function Login() {
    return (  
        <main className ='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
            <div className ='md:w-2/3 lg:w-2/5'>
                <h1> Inicio Sesion</h1>
                <form className='my-10 bg-white shadow-orange-500 rounded-lg p-10' >
                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Email</label>
                        <input
                            type="email"
                            placeholder='Email del usuario'
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                        />
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Password</label>
                        <input
                            type="password"
                            placeholder='Password'
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                        />
                        <input 
                            type="submit"
                            value="Iniciar Sesión"
                            className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-400 transition-colors"
                        />

                        <Link to={"/crear-cuenta"}
                         className="block text-center my-5 text-violet-600 uppercase text-sm"
                        >Crear Cuenta</Link>
                        <Link to={"/cambiar-clave"}
                         className="block text-center my-5 text-violet-600 uppercase text-sm"
                        >Cambiar Contraseña</Link>

                    </div>
                </form>
            
            </div>
            
            
        </main>
    );
}

export default Login;