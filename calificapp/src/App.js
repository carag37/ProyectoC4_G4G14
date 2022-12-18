import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Principal
import Login from './components/Login.js';
import Admin from './components/Admin.js';
import Home from './components/Home.js';
import CrearInicio  from  './components/CrearInicio'

//Usuario
import CrearCuentaIn from "./components/usuario/CrearCuentaIn";
import HomeUsuario from "./components/usuario/HomeUsuario.js";
import MenuUsuarios from './components/usuario/MenuUsuarios.js'
import ActualizarUsuario from './components/usuario/ActualizarUsuario.js';

//Administrador
import CrearAdmin from './components/Admin/CrearAdmin.js';
import ActualizarAdmin from './components/Admin/ActualizarAdmin.js';
import ConsultarAdmin from './components/Admin/ConsultarAdmin.js';
import HomeAdmin from './components/Admin/HomeAdmin.js';

//Acudiente
import CrearAcudiente from './components/Acudiente/CrearAcudiente.js';
import HomeAcudiente from './components/Acudiente/HomeAcudiente.js'

//Alumno
import CrearAlumno from './components/Alumno/CrearAlumno.js';

//Materia
import MenuMateria from "./components/Materia/MenuMateria";
import CrearMateria from "./components/Materia/CrearMateria";
import VerMateria from "./components/Materia/VerMateria";
import ActualizarMateria from "./components/Materia/ActualizarMateria";

//Curso
import MenuCurso from "./components/Curso/MenuCurso";
import CrearCurso from "./components/Curso/CrearCurso";
import VerCurso from "./components/Curso/VerCurso";
import ActualizarCurso from "./components/Curso/ActualizarCurso";

//Boletin
import MenuBoletin from "./components/Boletin/MenuBoletin";
import CrearBoletin from "./components/Boletin/CrearBoletin";
import VerBoletin from "./components/Boletin/VerBoletin";
import ActualizarBoletin from "./components/Boletin/ActualizarBoletin";

function App() {
    return (
        <Router>
            <Routes>
                
                <Route path="/" exact element= {<Home/>} />
                <Route path="/login" exact element= {<Login/>} />
                <Route path="/admin" exact element= {<Admin/>} />
                <Route path="/crear-inicio" exact element= {<CrearInicio/>} />

                <Route path="/menu-usuarios" exact element={<MenuUsuarios/>} />
                <Route path="/crear-cuentaIn" exact element={<CrearCuentaIn/>} />
                <Route path="/home-usuarios" exact element={<HomeUsuario/>} />
                <Route path="/actualizar-usuario/:idUsuario" exact element= {<ActualizarUsuario/>} />
                <Route path="/actualizar-usuario/:tipoUsuario" exact element= {<ActualizarUsuario/>} />

                <Route path="/crear-admin" exact element={<CrearAdmin />} />   
                <Route path="/crear-admin/:usuarioSistema" exact element= {<CrearAdmin/>} />
                <Route path="/actualizar-admin/:usuarioSistema" exact element= {<ActualizarAdmin/>} />
                <Route path="/consultar-admin/:usuarioSistema" exact element= {<ConsultarAdmin/>} />
                <Route path="/home-admin" exact element= {<HomeAdmin/>} />
                
                
                <Route path="/home-acudiente/:usuarioSistema" exact element= {<HomeAcudiente/>} />
                <Route path="/crear-acudiente" exact element={<CrearAcudiente />} />

                
                <Route path="/crear-alumno" exact element={<CrearAlumno />} />
                
                <Route path="/menu-materia" exact element={<MenuMateria />} />
                <Route path="/crear-materia" exact element={<CrearMateria />} />
                <Route path="/ver-materia" exact element={<VerMateria />} />
                <Route path="/actualizar-materia" exact element={<ActualizarMateria />} />

                <Route path="/menu-curso" exact element={<MenuCurso />} />
                <Route path="/crear-curso" exact element={<CrearCurso />} />
                <Route path="/ver-curso" exact element={<VerCurso />} />
                <Route path="/actualizar-curso" exact element={<ActualizarCurso />} />

                <Route path="/menu-boletin" exact element={<MenuBoletin />} />
                <Route path="/crear-boletin" exact element={<CrearBoletin />} />
                <Route path="/ver-boletin" exact element={<VerBoletin />} />
                <Route path="/actualizar-boletin" exact element={<ActualizarBoletin />} />
            </Routes>
        </Router>

    );
}

export default App;