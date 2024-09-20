import React from 'react'
import { View, StyleSheet, Image } from 'react-native';
import { useNavigation } from 'expo-router';

import ButtonWaterGreen from '../../components/ButtonWaterGreen';

const Home = () => {

    const navigation = useNavigation();

    const handleNavSchools = () => {
        navigation.navigate("Schools");
    };

    const handleNavClasses = () => {
        navigation.navigate("Classes");
    };

    const handleNavStudents = () => {
        navigation.navigate("Students");
    };

    const handleNavActivities = () => {
        navigation.navigate("Activities");
    };

    return (
        <View style={styles.container}>
            <View style={styles.line} />
            <View style={styles.containerOptions}>
                <Image source={require("../../../assets/images/Escolas.jpeg")} style={styles.images}/>
                <ButtonWaterGreen 
                    title="Escolas"
                    onPress={handleNavSchools} />
            </View>
            <View style={styles.containerOptions}>
                <Image source={require("../../../assets/images/Turmas.jpeg")} style={styles.images}/>
                <ButtonWaterGreen
                    title="Turmas"
                    onPress={handleNavClasses} />
            </View>
            <View style={styles.containerOptions}>
                <Image source={require("../../../assets/images/Alunos.jpeg")} style={styles.images}/>
                <ButtonWaterGreen
                    title="Alunos"
                    onPress={handleNavStudents} />
            </View>
            <View style={styles.containerOptions}>
                <Image source={require("../../../assets/images/Atividades.png")} style={styles.images}/>
                <ButtonWaterGreen
                    title="Atividades"
                    onPress={handleNavActivities} />
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
        width: "90%",
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
