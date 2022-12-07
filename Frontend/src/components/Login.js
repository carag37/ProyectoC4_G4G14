import React from "react";
import { Link } from "react-router-dom";

const Login = () => {

    return (
        <div>
            <h1> G12</h1>
            <h1> Iniciar Sesión</h1>
            <h2> Ingrese Credenciales</h2>
            <input placeholder = "Email" />
            <input type = "password" placeholder = "Contraseña" />
            <button>Ingresar</button>
            <Link to={"/crear-materia"}>Crear Materia</Link>
        </div>
    )

}

export default Login;