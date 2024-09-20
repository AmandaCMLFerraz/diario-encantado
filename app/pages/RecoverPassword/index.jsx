import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';

import Input from '../../components/Input'
import ButtonWaterGreen from '../../components/ButtonWaterGreen'

const RecoverPassword = () => {

    return (
        <View style={styles.container}>
            <Image source={require("../../../assets/images/LogoRegister.png")} style={styles.logo}/>
            <View style={styles.containerForm}>
                <View style={styles.textForm}>
                    <Text style={styles.textInput}>E-mail:</Text>
                    <Input keyboardType="email-address" />
                </View>
                <View style={styles.textForm}>
                    <Text style={styles.textInput}>Nova senha:</Text>
                    <Input secureTextEntry={true}/>
                </View>
                <View style={styles.textForm}>
                    <Text style={styles.textInput}>Confirmar nova senha:</Text>
                    <Input secureTextEntry={true}/>
                </View>
            </View>
            <ButtonWaterGreen 
                    title="Alterar Senha"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
    },
    logo: {
        height: 160,
        width: "100%",
        borderBottomRightRadius: 150,
    },
    containerForm: {
        marginTop: 100,
    },
    textForm: {
        marginTop: 25,
    },
    textInput: {
        fontSize: 18,
        marginLeft: 20,
    },
});

export default RecoverPassword