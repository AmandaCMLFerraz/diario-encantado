import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { useState, useCallback } from 'react';
import { Icon } from '@rneui/themed';
import * as Print from 'expo-print'; // Importação para gerar PDF

import { getStudent } from '../../database/studentTable';
import { initializeDatabase } from '../../database/initializeDatabase';
import { getActivity } from '../../database/activityTable'; // Importação para obter atividades
import Header from '../../components/Header';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

const Portfolio = () => {
    const [student, setStudent] = useState([]);
    const navigation = useNavigation();

    const fetchStudents = useCallback(async () => {
        try {
            // Inicializar o banco de dados
            await initializeDatabase();

            // Buscar os alunos
            const result = await getStudent();
            console.log('Alunos carregados:', result);
            setStudent(result);
        } catch (error) {
            console.error('Erro ao buscar alunos:', error);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchStudents();
        }, [fetchStudents])
    );

    const getImageAsBase64 = async (uri) => {
        try {
            const base64 = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            return `data:image/jpeg;base64,${base64}`;
        } catch (error) {
            console.error("Erro ao converter imagem para Base64:", error);
            return null;
        }
    };
    
    // Função para buscar atividades do aluno e gerar PDF
    const generatePDF = async (student) => {
        try {
            // Buscar atividades relacionadas ao aluno
            const activities = await getActivity();
            const studentActivities = activities.filter(
                (activity) => activity.nome === student.nome
            );
    
            // Processar as atividades e converter imagens em Base64
            const processedActivities = await Promise.all(
                studentActivities.map(async (activity) => {
                    const base64Image = activity.imagem
                        ? await getImageAsBase64(activity.imagem)
                        : null;
    
                    return `
                        <div class="activity">
                            <p><strong>Data:</strong> ${activity.data}</p>
                            <p><strong>Descrição:</strong> ${activity.descricao}</p>
                            ${
                                base64Image
                                    ? `<img src="${base64Image}" class="image" />`
                                    : '<p><em>Imagem não disponível</em></p>'
                            }
                        </div>
                    `;
                })
            );
    
            // Criar conteúdo HTML para o PDF
            const htmlContent = `
                <html>
                    <head>
                        <style>
                            body { font-family: Arial, sans-serif; margin: 20px; }
                            h1 { color: #51B59F; }
                            .activity { margin-bottom: 20px; }
                            .image { max-width: 200px; max-height: 200px; margin-top: 10px; }
                        </style>
                    </head>
                    <body>
                        <h1>Relatório de Atividades</h1>
                        <p><strong>Nome do Aluno:</strong> ${student.nome}</p>
                        <h2>Atividades Realizadas</h2>
                        ${processedActivities.join('')}
                    </body>
                </html>
            `;
    
            // Gerar o PDF
            const { uri } = await Print.printToFileAsync({ html: htmlContent });
    
            // Verificar se o compartilhamento está disponível
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(uri); // Abrir o diálogo de compartilhamento
            } else {
                alert('Compartilhamento não disponível neste dispositivo.');
            }
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            alert('Erro ao gerar o PDF.');
        }
    };    

    // Função para renderizar cada aluno na lista
    const renderStudent = ({ item }) => {
        return (
            <View style={styles.container}>
                <View style={styles.containerList}>
                    <Text style={styles.textList}>{item.nome}</Text>
                    <View>
                        <Icon
                            name="file-pdf"
                            type="font-awesome-5"
                            color="#3F3F3C"
                            onPress={() => generatePDF(item)}
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
        position: 'absolute',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        bottom: 25,
        right: 25,
    },
});

export default Portfolio;
