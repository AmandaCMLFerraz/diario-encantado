import React from 'react'
import { StyleSheet} from 'react-native';
import { Button } from '@rneui/themed';

const ButtonWaterGreen = ({ title, onPress }) => {

    return (
        <Button
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            title={title}
            onPress={onPress}
        />
    );
};

const styles = StyleSheet.create({
    button: {
        width: 150,
        height: 40,
        backgroundColor: "#51B59F",
        borderRadius: 20,
        marginTop: 25,
        marginBottom: 25,
    },
    buttonText: {
        fontWeight: "600",
        fontSize: 18,
        color: "#ffffff",
    },
});

export default ButtonWaterGreen