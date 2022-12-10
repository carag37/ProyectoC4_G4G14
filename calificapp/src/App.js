import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import CrearCuenta from "./components/CrearCuenta";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element= {<Login/>} />
                <Route path="/crear-cuenta" exact element= {<CrearCuenta/>} />
            </Routes>
        </Router>
       
    );
}

export default App;