import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Button } from '@rneui/themed';

import Input from '../../../components/Input';
import ButtonWaterGreen from '../../../components/Button';

import schoolTable from '../../../database/schoolTable';

const SchoolRegistration = () => {

    const [name, setName] = useState('');
    const [telephone, setTelephone] = useState('');
    const [cep, setCep] = useState('');
    const [street, setStreet] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

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
    try {
        const { insert } = schoolTable();

        const result = await insert(id, nome, telefone, cep, rua, bairro, cidade, estado);
        console.log('Escola salva com sucesso!', result);
    } catch (error) {
        console.error('Erro ao salvar escola', error);
    }
};

return (
    <View style={styles.container}>
        <Text style={styles.title}>Cadastro de escola</Text>
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
        <ButtonWaterGreen
            title="Salvar"
            onPress={saveSchool}
        />
    </View>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
    },
    title: {
        marginTop: 25,
        fontSize: 20,
    },
    containerForm: {
        marginTop: 25,
    },
    containerFormCEP: {
        flexDirection: 'row',
    },
    input: {
        height: 40,
        width: 150,
        padding: 10,
        borderWidth: 0.5,
        borderColor: "#3F3F3C",
        borderRadius: "50%",
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
        borderRadius: "50%",
    },
    textButton: {
        fontSize: 18,
        fontWeight: 600,
    },
});

export default SchoolRegistration