import React from 'react';

function CrearCuenta () {
    return(
        <div>
            <h1> Inicio Sesion</h1>
            <h2> Ingrese sus crendenciales </h2>
            <input placeholder="Nombre"/>
            <input placeholder="Email"/>
            <input placeholder="Password"/>
            <input placeholder="Administrador, Docente, Acudiente"/>
            <button>Ingresar</button>
            <button>Crear Cuenta</button>

        </div>
    );
}
export default CrearCuenta;