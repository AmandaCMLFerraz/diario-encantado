import React from 'react'
import { TextInput, StyleSheet} from 'react-native';

const Input = ({ placeholder, keyboardType, secureTextEntry, value, onChangeText }) => {

    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#9FA3A6"
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 250,
        padding: 10,
        borderWidth: 0.5,
        borderColor: "#3F3F3C",
        borderRadius: "50%",
        fontSize: 18,
    },
});

export default Input