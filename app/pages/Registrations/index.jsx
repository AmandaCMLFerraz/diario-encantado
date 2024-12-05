import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa o hook de navegação
import Header from '../../components/Header';
import List from '../../components/List';

const Registrations = () => {
    const navigation = useNavigation(); // Hook de navegação

    // Função para navegar para outra tela
    const navigateToEscolas = () => {
        navigation.navigate('Schools'); 
    };
    const navigateToTurmas = () => {
        navigation.navigate('Classes'); 
    };
    const navigateToAlunos = () => {
        navigation.navigate('Students'); 
    };
    const navigateToAtividades = () => {
        navigation.navigate('Activities'); 
    };
    

    return(
        <>
            <Header/>
            <View style={styles.container}>
            <Text style={styles.title}>Cadastros</Text>
            <View style={styles.line}/>
            <Text style={styles.alinhaEsquerda} onPress={navigateToEscolas}>Escolas</Text>
            <View style={styles.line}/>
            <Text style={styles.alinhaEsquerda}onPress={navigateToTurmas}>Turmas </Text>
            <View style={styles.line}/>
            <Text style={styles.alinhaEsquerda}onPress={navigateToAlunos}>Alunos </Text>
            <View style={styles.line}/>
            <Text style={styles.alinhaEsquerda}onPress={navigateToAtividades}>Atividades </Text>
            <View style={styles.line}/>
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
        textAlign: "center",
    },
    containerItem: {
        width: "100%",
    },
    line: {
        width: "90%",
        height: 1,
        backgroundColor: "#51B59F",
        alignSelf: "center",
        margin: 25,
    },
    scrollView: {
        width: "100%", // Garante que o ScrollView ocupe toda a largura
    },
    alinhaEsquerda: { //criei para alinhar à esquerda as opções de tela de cadastro
        fontSize: 18,
        width: "100%",
        alignItems: "flex-start", 
        marginLeft: 40, 
    },
    listagem: {
        fontSize: 18,
        width: "100%",
        alignItems: "flex-start", 
        marginLeft: 60, 
    },
});

export default Registrations;