import { Button, Icon } from '@rneui/themed';
import { StyleSheet } from 'react-native';

const ButtonPlus = ({ onPress, title }) => {

    return (
        <Button
            title={
                <Icon name="plus" type="antdesign" size={30} color="white" />
            }
            onPress={onPress}
            buttonStyle={styles.button}
        />
    );
};

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
        backgroundColor: "#51B59F",
        borderRadius: 50,
    }
});

export default ButtonPlus