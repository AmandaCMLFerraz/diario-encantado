import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';

import ButtonHome from '../../components/ButtonHome';

const Header = () => {

    const navigation = useNavigation();

    const handleNavHome = () => {
        navigation.navigate("Home");
    }

    return (
        <View style={styles.container}>
            <ButtonHome 
                style={styles.button}
                title={
                    <Icon name="home" type="antdesign" size={25} color="white" />
                }
                onPress={handleNavHome}
            />
            <Image source={require("../../../assets/images/LogoRegister.png")} style={styles.logo}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#51B59F",
        backgroundColor: "#51B59F",
        width: '100%',
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-between', // Posiciona a logo à direita
        alignItems: 'center',       // Centraliza verticalmente
    },
    logo: {
        width: 130,
        height: 80,
    }
});

export default Header