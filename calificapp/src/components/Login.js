import React from 'react';
import Boton from './forms/Boton';
import Input from './forms/Input';
import Flex from './utils/Flex';
import Gap from './utils/Gap';
//import { link } from 'react-router-dom';


function Login() {
    return (  
        <Flex padding="2rem" borderRadius="1rem">
            <h1>Mis primeros pasos</h1>
            <Gap direction="vertical">1rem</Gap>
            <Input>Email</Input>
            <Gap direction="vertical">0.5rem</Gap>
            <Input type="password">Password</Input>
            <Gap direction="vertical">3rem</Gap>
            <Boton>Login</Boton>
            <br>
            </br>
            <br></br>
            <boton>Crear Cuenta</boton>
            
        </Flex>
    );
}

export default Login;