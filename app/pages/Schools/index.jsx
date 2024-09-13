import { View, StyleSheet, FlatList } from 'react-native';
import ButtonPlus from '../../components/ButtonPlus';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { render } from 'react-native-web';

const Schools = () => {

    const [schools, setSchools] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const { getSchools } = schoolTable();
                const result = await getSchools();
                setSchools(result);
            } catch (error) {
                console.error('Error fetching schools:', error);
            }
        };

        fetchSchools();
    }, []);

    const handleNavSchoolRegistration = () => {
        navigation.navigate("SchoolRegistration");
    };

    const renderSchool = ({ item }) => {
        <View>
            <Text style={styles.schoolName}>{item.name}</Text>
        </View>
    }

    return (
        <View>
            <FlatList
                data={school}
                renderItem={render}
            />
            <View style={styles.containerButton}>
                <ButtonPlus
                    onPress={handleNavSchoolRegistration}
                />
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    containerButton: {
        flex: 1,
        justifyContent: 'flex-end', // Garante que o conteúdo fique no final
        alignItems: 'flex-end',
        bottom: 25,
        right: 25,
    },
});

export default Schools

