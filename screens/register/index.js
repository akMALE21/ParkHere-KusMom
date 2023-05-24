import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import auth from '@react-native-firebase/auth';

export default function Register() {
    const navigation = useNavigation()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);

    const handleChange = setField => text => {
        setField(text);
    };

    const handleRegister = async () => {
        if (password === repeatPassword) {
            try {
              await auth().createUserWithEmailAndPassword(email, password);
            } catch (error) {
              console.log("Registration error:", error);
            }
        } 
        else {
            console.log("Passwords do not match");
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleRepeatPasswordVisibility = () => {
        setRepeatPasswordVisible(!repeatPasswordVisible);
    };

    return <View style={styles.container}>
        <View style={styles.formContainer}>
            <View style={styles.spaceAboveTitle} />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Create New Account</Text>
                </View>
                <View style={styles.subtitleContainer}>
                    <Text style={styles.subtitle}>Let's explore new experience!</Text>
                </View>
                <View style={styles.spaceBelowSubtitle} />
                <View style={styles.emailContainer} >
                    <TextInput
                        style={styles.input}
                        value={email}
                        mode="outlined"
                        placeholder="Email Address"
                        onChangeText={handleChange(setEmail)}
                        autoFocus
                    />
                </View>
                <View style={styles.spaceBetweenInputs} />
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.input}
                        value={password}
                        mode="outlined"
                        placeholder="Password"
                        onChangeText={handleChange(setPassword)}
                        right={
                            <TextInput.Icon
                            icon={passwordVisible ? "eye-off" : "eye"}
                            onPress={togglePasswordVisibility}
                            color="#000"
                            />
                        }
                        secureTextEntry={!passwordVisible}
                    />
                </View>
                <View style={styles.spaceBetweenInputs} />
                <View style={styles.repeatPasswordContainer}>
                    <TextInput
                        style={styles.input}
                        value={repeatPassword}
                        mode="outlined"
                        onChangeText={handleChange(setRepeatPassword)}
                        placeholder="Repeat Password"
                        right={
                            <TextInput.Icon
                            icon={repeatPasswordVisible ? "eye-off" : "eye"}
                            onPress={toggleRepeatPasswordVisibility}
                            color="#000"
                            />
                        }
                        secureTextEntry={!repeatPasswordVisible}
                    />
                </View>
                <View style={styles.spaceBelowInputs} />
                <View style={styles.btnContainer}>
                <View style={styles.buttonLogin}>
                    <Button 
                        mode="contained" 
                        onPress={handleRegister} 
                        style={styles.registerButtonHeight} 
                        labelStyle={styles.registerButtonLabel}>
                        Register
                    </Button>
                </View>
                <Text style={styles.loginText}>
                    Already have an account?{" "}
                    <Text style={styles.loginLink} onPress={() => navigation.navigate("Login")}>
                        Login
                    </Text>
                </Text>
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
    },
    formContainer: {
        width: "85%",
        padding: 20,
        marginTop: 8,
    },
    titleContainer: {
        alignSelf: "flex-start",
    },
    subtitleContainer: {
        alignSelf: "flex-start",
        marginBottom: 20,
    },
    spaceAboveTitle: {
          height: 70,
    },
    spaceBelowSubtitle: {
          height: 50,
    },
    emailContainer: {
        marginBottom: 10,
    },
    passwordContainer: {
        marginBottom: 10,
    },
    repeatPasswordContainer: {
        marginBottom: 20,
    },
    input: {
        borderColor: "black",
        backgroundColor: "white",
    },
    spaceBetweenInputs: {
        height: 5,
    },
    spaceBelowInputs: {
        height: 30,
    },
    btnContainer: {
        marginTop: 20
    },
    registerButtonHeight: {
        height: 50,
        justifyContent: "center",
    },
    registerButtonLabel: {
        fontSize: 16,
    },
    loginText: {
        marginTop: 30,
        color: "black",
        textAlign: "center",
    },
    loginLink: {
        color: "#5995F1",
    },
    title: {
        fontFamily: "Inter",
        color: "#212121",
        textAlign: "left",
        fontSize: 32,
        fontWeight: "bold"
    },
    subtitle: {
        fontFamily: "yu-gothic",
        color: "#464646",
        textAlign: "left",
        fontSize: 18,
        fontWeight: "semibold"
    },
})