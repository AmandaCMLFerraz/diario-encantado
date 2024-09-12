import { Button, Icon } from '@rneui/themed';
import { StyleSheet } from 'react-native';

const ButtonPlus = () => {

    return (
        <Button
            title={
                <>
                    <Icon name="plus" type="antdesign" size={30} color="white" />
                </>
            }
            buttonStyle={styles.button}
            titleStyle={styles.textButton}
        />
    );
};

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
        backgroundColor: "#51B59F",
        borderRadius: "50%",
        bottom: 25
    }
});

export default ButtonPlus