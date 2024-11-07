import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Button } from "react-native";
import Input from "../../../components/Input";
import RNPickerSelect from 'react-native-picker-select';
import Header from '../../../components/Header';
import InputDescription from '../../../components/InputDescription';
import { initializeDatabase } from '../../../database/initializeDatabase';
import { getSchools } from '../../../database/schoolTable';
import { getClasse } from '../../../database/classesTable';
import { getStudent } from '../../../database/studentTable';
import * as ImagePicker from 'expo-image-picker';


const RegisterActivities = () => {

    const [student, setStudent] = useState('');
    const [school, setSchool] = useState('');
    const [classe, setClasse] = useState('');
    const [schools, setSchools] = useState([]);
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);
    const [imageUri, setImageUri] = useState(null); // Estado para armazenar a URI da imagem

    const loadStudents = async () => {
        try {
            const result = await getStudent();
            console.log("Resultado da função getSchools:", result); // Verifique o que está sendo retornado
            const formattedStudents = result.map(student => ({
                label: student.nome, // Confirme se 'name' existe
                value: student.id,   // Confirme se 'id' existe
            }));
            setStudents(formattedStudents);
        } catch (error) {
            console.error('Erro ao buscar estudantes:', error);
        }
    };

    const loadSchools = async () => {
        try {
            const result = await getSchools();
            console.log("Resultado da função getSchools:", result); // Verifique o que está sendo retornado
            const formattedSchools = result.map(school => ({
                label: school.nome, // Confirme se 'name' existe
                value: school.id,   // Confirme se 'id' existe
            }));
            setSchools(formattedSchools);
        } catch (error) {
            console.error('Erro ao buscar escolas:', error);
        }
    };

    const loadClasses = async () => {
        try {
            const result = await getClasse();
            console.log("Resultado da função getClasse:", result); // Verifique o que está sendo retornado
            const formattedClasses = result.map(classeItem => ({
                label: classeItem.turma, // Correção: Usar 'classeItem.turma'
                value: classeItem.id,    // Correção: Usar 'classeItem.id'
            }));
            setClasses(formattedClasses); // Correção: Usar 'setClassesList'            
        } catch (error) {
            console.error('Erro ao buscar turmas:', error);
        }
    };

    useEffect(() => {
        const init = async () => {
            try {
                await initializeDatabase();
                console.log('Database initialized successfully');
                await loadStudents();
                await loadSchools(); // Carrega as escolas após a inicialização do banco
                await loadClasses();
            } catch (error) {
                console.error('Failed to initialize database:', error);
            }
        };
        init();
    }, []);

    // -----------------------

    const requestPermissions = async () => {
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
            alert('Desculpe, precisamos de permissões para acessar a câmera e a galeria!');
        }
    };

    useEffect(() => {
        requestPermissions();
    }, []);

    const handleImagePicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImageUri(result.uri); // Armazena a URI da imagem selecionada
        }
    };

    const handleCamera = async () => {
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImageUri(result.uri); // Armazena a URI da imagem capturada
        }
    };

    // -------------------

    return(
        <>
            <Header/>
            <View style={styles.container}>
                <Text style={styles.title}>Registro de Atividade</Text>
                <View style={styles.line}/>
                <ScrollView>
                    <View style={styles.containerForm}>
                        <Text style={styles.textInput}>Nome do aluno:</Text>
                        <RNPickerSelect
                            onValueChange={(value) => setStudent(value)}
                            items={students} // Agora o array estará formatado corretamente
                            placeholder={{ label: "Selecione um aluno", value: null }}
                            value={student}
                            style={{
                                inputIOS: {
                                    height: 40,
                                    width: 300,
                                    padding: 10,
                                    borderWidth: 0.5,
                                    borderColor: "#3F3F3C",
                                    borderRadius: 20,
                                    fontSize: 18,
                                },
                                inputAndroid: {
                                    height: 40,
                                    width: 300,
                                    padding: 10,
                                    borderWidth: 0.5,
                                    borderColor: "#3F3F3C",
                                    borderRadius: 20,
                                    fontSize: 18,
                                },
                            }}
                        />
                    </View>
                    <View style={styles.containerForm}>
                        <Text style={styles.textInput}>Escola:</Text>
                            <RNPickerSelect
                                onValueChange={(value) => setSchool(value)}
                                items={schools} // Agora o array estará formatado corretamente
                                placeholder={{ label: "Selecione uma escola", value: null }}
                                value={school}
                                style={{
                                    inputIOS: {
                                        height: 40,
                                        width: 300,
                                        padding: 10,
                                        borderWidth: 0.5,
                                        borderColor: "#3F3F3C",
                                        borderRadius: 20,
                                        fontSize: 18,
                                    },
                                    inputAndroid: {
                                        height: 40,
                                        width: 300,
                                        padding: 10,
                                        borderWidth: 0.5,
                                        borderColor: "#3F3F3C",
                                        borderRadius: 20,
                                        fontSize: 18,
                                    },
                                }}
                            />
                    </View>
                    <View style={styles.containerForm}>
                        <Text style={styles.textInput}>Turma:</Text>
                        <RNPickerSelect
                            onValueChange={(value) => setClasse(value)}
                            items={classes} // Agora o array estará formatado corretamente
                            placeholder={{ label: "Selecione uma escola", value: null }}
                            value={classe}
                            style={{
                                inputIOS: {
                                    height: 40,
                                    width: 300,
                                    padding: 10,
                                    borderWidth: 0.5,
                                    borderColor: "#3F3F3C",
                                    borderRadius: 20,
                                    fontSize: 18,
                                },
                                inputAndroid: {
                                    height: 40,
                                    width: 300,
                                    padding: 10,
                                    borderWidth: 0.5,
                                    borderColor: "#3F3F3C",
                                    borderRadius: 20,
                                    fontSize: 18,
                                },
                            }}
                        />
                    </View>
                    <View style={styles.containerForm}>
                        <Text style={styles.textInput}>Data:</Text>
                        <Input/>
                    </View>
                    <View style={styles.containerForm}>
                        <Text style={styles.textInput}>Upload de Fotos:</Text>
                        <Button title="Selecionar da Galeria" onPress={handleImagePicker} />
                        <Button title="Tirar Foto" onPress={handleCamera} />
                        {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
                    </View>
                    <View style={styles.containerForm}>
                        <Text style={styles.textInput}>Descrição:</Text>
                        <InputDescription/>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

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
    containerFormCEP: {
        flexDirection: 'row',
    },
    input: {
        height: 40,
        width: 200,
        padding: 10,
        borderWidth: 0.5,
        borderColor: "#3F3F3C",
        borderRadius: 20,
        fontSize: 18,
        marginRight: 25,
    },
    textInput: {
        fontSize: 18,
        marginLeft: 20,
    },
    button: {
        width: 80,
        height: 40,
        backgroundColor: "#51B59F",
        borderRadius: 20,
    },
    textButton: {
        fontSize: 18,
        fontWeight: 600,
    },
    imagePreview: {
        width: 100,  // Tamanho pequeno da imagem
        height: 100, // Tamanho pequeno da imagem
        marginTop: 10,
        borderRadius: 10,
        resizeMode: 'cover', // Para manter a proporção
    },
});

export default RegisterActivities;