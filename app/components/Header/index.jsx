import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const Header = () => {

    return (
        <View style={styles.container}>
            <Image source={require("../../../assets/images/LogoRegister.png")} style={styles.logo}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#51B59F",
        width: '100%',
        height: 80,
    },
    logo: {
        width: 130,
        height: 80,
    },
});

export default Header