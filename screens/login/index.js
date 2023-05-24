import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput, IconButton} from "react-native-paper";
import auth from '@react-native-firebase/auth';

export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
  
    const handleChange = setField => text => {
      setField(text);
    };
  
    const handleLogin = async () => {
      try {
        await auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        console.log("error", e);
      }
    };
  
    const isEmailEmpty = email.trim() === '';
    const isPasswordEmpty = password === '';
  
    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };
  
    return (
    <View style={styles.container}>
        <View style={styles.formContainer}>
            <View style={styles.spaceAboveTitle} />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Welcome Back!</Text>
            </View>
            <View style={styles.subtitleContainer}>
                <Text style={styles.subtitle}>You've been missed.</Text>
            </View>
            <View style={styles.spaceBelowSubtitle} />
            <View style={styles.emailContainer}>
                <TextInput
                    style={styles.input}
                    mode="outlined"
                    placeholder="Email Address"
                    value={email}
                    onChangeText={handleChange(setEmail)}
                    autoFocus
                />
            </View>
            <View style={styles.spaceBetweenInputs} />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.input}
                    mode="outlined"
                    placeholder="Password"
                    value={password}
                    onChangeText={handleChange(setPassword)}
                    secureTextEntry={!passwordVisible}
                    right={
                        <TextInput.Icon
                        icon={passwordVisible ? "eye-off" : "eye"}
                        onPress={togglePasswordVisibility}
                        color="#000"
                        />
                    }
                />
            </View>
            <View style={styles.spaceBelowInputs} />
            <View style={styles.btnContainer}>
                <View style={styles.buttonLogin}>
                    <Button 
                        mode="contained" 
                        onPress={handleLogin} 
                        style={styles.loginButtonHeight} 
                        labelStyle={styles.signInButtonLabel}>
                        Sign In
                    </Button>
                </View>
                <Text style={styles.forget}>Forgot Password?</Text>
                <Text style={styles.registerText}>
                    Don't have an account?{" "}
                    <Text style={styles.registerLink} onPress={() => navigation.navigate("Register")}>
                        Register
                    </Text>
                </Text>
            </View>
        </View>
    </View>);
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "white"
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
        height: 80,
    },
    spaceBelowSubtitle: {
        height: 50,
    },
    emailContainer: {
      marginBottom: 10,
    },
    passwordContainer: {
      marginBottom: 20,
    },
    input: {
      borderColor: "black",
      backgroundColor: "white",
    },
    spaceBelowInputs: {
        height: 70,
    },
    btnContainer: {
      marginTop: 20,
    },
    loginButtonHeight: {
        height: 50,
        justifyContent: "center",
    },
    signInButtonLabel: {
        fontSize: 16,
    },
    forget: {
        marginTop: 10,
        alignSelf: "center",
        marginVertical: 4,
        fontFamily: "yu-gothic",
        color: "#464646",
        fontSize: 12,
        fontWeight: "semibold",
    },
    registerText: {
        marginTop: 30,
        color: "black",
        textAlign: "center",
    },
    registerLink: {
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
  }
);