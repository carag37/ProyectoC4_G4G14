import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login.js';
import Admin from './components/Admin.js';
import Home from './components/Home.js';

import ActualizarUsuario from './components/usuario/ActualizarUsuario.js';

import CrearCuenta from "./components/CrearCuenta.js";
import CrearInicio from "./components/CrearInicio.js";

import CrearAdmin from './components/admin/CrearAdmin.js';
import ActualizarAdmin from './components/admin/ActualizarAdmin.js';
import ConsultarAdmin from './components/admin/ConsultarAdmin.js';
import HomeAdmin from './components/admin/HomeAdmin.js';

import CrearAcudiente from './components/acudiente/CrearAcudiente.js';

import CrearAlumno from './components/CrearAlumno.js';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element= {<Home/>} />
                <Route path="/login" exact element= {<Login/>} />
                <Route path="/admin" exact element= {<Admin/>} />

                <Route path="/crear-cuenta" exact element= {<CrearCuenta/>} />
                <Route path="/crear-inicio" exact element= {<CrearInicio/>} />

                <Route path="/actualizar-usuario/:idUsuario" exact element= {<ActualizarUsuario/>} />

                <Route path="/crear-admin/:usuarioSistema" exact element= {<CrearAdmin/>} />
                <Route path="/actualizar-admin/:usuarioSistema" exact element= {<ActualizarAdmin/>} />
                <Route path="/consultar-admin/:usuarioSistema" exact element= {<ConsultarAdmin/>} />
                <Route path="/home-admin/:usuarioSistema" exact element= {<HomeAdmin/>} />
                
                <Route path="crear-acudiente" exact element= {<CrearAcudiente/>} />
                
                <Route path="/crear-alumno" exact element= {<CrearAlumno/>} />
            </Routes>
        </Router>
       
    );
}

export default App;