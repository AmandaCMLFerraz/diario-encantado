import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Header from '../../components/Header';
import List from '../../components/List';

const Registrations = () => {

    return(
        <>
            <Header/>
            <View style={styles.container}>
                <Text style={styles.title}>Cadastros</Text>
                <View style={styles.line}/>
                <ScrollView>
                    <View style={styles.containerItem}>
                        <List
                            title={"Escolas"}
                        />
                    </View>
                    <View style={styles.line}/>

                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
    },
    title: {
        margin: 25,
        fontSize: 20,
    },
    containerItem: {
        width: "100%",
    },
    line: {
        width: "90%",
        height: 1,
        backgroundColor: "#51B59F",
        alignSelf: "center",
    },
    scrollView: {
        width: "100%", // Garante que o ScrollView ocupe toda a largura
    },
})

export default Registrations