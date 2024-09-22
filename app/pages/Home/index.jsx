import React from 'react'
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from 'expo-router';

import ButtonWaterGreen from '../../components/ButtonWaterGreen';
import Header from '../../components/Header';

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
       <>
        <Header />
        <View style={styles.container}>
            <View style={styles.line} />
            <ScrollView> 
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
            </ScrollView>
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
