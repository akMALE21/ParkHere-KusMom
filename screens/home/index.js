import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import theme from "../../config/theme";

import auth from '@react-native-firebase/auth';

export default function Home() {
    const handleLogout = () => {

        auth().signOut();
    }
    return <View style={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>Welcome Home!</Text>
        <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={handleLogout}>Logout</Button>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonContainer: {
        marginTop: 20
    },
    title: {
        color: theme.colors.primary
    },
})