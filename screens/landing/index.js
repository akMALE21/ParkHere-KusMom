import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { Image } from 'react-native';

export default function Landing() {

    const navigation = useNavigation();

    return <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Image
                style={styles.Logo}
                source={require('../../assets/img/landing_logo.png')}/>
        </View>
        
        <View style={[styles.textContainer, {alignItems: "flex-start"}]}>
            <Text style={styles.mainTitle}>Let's Get</Text>
            <Text style={styles.mainTitle}>Started!</Text>
        </View>

        <View style={[styles.textContainer, {alignItems: "flex-start"}]}>
            <Text style={styles.subTitle}>Simplify your parking</Text>
            <Text style={styles.subTitle}>experience with ParkHere</Text>
        </View>

        <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={() => navigation.navigate("Login")} style={{borderColor: '#5995F1', marginTop: 40, padding: 5}}>Sign In</Button>
            <Button mode="outlined" onPress={() => navigation.navigate("Register")} style={{borderColor: '#5995F1', marginTop: 20, padding: 5}}>Register</Button>
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
        width: "65%",
        fontFamily: "yu-gothic",
    },

    Button: {
        margin: 20
    },

    logoContainer: {
        alignItems: "center",
    },
    
    textContainer: {
        width: "65%",
        justifyContent: "center",
        marginTop: 20
    },

    mainTitle: {
        fontFamily: "Inter",
        color: "#5995F1",
        textAlign: "left",
        fontSize: 35,
        fontWeight: "bold"
    },

    subTitle: {
        fontFamily: "yu-gothic",
        color: "#464646",
        textAlign: "left",
        fontSize: 18,
        fontWeight: "semibold"
    },

    Logo: {
        marginTop: 10,
    },
})