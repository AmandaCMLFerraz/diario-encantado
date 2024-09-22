import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from 'expo-router';

import Input from '../../components/Input'
import ButtonWaterGreen from '../../components/ButtonWaterGreen'
import { insertUser} from '../../database/usersTable';
import { initializeDatabase } from '../../database/initializeDatabase';

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigation = useNavigation();

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

    const saveUser = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não são compatíveis.');
            return;
        }
        
        const trimmedName = name.trim();
        const trimmedEmail = email.trim().toLowerCase(); 
        const trimmedTelephone = telephone.trim();
        const trimmedPassword = password.trim();
    
        try {
            console.log('Salvando usuário com os seguintes dados:', {
                nome: trimmedName,
                email: trimmedEmail,
                telefone: trimmedTelephone,
                senha: trimmedPassword,
            });
            const result = await insertUser(trimmedName, trimmedEmail, trimmedTelephone, trimmedPassword);
            console.log('Usuário salvo com sucesso:', { nome: trimmedName, email: trimmedEmail, telefone: trimmedTelephone });
            navigation.navigate('Login');
        } catch (error) {
            console.error('Erro ao salvar usuário', error);
            Alert.alert('Erro', 'Ocorreu um erro ao registrar o usuário.');
        }
    };

    const handleNavLogin = () => {
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container}>
            <Image source={require("../../../assets/images/LogoRegister.png")} style={styles.logo}/>
            <ScrollView>
                <View style={styles.containerForm}>
                    <Text style={styles.textInput}>Nome completo:</Text>
                    <Input 
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                <View style={styles.containerForm}>
                    <Text style={styles.textInput}>E-mail:</Text>
                    <Input keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.containerForm}>
                    <Text style={styles.textInput}>Telefone:</Text>
                    <Input keyboardType="tel"
                        value={telephone}
                        onChangeText={setTelephone}
                    />
                </View>
                <View style={styles.containerForm}>
                    <Text style={styles.textInput}>Senha:</Text>
                    <Input 
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <View style={styles.containerForm}>
                    <Text style={styles.textInput}>Confirmar senha:</Text>
                    <Input 
                        secureTextEntry={true}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                </View>
            </ScrollView>
            <ButtonWaterGreen 
                title="Registrar-se"
                onPress={saveUser}
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
    logo: {
        height: 160,
        width: "100%",
        borderBottomRightRadius: 150,
    },
    containerForm: {
        marginTop: 25,
    },
    textInput: {
        fontSize: 18,
        marginLeft: 20,
    },
    line: {
        width: "90%",
        height: 1,
        backgroundColor: "#51B59F",
        marginBottom: 25,
    },
    containerText: {
        alignItems: "center",
        marginBottom: 25,
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