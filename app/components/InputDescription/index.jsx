import React from 'react'
import { TextInput, StyleSheet} from 'react-native';

const InputDescription = ({ placeholder, keyboardType, secureTextEntry, value, onChangeText }) => {

    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#9FA3A6"
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
            multiline // Permite várias linhas
            numberOfLines={5} // Define a altura inicial (opcional)
            textAlignVertical="top" // Alinha o texto ao topo 
        />
    );
};

const styles = StyleSheet.create({
    input: {
        minHeight: 40, // Altura mínima
        maxHeight: 120, // Altura máxima para evitar crescimento excessivo
        width: 300,
        padding: 10,
        borderWidth: 0.5,
        borderColor: "#3F3F3C",
        borderRadius: 20,
        fontSize: 18,
    },
});

export default InputDescription