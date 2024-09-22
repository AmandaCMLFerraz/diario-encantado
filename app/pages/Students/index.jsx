import { View, StyleSheet, FlatList, Text } from 'react-native';
import ButtonPlus from '../../components/ButtonPlus';
import { useFocusEffect, useNavigation } from 'expo-router';
import { useState, useCallback } from 'react';
import { Icon } from '@rneui/themed';

import { deleteStudent, getStudent } from '../../database/studentTable';
import { initializeDatabase } from '../../database/initializeDatabase';
import Header from '../../components/Header';

const Students = () => {
    const [student, setStudent] = useState([]);
    const navigation = useNavigation();

    const fetchStudents = useCallback(async () => {
        try {
            // Inicializar o banco de dados
            await initializeDatabase();

            // Buscar as escolas
            const result = await getStudent();
            console.log('foi', result);
            setStudent(result);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchStudents();
        }, [fetchStudents])
    );

    const handleDeleteStudent = async (id) => {
        try {
            await deleteStudent(id);
            fetchStudents(); // Atualiza a lista após exclusão
        } catch (error) {
            console.error('Erro ao excluir aluno:', error);
        }
    };

    const handleNavRegisterStudent = () => {
        navigation.navigate("RegisterStudent");
    };

    // const handleNavEditSchool = () => {
    //     navigation.navigate("EditSchool");
    // };

    const renderStudent = ({ item }) => {
        return (
            <View style={styles.container}>
                <View style={styles.containerList}>
                    <Text style={styles.textList}>{item.nome}</Text>
                    <View style={styles.containerIcon}>
                        <Icon
                            name='edit'
                            color='#3F3F3C'
                            // onPress={handleNavEditStudent}
                        />
                        <Icon
                            name='delete'
                            color='#3F3F3C'
                            onPress={() => handleDeleteStudent(item.id)}
                        />
                    </View>
                </View>
                <View style={styles.line} />
            </View>
        );
    };

    return (
        <>
            <Header />
            <View style={styles.container}>
                <Text style={styles.title}>Alunos</Text>
                <View style={styles.line} />
                <FlatList
                    data={student}
                    renderItem={renderStudent}
                    keyExtractor={(item) => item.id.toString()}
                />
                <View style={styles.containerButton}>
                    <ButtonPlus onPress={handleNavRegisterStudent} />
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

export default Students;
