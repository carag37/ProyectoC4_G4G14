import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import CrearCuenta from "./components/CrearCuenta";
import CrearBoletin from "./components/CrearBoletin";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element= {<Login/>} />
                <Route path="/crear-cuenta" exact element= {<CrearCuenta/>} />
                <Route path="/crear-boletin" exact element= {<CrearBoletin/>} />
            </Routes>
        </Router>
       
    );
}

export default App;