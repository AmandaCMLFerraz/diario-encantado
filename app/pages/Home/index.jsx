import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

    const handleNavRegistrations = () => {
        navigation.navigate("Registrations");
    };

    const handleNavPortfolio = () => {
        navigation.navigate("Portfolio");
    };

   return (
    <>
        <Header />
        <View style={styles.container}>
            <ScrollView> 

                <View style={styles.containerOptions}>
                    <View style={styles.containerOptionsFlex}>
                        <Image source={require("../../../assets/images/Escolas.png")} style={styles.images} />
                        <ButtonWaterGreen 
                            title="Escolas"
                            onPress={handleNavSchools} />
                    </View>
                    <View style={styles.containerOptionsFlex}>
                        <Image source={require("../../../assets/images/Turmas.png")} style={styles.images} />
                        <ButtonWaterGreen
                            title="Turmas"
                            onPress={handleNavClasses} />
                    </View>
                </View>

                <View style={styles.containerOptions}>
                    <View style={styles.containerOptionsFlex}>
                        <Image source={require("../../../assets/images/Alunos.png")} style={styles.images} />
                        <ButtonWaterGreen
                            title="Alunos"
                            onPress={handleNavStudents} />
                    </View>
                    <View style={styles.containerOptionsFlex}>
                        <Image source={require("../../../assets/images/Atividades.png")} style={styles.images} />
                        <ButtonWaterGreen
                            title="Atividades"
                            onPress={handleNavActivities} />
                    </View>
                </View>

                    <View style={styles.containerOptions}>
                    <View style={styles.containerOptionsFlex}>
                        <Image source={require("../../../assets/images/Cadastros.png")} style={styles.images} />
                        <ButtonWaterGreen
                            title="Cadastros"
                            onPress={handleNavRegistrations} />
                    </View>
                    <View style={styles.containerOptionsFlex}>
                        <Image source={require("../../../assets/images/Portfolio.png")} style={styles.images} />
                        <ButtonWaterGreen
                            title="Portfolio"
                            onPress={handleNavPortfolio} />
                    </View>
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
    containerOptions: {
        marginTop: 20,
        flexDirection: 'row', // Alinha os itens em linha
        justifyContent: 'space-around', // Distribui espaço entre os itens
        marginBottom: 20, // Adiciona espaço entre linhas
        width: '100%', // Garante que ocupe toda a largura
    },
    containerOptionsFlex: {
        alignItems: "center",
        flex: 1,
        marginHorizontal: 50, // Adiciona espaço entre as colunas
    },
    images: {
        marginBottom: -20,
        width: 100, // Ajuste para que as imagens não ocupem muito espaço
        height: 100,
    },
});

export default Home;
