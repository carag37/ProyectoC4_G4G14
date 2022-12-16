import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Admin from './components/Admin';
import Home from './components/Home';
import CrearCuenta from "./components/CrearCuenta";
import CrearAdmin from './components/CrearAdmin';
import CrearAcudiente from './components/CrearAcudiente';
import CrearAlumno from './components/CrearAlumno';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element= {<Home/>} />
                <Route path="/login" exact element= {<Login/>} />
                <Route path="/admin" exact element= {<Admin/>} />
                <Route path="/crear-cuenta" exact element= {<CrearCuenta/>} />
                <Route path="/crear-admin" exact element= {<CrearAdmin/>} />
                <Route path="/crear-acudiente" exact element= {<CrearAcudiente/>} />
                <Route path="/crear-alumno" exact element= {<CrearAlumno/>} />
            </Routes>
        </Router>
       
    );
}

export default App;