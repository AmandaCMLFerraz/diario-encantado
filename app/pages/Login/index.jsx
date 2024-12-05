import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, Alert } from 'react-native';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

import { initializeDatabase } from '../../database/initializeDatabase';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const handleNavRegister = () => {
        console.log("Navegando para a tela de Registro");
        navigation.navigate("Register");
    };

    const handleNavHome = () => {
        navigation.navigate("Home");
    };

    const handleNavRecoverPassword = () => {
        navigation.navigate("RecoverPassword")
    };

    useEffect(() => {
        const init = async () => {
            try {
                await initializeDatabase();
                console.log('Database initialized successfully');
            } catch (error) {
                console.error('Failed to initialize database:', error);
            }
        };
        init();
    }, []);

    // Usuário e senha pré-definidos
    const predefinedUser = {
        email: "a@a.com",
        password: "qwe"
    };

    const loginApp = async () => {
        if (!email || !password) {
            Alert.alert('Erro', 'Por favor, preencha os campos de e-mail e senha.');
            return;
        }

        // Simulação de login com o usuário pré-definido
        if (email === predefinedUser.email && password === predefinedUser.password) {
            console.log('Login bem-sucedido');
            navigation.navigate('Home');
        } else {
            Alert.alert('Erro', 'Usuário ou senha incorretos.');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require("../../../assets/images/Logo.png")} style={styles.logo} />
            <View style={styles.containerLogin}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="E-mail" 
                        placeholderTextColor="#9FA3A6" 
                        keyboardType='email-address'
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Senha" 
                        placeholderTextColor="#9FA3A6"
                        secureTextEntry={true}  
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Button 
                        buttonStyle={styles.button} 
                        titleStyle={styles.buttonText}
                        title="Fazer Login"
                        onPress={loginApp}
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
        justifyContent: "center",
        borderTopLeftRadius: 150,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 20,
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
    textRegister: {
        fontSize: 18,
        color: "#ffffff",
        fontWeight: "600",
    }
});

export default Login;
