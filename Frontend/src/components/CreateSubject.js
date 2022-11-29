import React from "react";
import { Link } from 'react-router-dom';

const CreateSubject = () => {
    return (
        <div>

        <h1> Crear Materia</h1>
        <h2> Ingrese información solicitada</h2>

        <input placeholder = "Nombre" />
        <input placeholder = "Horario" />
        <textarea placeholder = "Descripción" />

        <button>Crear Cuenta</button>
        <Link to={"/"}>Regresar</Link>

        </div>
    )

}

export default CreateSubject;