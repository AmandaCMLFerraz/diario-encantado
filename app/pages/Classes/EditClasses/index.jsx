import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Button } from '@rneui/themed';
import Input from '../../../components/Input';
import ButtonWaterGreen from '../../../components/ButtonWaterGreen';

import { updateClasse } from '../../../database/classesTable';
import { initializeDatabase } from '../../../database/initializeDatabase';
import { getSchools } from '../../../database/schoolTable';
import { useNavigation } from 'expo-router';
import Header from '../../../components/Header';

const EditClasses = () => {

    const [classe, setClasse] = useState('');
    const [school, setSchool] = useState('');
    const [schools, setSchools] = useState([]);

    const navigation = useNavigation();

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

    useEffect(() => {
        const init = async () => {
            try {
                await initializeDatabase();
                console.log('Database initialized successfully');
                await loadSchools(); // Carrega as escolas após a inicialização do banco
            } catch (error) {
                console.error('Failed to initialize database:', error);
            }
        };
        init();
    }, []);

    const updateClasse = async () => {
        if (!classe.trim()){
            console.error('A turma não pode estar em branco');
            return;
        }
        
        const selectedSchool = schools.find(s => s.value === school);
        const schoolName = selectedSchool ? selectedSchool.label : '';

        try {
            const result = await updateClasse(classe, schoolName);
            console.log('turma salva com sucesso!', result);
            navigation.navigate('Classes');
        } catch (error) {
            console.error('Erro ao salvar turma', error);
        }
    };

    return (
        <>
            <Header />
            <View style={styles.container}>
                <Text style={styles.title}>Cadastro de turma</Text>
                <View style={styles.line}/>
                <ScrollView>
                    <View style={styles.containerForm}>
                        <Text style={styles.textInput}>Turma:</Text>
                        <Input
                            value={classe}
                            onChangeText={setClasse}
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
                </ScrollView>
                <ButtonWaterGreen
                    title="Salvar"
                    onPress={updateClasse}
                />
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
    input: {
        height: 40,
        width: 195,
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
    picker: {
        height: 40,
        width: 300,
        padding: 10,
        borderWidth: 0.5,
        borderColor: "#3F3F3C",
        borderRadius: 20,
        fontSize: 18,
    },
});

export default EditClasses 