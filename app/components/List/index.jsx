import React from 'react'
import { View } from 'react-native';
import { StyleSheet} from 'react-native';
import { Button } from '@rneui/themed';

const List = ({ title, onPress }) => {

    return (
        <View style={styles.container}>
            <Button
                buttonStyle={styles.button}
                titleStyle={styles.buttonText}
                title={title}
                onPress={onPress}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        width: "100%", // O botão ocupará toda a largura do container
        height: 65,
        backgroundColor: "transparent",
        alignItems: "flex-start", // Alinha o texto à esquerda
    },
    buttonText: {
        fontSize: 18,
        color: "#3F3F3C",
    },
});

export default List