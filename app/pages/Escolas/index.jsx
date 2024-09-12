import { View, Text, StyleSheet, TextInput } from 'react-native';
import ButtonPlus from '../../components/ButtonPlus';

const Escolas = () => {
    return(
        <View style={styles.containerButton}>
            <ButtonPlus/>
        </View>
    );
};

const styles = StyleSheet.create({
    containerButton: {
        flex: 1,
        justifyContent: 'flex-end', // Garante que o conteúdo fique no final
        alignItems: 'flex-end', 
    },
});

export default Escolas

