import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Principal
import Login from './components/Login.js';
import Admin from './components/Admin.js';
import Home from './components/Home.js';
import CrearInicio  from  './components/CrearInicio'

//Usuario

import CrearCuenta from './components/usuario/CrearCuenta.js';
import HomeUsuario from './components/usuario/HomeUsuario.js';
import MenuUsuarios from './components/usuario/MenuUsuarios.js'
import ActualizarUsuario from './components/usuario/ActualizarUsuario.js';


//Administrador
import CrearAdmin from './components/AdminUser/CrearAdmin.js';
import ActualizarAdmin from './components/AdminUser/ActualizarAdmin.js';
import ConsultarAdmin from './components/AdminUser/ConsultarAdmin.js';
import HomeAdmin from './components/AdminUser/HomeAdmin.js';
import ConsultarUSistemaA from './components/AdminUser/ConsultarUSistemaA.js';

//Acudiente
import CrearAcudiente from './components/Acudiente/CrearAcudiente.js';
import HomeAcudiente from './components/Acudiente/HomeAcudiente.js'
import ActualizarAcudiente from './components/Acudiente/ActualizarAcudiente.js'

//Alumno
import CrearAlumno from './components/Alumno/CrearAlumno.js';
import ActualizarAlumno from './components/Alumno/ActualizarAlumno.js';
import HomeAlumno from './components/Alumno/HomeAlumno.js';

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

//Docente
import MenuDocente from "./components/Docente/MenuDocente";
import CrearDocente from "./components/Docente/CrearDocente";
import VerDocente from "./components/Docente/VerDocente";
import ActualizarDocente from "./components/Docente/ActualizarDocente";
import HomeDocente from './components/Docente/HomeDocente.js';

//Paneles Usuarios
import PanelDocente from "./components/PanelDocente/PanelDocente.js";
import PanelAcudiente from "./components/PanelAcudiente/PanelAcudiente.js";


function App() {
    return (
        <Router>
            <Routes>
                
                <Route path="/" exact element= {<Home/>} />
                <Route path="/login" exact element= {<Login/>} />
                <Route path="/admin" exact element= {<Admin/>} />
                <Route path="/crear-inicio" exact element= {<CrearInicio/>} />

                <Route path="/menu-usuarios" exact element={<MenuUsuarios/>} />
                
                <Route path="/crear-cuenta" exact element={<CrearCuenta/>} />
                <Route path="/home-usuario" exact element={<HomeUsuario/>} />
                <Route path="/actualizar-usuario/:idUsuario" exact element= {<ActualizarUsuario/>} />
                <Route path="/buscar-usuario/:tipoUsuario" exact element= {<ActualizarUsuario/>} />
                <Route path="/consultar-usistemaa/:tipoUsuario" exact element= {<ConsultarUSistemaA/>} />
 
                <Route path="/crear-admin/:idUsuario" exact element= {<CrearAdmin/>} />
                <Route path="/actualizar-admin/:idAdmin" exact element= {<ActualizarAdmin/>} />
                <Route path="/consultar-admin/:usuarioSistema" exact element= {<ConsultarAdmin/>} />
                <Route path="/home-admin" exact element= {<HomeAdmin/>} />
                
                
                <Route path="/home-acudiente" exact element= {<HomeAcudiente/>} />
                <Route path="/crear-acudiente/:idUsuario" exact element={<CrearAcudiente/>} />
                <Route path="/actualizar-acudiente/:idAcudiente" exact element={<ActualizarAcudiente/>} />

                
                <Route path="/crear-alumno" exact element={<CrearAlumno/>} />
                <Route path="/home-alumno" exact element={<HomeAlumno/>} />
                <Route path="/actualizar-alumno/:idAlumno" exact element={<ActualizarAlumno/>} />
                
                <Route path="/menu-materia" exact element={<MenuMateria/>} />
                <Route path="/crear-materia" exact element={<CrearMateria/>} />
                <Route path="/ver-materia" exact element={<VerMateria/>} />
                <Route path="/actualizar-materia/:idMateria" exact element={<ActualizarMateria />} />

                <Route path="/menu-curso" exact element={<MenuCurso/>} />
                <Route path="/crear-curso" exact element={<CrearCurso/>} />
                <Route path="/ver-curso" exact element={<VerCurso/>} />
                <Route path="/actualizar-curso" exact element={<ActualizarCurso/>} />

                <Route path="/menu-boletin" exact element={<MenuBoletin/>} />
                <Route path="/crear-boletin" exact element={<CrearBoletin/>} />
                <Route path="/ver-boletin" exact element={<VerBoletin/>} />
                <Route path="/actualizar-boletin" exact element={<ActualizarBoletin/>} />

                <Route path="/menu-docente" exact element={<MenuDocente />} />
                <Route path="/crear-docente" exact element={<CrearDocente />} />
                <Route path="/ver-docente" exact element={<VerDocente />} />
                <Route path="/actualizar-docente/:idDocente" exact element={<ActualizarDocente />} />
                <Route path="/home-docente" exact element={<HomeDocente/>} />

                <Route path="/panel-docente" exact element= {<PanelDocente/>} />
                <Route path="/panel-acudiente" exact element= {<PanelAcudiente/>} />
            </Routes>
        </Router>

    );
}

export default App;