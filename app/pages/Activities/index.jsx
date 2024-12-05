import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import Header from "../../components/Header";
import ButtonPlus from "../../components/ButtonPlus";
import { useNavigation } from "@react-navigation/native";
import { initializeDatabase } from "../../database/initializeDatabase";
import { getActivity } from "../../database/activityTable";

const Activities = () => {
    const [activities, setActivities] = useState([]);
    const navigation = useNavigation();

    // Função para buscar atividades do banco de dados
    const fetchActivities = async () => {
        try {
            await initializeDatabase(); // Garante que o banco está inicializado
            const result = await getActivity(); // Busca as atividades
            setActivities(result);
        } catch (error) {
            console.error("Erro ao buscar atividades:", error);
        }
    };

    // Buscar atividades ao montar o componente
    useEffect(() => {
        fetchActivities();
    }, []);

    // Navegar para a tela de registro de atividades
    const handleNavRegisterActivities = () => {
        navigation.navigate("RegisterActivities");
    };

    // Renderizar cada item da lista de atividades
    const renderActivity = ({ item }) => (
        <View style={styles.activityItem}>
            <Text style={styles.activityText}>
                <Text style={styles.label}>Aluno:</Text> {item.nome}
            </Text>
            <Text style={styles.activityText}>
                <Text style={styles.label}>Descrição:</Text> {item.descricao}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header />
            <FlatList
                data={activities}
                renderItem={renderActivity}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <Text style={styles.emptyMessage}>Nenhuma atividade cadastrada.</Text>
                }
            />
            <View style={styles.containerButton}>
                <ButtonPlus onPress={handleNavRegisterActivities} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    listContent: {
        padding: 16,
    },
    activityItem: {
        backgroundColor: "#f9f9f9",
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        borderColor: "#ddd",
        borderWidth: 1,
    },
    activityText: {
        fontSize: 16,
        marginBottom: 4,
    },
    label: {
        fontWeight: "bold",
    },
    emptyMessage: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
        color: "#aaa",
    },
    containerButton: {
        position: "absolute",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        bottom: 25,
        right: 25,
    },
});

export default Activities;
