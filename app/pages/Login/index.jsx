import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
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

    const handleNavRecoverPassword = () => {
        navigation.navigate("RecoverPassword")
    }

    return (
        <View style={styles.container}>
            <Image source={require("../../../assets/images/Logo.png")} style={styles.logo}/>
            <View style={styles.containerLogin}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="#9FA3A6" keyboardType='email-address'/>
                    <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#9FA3A6"
                    secureTextEntry={true}  />
                    <Button 
                        buttonStyle={styles.button} 
                        titleStyle={styles.buttonText}
                        title="Fazer Login"
                        onPress={handleNavHome}
                    />
                    <Text style={styles.textPassword} onPress={handleNavRecoverPassword}>Esqueceu a senha?</Text>
                    <View style={styles.line} />
                    
                    <View style={styles.containerText}>
                        <Text style={styles.text}>Não tem conta?</Text>
                        <Text style={styles.textRegister} onPress={handleNavRegister}>Cadastre-se</Text>
                    </View>
                </ScrollView>
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
        justifyContent: "center", // Adicionado para centralizar verticalmente
        borderTopLeftRadius: 150,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center", // Centraliza o conteúdo verticalmente
        alignItems: "center",
        paddingBottom: 20, // Ajuste conforme necessário
    },
    input: {
        width: 300,
        height: 40,
        padding: 10,
        marginBottom: 25,
        backgroundColor: "#ffffff",
        borderRadius: 20,
        fontSize: 18,
    },
    button: {
        width: 150,
        height: 40,
        marginBottom: 25,
        backgroundColor: "#ffffff",
        borderRadius: 20,
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
        width: "90%",
        height: 1,
        backgroundColor: "#ffffff",
        margin: 25,
    },
    containerText: {
        flex: 1,
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