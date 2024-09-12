import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from 'expo-router';

import Input from '../../components/Input'
import ButtonWaterGreen from '../../components/Button'

const Register = () => {

    const navigation = useNavigation();

    const handleNavLogin = () => {
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container}>
            <Image source={require("../../../assets/images/LogoRegister.png")} style={styles.logo}/>
            <View style={styles.containerForm}>
                <Text style={styles.textInput}>Nome completo:</Text>
                <Input />
            </View>
            <View style={styles.containerForm}>
                <Text style={styles.textInput}>E-mail:</Text>
                <Input keyboardType="email-address" />
            </View>
            <View style={styles.containerForm}>
                <Text style={styles.textInput}>Telefone:</Text>
                <Input keyboardType="tel"/>
            </View>
            <View style={styles.containerForm}>
                <Text style={styles.textInput}>Senha:</Text>
                <Input secureTextEntry={true}/>
            </View>
            <View style={styles.containerForm}>
                <Text style={styles.textInput}>Confirmar senha:</Text>
                <Input secureTextEntry={true}/>
            </View>
            <ButtonWaterGreen 
                title="Registrar-se"
            />

            <View style={styles.line} />

            <View style={styles.containerText}>
                <Text style={styles.text}>Já tem conta?</Text>
                <Text style={styles.textLogin} onPress={() => {handleNavLogin()}}>Faça Login</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
    },
    containerForm: {
        marginTop: 25,
    },
    logo: {
        height: 160,
        width: "100%",
        borderBottomRightRadius: "150%",
    },
    textInput: {
        fontSize: 18,
        marginLeft: 20,
    },
    line: {
        width: "80%",
        height: 1,
        backgroundColor: "#51B59F",
        margin: 25,
    },
    containerText: {
        alignItems: "center",
    },
    text: {
        marginBottom: 5,
        fontSize: 18,
        color: "#3F3F3C",
    },
    textLogin:{
        fontSize: 18,
        color: "#3F3F3C",
        fontWeight: "600",
    }
});

export default Register