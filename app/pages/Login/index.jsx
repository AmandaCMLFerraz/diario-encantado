import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, Alert } from 'react-native';
import { Button } from '@rneui/themed';
import { useNavigation } from 'expo-router';

import { initializeDatabase } from '../../database/initializeDatabase';
import { getUser } from '../../database/usersTable';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

    const loginApp = async () => {
        if (!email || !password) {
            Alert.alert('Erro', 'Por favor, preencha os campos de e-mail e senha.');
            return;
        }
    
        try {
            console.log('Tentando fazer login com:', email);
            const user = await getUser(email); 
            if (user) {
                if (user.senha === password) { // Atenção: Armazenar senhas em texto simples NÃO É RECOMENDADO
                    console.log('Login bem-sucedido:', user);
                    navigation.navigate('Home');
                } else {
                    Alert.alert('Erro', 'Senha incorreta.');
                }
            } else {
                Alert.alert('Erro', 'Usuário não encontrado.');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login.');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require("../../../assets/images/Logo.png")} style={styles.logo}/>
            <View style={styles.containerLogin}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="E-mail" 
                        placeholderTextColor="#9FA3A6" 
                        keyboardType='email-address'
                        value={email}               // Vincula o valor do TextInput ao estado email
                        onChangeText={setEmail}     // Atualiza o estado email quando o usuário digita
                        autoCapitalize="none"       // Opcional: Evita capitalização automática
                        autoCorrect={false}         // Opcional: Desativa correção automática
                        />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Senha" 
                        placeholderTextColor="#9FA3A6"
                        secureTextEntry={true}  
                        value={password}            // Vincula o valor do TextInput ao estado password
                        onChangeText={setPassword}  // Atualiza o estado password quando o usuário digita
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