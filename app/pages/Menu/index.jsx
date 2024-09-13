import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../Home/index'

const Drawer = createDrawerNavigator();

const Menu = () => {
    return (
        <Drawer.Navigator initialRouteName='Home'
            drawerStyle={{
                backgroundColor: "#000000",
                paddingVertical: 20
            }}>
            <Drawer.Screen name='Home' component={Home}/>
        </Drawer.Navigator>
    )
}

export default Menu