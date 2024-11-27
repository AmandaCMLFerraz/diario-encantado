import { View, StyleSheet } from "react-native"
import Header from "../../components/Header"
import ButtonPlus from "../../components/ButtonPlus"
import { useNavigation } from '@react-navigation/native';


const Activities = () => {

    

    const navigation = useNavigation();

    const handleNavRegisterActivities = () => {
        navigation.navigate("RegisterActivities");
    };

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.containerButton}>
                <ButtonPlus 
                    onPress={handleNavRegisterActivities}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
    },

    containerButton: {
        position: 'absolute', // Para garantir que o botão fique no canto da tela
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        bottom: 25,
        right: 25,
    },
})

export default Activities
