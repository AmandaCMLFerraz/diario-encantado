import { View, StyleSheet, FlatList, Text } from 'react-native';
import ButtonPlus from '../../components/ButtonPlus';
import { useFocusEffect, useNavigation } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';

import { deleteSchools, getSchools, updateSchool } from '../../database/schoolTable';
import { initializeDatabase } from '../../database/initializeDatabase';
import ButtonWaterGreen from '../../components/ButtonWaterGreen';


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

    // const handleUpdateSchool = async (id, updatedData) => {
    //     try {
    //         await updateSchool(id, updatedData.nome, updatedData.telephone, updatedData.cep, updatedData.street, updatedData.neighborhood, updatedData.city, updatedData.uf);
    //         fetchSchools(); // Atualiza a lista após a atualização
    //     } catch (error) {
    //         console.error('Erro ao atualizar escola:', error);
    //     }
    // };

    const handleNavSchoolRegistration = () => {
        navigation.navigate("SchoolRegistration");
    };

    const renderSchool = ({ item }) => {
        return (
            <View>
                <Text>{item.nome}</Text>
                <ButtonWaterGreen title="Excluir" onPress={() => handleDeleteSchool(item.id)} color="#FF6347" />
                <ButtonWaterGreen title="Editar" onPress={() => handleUpdateSchool(item.id)} color="#FF6347" />
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={schools}
                renderItem={renderSchool}
                keyExtractor={(item) => item.id.toString()} // Supondo que cada escola tem um 'id'
            />
            <View style={styles.containerButton}>
                <ButtonPlus onPress={handleNavSchoolRegistration} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerButton: {
        position: 'absolute', // Para garantir que o botão fique no canto da tela
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        bottom: 25,
        right: 25,
    },
    schoolName: {
        fontSize: 18,
        margin: 10,
    },
});

export default Schools;
