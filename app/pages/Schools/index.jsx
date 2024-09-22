import { View, StyleSheet, FlatList, Text } from 'react-native';
import ButtonPlus from '../../components/ButtonPlus';
import { useFocusEffect, useNavigation } from 'expo-router';
import { useState, useCallback } from 'react';
import { Icon } from '@rneui/themed';

import { deleteSchools, getSchools } from '../../database/schoolTable';
import { initializeDatabase } from '../../database/initializeDatabase';
import Header from '../../components/Header';

const Schools = () => {
    const [schools, setSchools] = useState([]);
    const navigation = useNavigation();

    const fetchSchools = useCallback(async () => {
        try {
            // Inicializar o banco de dados
            await initializeDatabase();

            // Buscar as escolas
            const result = await getSchools();
            console.log('foi', result);
            setSchools(result);
        } catch (error) {
            console.error('Error fetching schools:', error);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchSchools();
        }, [fetchSchools])
    );

    const handleDeleteSchool = async (id) => {
        try {
            await deleteSchools(id);
            fetchSchools(); // Atualiza a lista após exclusão
        } catch (error) {
            console.error('Erro ao excluir escola:', error);
        }
    };

    const handleNavRegisterSchool = () => {
        navigation.navigate("RegisterSchool");
    };

    const handleNavEditSchool = () => {
        navigation.navigate("EditSchool");
    };

    const renderSchool = ({ item }) => {
        return (
            <View style={styles.container}>
                <View style={styles.containerList}>
                    <Text style={styles.textList}>{item.nome}</Text>
                    <View style={styles.containerIcon}>
                        <Icon
                            name='edit'
                            color='#3F3F3C'
                            onPress={handleNavEditSchool}
                        />
                        <Icon
                            name='delete'
                            color='#3F3F3C'
                            onPress={() => handleDeleteSchool(item.id)}
                        />
                    </View>
                </View>
                <View style={styles.line}/>
            </View>
        );
    };

    return (
        <>
            <Header />
            <View style={styles.container}>
                <Text style={styles.title}>Escolas</Text>
                <View style={styles.line} />
                <FlatList
                    data={schools}
                    renderItem={renderSchool}
                    keyExtractor={(item) => item.id.toString()} // Supondo que cada escola tem um 'id'
                />
                <View style={styles.containerButton}>
                    <ButtonPlus onPress={handleNavRegisterSchool} />
                </View>
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
        fontSize: 20,
        marginTop: 25,
    },
    line: {
        width: "90%",
        height: 1,
        backgroundColor: "#51B59F",
        margin: 25,
    },
    containerList: {
        width: '90%',
        justifyContent: "space-between",
        flexDirection: 'row',
    },
    textList: {
        fontSize: 18,
    },
    containerIcon: {
        width: '25%',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    containerButton: {
        position: 'absolute', // Para garantir que o botão fique no canto da tela
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        bottom: 25,
        right: 25,
    },
    
});

export default Schools;
