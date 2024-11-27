import { View, StyleSheet, FlatList, Text } from 'react-native';
import ButtonPlus from '../../components/ButtonPlus';
import { useFocusEffect } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { useState, useCallback, useEffect } from 'react';
import { Icon } from '@rneui/themed';

import { deleteClasse, getClasse } from '../../database/classesTable';
import { initializeDatabase } from '../../database/initializeDatabase';
import Header from '../../components/Header';

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const navigation = useNavigation();

    const fetchClasses = useCallback(async () => {
        try {
            // Inicializar o banco de dados
            await initializeDatabase();

            // Buscar as escolas
            const result = await getClasse();
            console.log('foi', result);
            setClasses(result);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    }, []);

    useEffect(() => {
        fetchClasses(); // Isso irá rodar sempre que o componente for montado
    }, [fetchClasses]); // Ou depende de alguma outra variável
    

    const handleDeleteClasse = async (id) => {
        try {
            await deleteClasse(id);
            fetchClasses(); // Atualiza a lista após exclusão
        } catch (error) {
            console.error('Erro ao excluir turma:', error);
        }
    };

    const handleNavRegisterClasses = () => {
        navigation.navigate("RegisterClasses");
    };

    const handleNavEditClasses = () => {
        navigation.navigate("EditClasses", {id});
    };

    const renderClasses = ({ item }) => {
        return (
            <View style={styles.container}>
                <View style={styles.containerList}>
                    <Text style={styles.textList}>{item.turma}</Text>
                    <View style={styles.containerIcon}>
                        <Icon
                            name='edit'
                            color='#3F3F3C'
                            onPress={() => handleNavEditClasses(item.id)}
                        />
                        <Icon
                            name='delete'
                            color='#3F3F3C'
                            onPress={() => handleDeleteClasse(item.id)}
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
                <Text style={styles.title}>Turmas</Text>
                <View style={styles.line} />
                <FlatList
                    data={classes}
                    renderItem={renderClasses}
                    keyExtractor={(item) => item.id.toString()} // Supondo que cada escola tem um 'id'
                    style={{ flex: 1 }}
                />
                <View style={styles.containerButton}>
                    <ButtonPlus onPress={handleNavRegisterClasses}/>
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

export default Classes;
