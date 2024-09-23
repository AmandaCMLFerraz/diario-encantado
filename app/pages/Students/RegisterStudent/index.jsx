import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Button } from '@rneui/themed';
import Input from '../../../components/Input';
import ButtonWaterGreen from '../../../components/ButtonWaterGreen';

import { insertStudent} from '../../../database/studentTable';
import { initializeDatabase } from '../../../database/initializeDatabase';
import { getSchools } from '../../../database/schoolTable';
import { getClasse } from '../../../database/classesTable';
import { useNavigation } from 'expo-router';
import ApiCep from '../../../services/apiCep';
import Header from '../../../components/Header';

const RegisterStudents = () => {

    const [name, setName] = useState('');
    const [school, setSchool] = useState('');
    const [classe, setClasse] = useState('');
    const [responsibleName, setResponsibleName] = useState('');
    const [responsibleTelephone, setResponsibleTelephone] = useState('');
    const [cep, setCep] = useState('');
    const [street, setStreet] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [schools, setSchools] = useState([]);
    const [classes, setClasses] = useState([]);

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
                await loadSchools(); // Carrega as escolas após a inicialização do banco
                await loadClasses();
            } catch (error) {
                console.error('Failed to initialize database:', error);
            }
        };
        init();
    }, []);

    const buscarCep = async () => {
        if(cep === ""){
            Alert.alert('CEP inválido.')
            setCep('')
        }
        try{
            const response = await ApiCep.get(`/${cep}/json/`)
            setStreet(response.data.logradouro)
            setNeighborhood(response.data.bairro)
            setCity(response.data.localidade)
            setUf(response.data.uf)
        }catch(error){
            console.log('erro' + error)
        }
    }

    const saveStudent = async () => {
        if (!name.trim()){
            console.error('O nome do aluno não pode estar em branco');
            return;
        }
        
        const selectedSchool = schools.find(s => s.value === school);
        const schoolName = selectedSchool ? selectedSchool.label : '';
        const selectedClasse = classes.find(s => s.value === classe);
        const classeName = selectedClasse ? selectedClasse.label : '';

        try {
            const result = await insertStudent(name, schoolName, classeName, responsibleName, responsibleTelephone, cep, street, neighborhood, city, uf);
            console.log('Aluno salvo com sucesso!', result);
            navigation.navigate('Students');
        } catch (error) {
            console.error('Erro ao salvar aluno', error);
        }
    };

    return (
        <>
            <Header />
            <View style={styles.container}>
                <Text style={styles.title}>Cadastro de aluno</Text>
                <View style={styles.line}/>
                <ScrollView>
                    <View style={styles.containerForm}>
                        <Text style={styles.textInput}>Nome:</Text>
                        <Input
                            value={name}
                            onChangeText={setName}
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
                            placeholder={{ label: "Selecione uma turma", value: null }}
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
                        <Text style={styles.textInput}>Nome do responsável:</Text>
                        <Input
                            value={responsibleName}
                            onChangeText={setResponsibleName}
                        />
                    </View>
                    <View style={styles.containerForm}>
                        <Text style={styles.textInput}>Telefone para contato:</Text>
                        <Input
                            value={responsibleTelephone}
                            onChangeText={setResponsibleTelephone}
                        />
                    </View>
                    <View style={styles.containerForm}>
                        <Text style={styles.textInput}>CEP:</Text>
                        <View style={styles.containerFormCEP}>
                            <TextInput style={styles.input}
                                value={cep}
                                onChangeText={setCep}
                            />
                            <Button
                                title="Buscar"
                                buttonStyle={styles.button}
                                titleStyle={styles.textButton}
                                onPress={buscarCep}
                            />
                        </View>
                    </View>
                    <View style={styles.containerForm}>
                        <Text style={styles.textInput}>Rua:</Text>
                        <Input
                            value={street}
                            onChangeText={setStreet}
                        />
                    </View>
                    <View style={styles.containerForm}>
                        <Text style={styles.textInput}>Bairro:</Text>
                        <Input
                            value={neighborhood}
                            onChangeText={setNeighborhood}
                        />
                    </View>
                    <View style={styles.containerForm}>
                        <Text style={styles.textInput}>Cidade:</Text>
                        <Input
                            value={city}
                            onChangeText={setCity}
                        />
                    </View>
                    <View style={styles.containerForm}>
                        <Text style={styles.textInput}>Estado:</Text>
                        <Input
                            value={uf}
                            onChangeText={setUf}
                        />
                    </View>
                </ScrollView>
                <ButtonWaterGreen
                    title="Salvar"
                    onPress={saveStudent}
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
    containerFormCEP: {
        flexDirection: 'row',
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
});

export default RegisterStudents