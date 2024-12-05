import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, Alert } from "react-native";
import Header from "../../../components/Header";
import ButtonWaterGreen from "../../../components/ButtonWaterGreen";
import Input from "../../../components/Input";
import InputDescription from "../../../components/InputDescription";
import * as ImagePicker from 'expo-image-picker';
import { initializeDatabase } from '../../../database/initializeDatabase';
import { insertActivity } from '../../../database/activityTable';
import { useNavigation } from '@react-navigation/native';

const RegisterActivities = () => {
    const [student, setStudent] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const navigation = useNavigation();

    // Inicializar banco de dados e solicitar permissões
    useEffect(() => {
        const init = async () => {
            try {
                await initializeDatabase();
                await requestPermissions(); // Solicitar permissões
            } catch (error) {
                console.error('Erro ao inicializar:', error);
            }
        };
        init();
    }, []);

    // Solicitar permissões para galeria e câmera
    const requestPermissions = async () => {
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
            Alert.alert('Permissão necessária', 'Precisamos de permissões para acessar a câmera e a galeria!');
        } else {
            console.log('Permissões concedidas');
        }
    };

    // Selecionar imagem da galeria
    const handleImagePicker = async () => {
        console.log('Abrindo galeria...');
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
    
            if (!result.canceled && result.assets && result.assets.length > 0) {
                const uri = result.assets[0].uri; // Acessa a URI correta
                console.log('Imagem selecionada:', uri);
                setImageUri(uri);
            } else {
                console.log('Seleção de imagem cancelada.');
            }
        } catch (error) {
            console.error('Erro ao abrir galeria:', error);
        }
    };    

    // Tirar foto com a câmera
    const handleCamera = async () => {
        console.log('Abrindo câmera...');
        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
    
            // Verifica se a captura foi bem-sucedida e a estrutura do retorno
            if (!result.canceled && result.assets && result.assets.length > 0) {
                const uri = result.assets[0].uri; // Acessa a URI correta
                console.log('Imagem capturada:', uri);
                setImageUri(uri);
            } else {
                console.log('Captura de imagem cancelada ou sem URI.');
            }
        } catch (error) {
            console.error('Erro ao abrir câmera:', error);
        }
    };    

    // Salvar atividade no banco de dados
    const handleSaveActivity = async () => {
        if (!student || !date || !description) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        try {
            console.log("URI da imagem antes de salvar:", imageUri); // Verificar URI
            await insertActivity({ student, date, description, imageUri });
            Alert.alert('Sucesso', 'Atividade registrada com sucesso!');
            navigation.navigate('Activities'); // Redirecionar para a tela de atividades
        } catch (error) {
            console.error('Erro ao salvar atividade:', error);
            Alert.alert('Erro', 'Não foi possível registrar a atividade.');
        }
    };

    return (
        <>
            <Header />
            <View style={styles.container}>
                <Text style={styles.title}>Registro de Atividade</Text>
                <View style={styles.line} />
                <ScrollView keyboardShouldPersistTaps="handled">
                    <View style={styles.containerForm}>
                        <Text style={styles.textInput}>Nome do aluno:</Text>
                        <Input value={student} onChangeText={setStudent} />
                    </View>
                    <View style={styles.containerForm}>
                        <Text style={styles.textInput}>Data:</Text>
                        <Input value={date} onChangeText={setDate} />
                    </View>
                    <View style={styles.containerForm}>
                        <Text style={styles.textInput}>Descrição:</Text>
                        <InputDescription value={description} onChangeText={setDescription} />
                    </View>
                    <View style={styles.containerForm}>
                        <Text style={styles.textInput}>Upload de Fotos:</Text>
                        <ButtonWaterGreen title="Selecionar da Galeria" onPress={handleImagePicker} />
                        <ButtonWaterGreen title="Tirar Foto" onPress={handleCamera} />
                        {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
                    </View>
                </ScrollView>
                <ButtonWaterGreen title="Salvar" onPress={handleSaveActivity} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
    },
    title: {
        margin: 25,
        fontSize: 20,
    },
    line: {
        width: "90%",
        height: 1,
        backgroundColor: "#51B59F",
    },
    containerForm: {
        marginTop: 25,
    },
    textInput: {
        fontSize: 18,
    },
    imagePreview: {
        width: 100,
        height: 100,
        marginTop: 10,
        borderRadius: 10,
        resizeMode: 'cover',
    },
});

export default RegisterActivities;
