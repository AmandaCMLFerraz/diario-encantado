import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import Schools from '../pages/Schools/index'
import RecoverPassword from '../pages/RecoverPassword'
import RegisterSchool from '../pages/Schools/RegisterSchool'
import Students from '../pages/Students'
import RegisterStudent from '../pages/Students/RegisterStudent'
import Classes from '../pages/Classes'
import RegisterClasses from '../pages/Classes/RegisterClasses'
import Registrations from '../pages/Registrations';
import Activities from '../pages/Activities'
import RegisterActivities from '../pages/Activities/RegisterActivities';
import EditClasses from '../pages/Classes/EditClasses';
import EditSchool from '../pages/Schools/EditSchool';
import Portfolio from  '../pages/Portfolio';




const Stack = createNativeStackNavigator();

export default function Routes () {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Portfolio" component={Portfolio} />
            <Stack.Screen name="Schools" component={Schools} />
            <Stack.Screen name="RegisterSchool" component={RegisterSchool} />
            <Stack.Screen name="EditSchool" component={EditSchool} /> 
            <Stack.Screen name="Students" component={Students} />
            <Stack.Screen name="RegisterStudent" component={RegisterStudent} />
            <Stack.Screen name="Classes" component={Classes} />
            <Stack.Screen name="RegisterClasses" component={RegisterClasses} />
            <Stack.Screen name="EditClasses" component={EditClasses} />
            <Stack.Screen name="Activities" component={Activities} />
            <Stack.Screen name="RegisterActivities" component={RegisterActivities} />
            <Stack.Screen name="Registrations" component={Registrations} />
        </Stack.Navigator>
    );
}
