import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import Escolas from '../pages/Escolas/index'
import RecuperacaoSenha from '../pages/RecuperacaoSenha'
import CadastroEscola from '../pages/Escolas/CadastroEscola'

const Stack = createNativeStackNavigator();

export default function Routes () {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Escolas" component={Escolas} />
            <Stack.Screen name="RecuperacaoSenha" component={RecuperacaoSenha} />
            <Stack.Screen name="CadastroEscola" component={CadastroEscola} />
        </Stack.Navigator>
    );
}