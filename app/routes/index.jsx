import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import Schools from '../pages/Schools/index'
import PasswordRecovery from '../pages/PasswordRecovery'
import SchoolRegistration from '../pages/Schools/SchoolRegistration'

const Stack = createNativeStackNavigator();

export default function Routes () {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Schools" component={Schools} />
            <Stack.Screen name="PasswordRecovery" component={PasswordRecovery} />
            <Stack.Screen name="SchoolRegistration" component={SchoolRegistration} />
        </Stack.Navigator>
    );
}