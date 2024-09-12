import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from 'expo-router';

import ButtonWaterGreen from '../../components/Button';

const Home = () => {

    const navigation = useNavigation();

    const handleNavEscolas = () => {
        navigation.navigate("Escolas");
    };

    const handleNavTurmas = () => {
        navigation.navigate("Turmas");
    };

    const handleNavAlunos = () => {
        navigation.navigate("Alunos");
    };

    const handleNavAtividades = () => {
        navigation.navigate("Atividades");
    };

    return (
        <View style={styles.container}>
            <View style={styles.line} />
            <View style={styles.containerOptions}>
                <Image source={require("../../../assets/images/Escolas.jpeg")} style={styles.images}/>
                <ButtonWaterGreen 
                    title="Escolas"
                    onPress={handleNavEscolas} />
            </View>
            <View style={styles.containerOptions}>
                <Image source={require("../../../assets/images/Turmas.jpeg")} style={styles.images}/>
                <ButtonWaterGreen
                    title="Turmas"
                    onPress={handleNavTurmas} />
            </View>
            <View style={styles.containerOptions}>
                <Image source={require("../../../assets/images/Alunos.jpeg")} style={styles.images}/>
                <ButtonWaterGreen
                    title="Alunos"
                    onPress={handleNavAlunos} />
            </View>
            <View style={styles.containerOptions}>
                <Image source={require("../../../assets/images/Atividades.png")} style={styles.images}/>
                <ButtonWaterGreen
                    title="Atividades"
                    onPress={handleNavAtividades} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
    },
    line: {
        width: "80%",
        height: 1,
        backgroundColor: "#51B59F",
        margin: 25,
    },
    containerOptions: {
        alignItems: "center",
    },
    images: {
        width: 250,
        height: 100,
    },
});

export default Home