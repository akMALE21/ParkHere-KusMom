import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import theme from "../../config/theme";
import { Image } from 'react-native';

export default function Landing() {

    const navigation = useNavigation();

    return <View style={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>ParkHere</Text>
        <Image
        style={styles.tinyLogo}
        source={require('../../assets/logo.png')}/>


        <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={() => navigation.navigate("Login")}>Login</Button>
            <Text style={styles.or}>or</Text>
            <Button mode="outlined" onPress={() => navigation.navigate("Register")}>Create a new account</Button>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    buttonContainer: {
        marginTop: 20
    },
    or: {
        alignSelf: "center"
    },
    title: {
        color: theme.colors.primary
    },
    tinyLogo: {
        width: 50,
        height: 80,
        marginTop: 20,
    },
})