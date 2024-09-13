import React from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { Button } from '@rneui/themed';
import { useNavigation } from 'expo-router';

const Login = () => {

    const navigation = useNavigation();

    const handleNavRegister = () => {
        navigation.navigate("Register");
    };

    const handleNavHome = () => {
        navigation.navigate("Home");
    };

    const handleNavRecuperacao = () => {
        navigation.navigate("RecuperacaoSenha")
    }

    return (
        <View style={styles.container}>
            <Image source={require("../../../assets/images/Logo.png")} style={styles.logo}/>
            <View style={styles.containerLogin}>
                <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="#9FA3A6" keyboardType='email-address'/>
                <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#9FA3A6"
                secureTextEntry={true}  />
                <Button 
                    buttonStyle={styles.button} 
                    titleStyle={styles.buttonText}
                    title="Fazer Login"
                    onPress={handleNavHome}
                />
                <Text style={styles.textPassword} onPress={handleNavRecuperacao}>Esqueceu a senha?</Text>
                <View style={styles.line} />
                
                <View style={styles.containerText}>
                    <Text style={styles.text}>Não tem conta?</Text>
                    <Text style={styles.textRegister} onPress={handleNavRegister}>Cadastre-se</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
    },
    logo: {
        width: 400,
        height: 300,
    },
    containerLogin: {
        flex: 1,
        height: 500,
        margin: 0,
        paddingTop: 80,
        backgroundColor: "#51B59F",
        width: "100%",
        alignItems: "center",
        borderTopLeftRadius: "150%",
    },
    input: {
        width: 250,
        height: 40,
        padding: 10,
        marginBottom: 25,
        backgroundColor: "#ffffff",
        borderRadius: "50%",
        fontSize: 18,
    },
    button: {
        width: 150,
        height: 40,
        marginBottom: 25,
        backgroundColor: "#ffffff",
        borderRadius: "50%",
    },
    buttonText: {
        fontWeight: "600",
        fontSize: 18,
        color: "#3F3F3C",
    },
    textPassword: {
        fontSize: 18,
        color: "#ffffff",
    },
    line: {
        width: "80%",
        height: 1,
        backgroundColor: "#ffffff",
        margin: 25,
    },
    containerText: {
        alignItems: "center",
    },
    text: {
        marginBottom: 5,
        fontSize: 18,
        color: "#ffffff",
    },
    textRegister:{
        fontSize: 18,
        color: "#ffffff",
        fontWeight: "600",
    }
});

export default Login