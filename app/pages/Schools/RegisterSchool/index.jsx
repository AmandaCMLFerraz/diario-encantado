import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import { Button } from '@rneui/themed';

import Input from '../../../components/Input';
import ButtonWaterGreen from '../../../components/ButtonWaterGreen';

import { insertSchool} from '../../../database/schoolTable';
import { initializeDatabase } from '../../../database/initializeDatabase';
import { useNavigation } from '@react-navigation/native';
import ApiCep from '../../../services/apiCep';
import Header from '../../../components/Header';

const RegisterSchool = () => {

    const [name, setName] = useState('');
    const [telephone, setTelephone] = useState('');
    const [cep, setCep] = useState('');
    const [street, setStreet] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const navigation = useNavigation();

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

    const saveSchool = async () => {
        if (!name.trim()){
            console.error('O nome da escola não pode estar em branco');
            return;
        }
        
        try {
            const result = await insertSchool(name, telephone, cep, street, neighborhood, city, uf);
            console.log('Escola salva com sucesso!', result);
            navigation.navigate('Schools');
        } catch (error) {
            console.error('Erro ao salvar escola', error);
        }
    };
    

return (
    <>
        <Header />
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro de escola</Text>
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
                    <Text style={styles.textInput}>Telefone:</Text>
                    <Input
                        value={telephone}
                        onChangeText={setTelephone}
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
                onPress={saveSchool}
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
});

export default RegisterSchool