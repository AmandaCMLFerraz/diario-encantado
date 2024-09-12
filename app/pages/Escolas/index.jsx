import { View, Text, StyleSheet, TextInput } from "react-native";
import ButtonPlus from "../../components/ButtonPlus";
import { useNavigation } from "expo-router";

const Escolas = () => {
  const navigation = useNavigation();

  const handleNavCadastroEscola = () => {
    navigation.navigate("CadastroEscola");
  };

  return (
    <View style={styles.containerButton}>
      <ButtonPlus />
    </View>
  );
};

const styles = StyleSheet.create({
  containerButton: {
    flex: 1,
    justifyContent: "flex-end", // Garante que o conteúdo fique no final
    alignItems: "flex-end",
    bottom: 25,
    right: 25,
  },
});

export default Escolas;
