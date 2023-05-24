import { FlatList, StyleSheet, View, Alert, TouchableOpacity, ScrollView } from "react-native";
import { ActivityIndicator, TextInput, Button, FAB, IconButton, List, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Image } from 'react-native';

export default function ProfileUpdate() {
    const navigation = useNavigation();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");

    const handleChange = setField => text => {
        setField(text);
    };
    const handleLogout = () => {
        auth().signOut();
    }

    return <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
            <IconButton
                icon={() => (
                    <MaterialCommunityIcons
                    name="arrow-left"
                    size={24}
                    color="white"
                    style={styles.icon}
                    />
                )}
                onPress={handleLogout}
            />
            <View style={styles.profileTextContainer}>
                <Text style={styles.profileText}>Profile</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image
                    source={require("../../assets/img/logo2.png")}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
        </View>

        <View style={styles.mainContainer}>
            <Text style={styles.titleText}>Full Name</Text>
            <View style={styles.nameContainer}>
                <TextInput
                    style={styles.input}
                    mode="outlined"
                    placeholder=""
                    value={name}
                    onChangeText={handleChange(setName)}
                    autoFocus
                />
            </View>
            <Text style={styles.titleText}>Username</Text>
            <View style={styles.usernameContainer}>
                <TextInput
                    style={styles.input}
                    mode="outlined"
                    placeholder=""
                    value={username}
                    onChangeText={handleChange(setUsername)}
                    autoFocus
                />
            </View>
            <Text style={styles.titleText}>Email</Text>
            <View style={styles.emailContainer}>
                <TextInput
                    style={styles.input}
                    mode="outlined"
                    placeholder=""
                    value={email}
                    onChangeText={handleChange(setEmail)}
                    autoFocus
                />
            </View>
            <Text style={styles.titleText}>Phone Number</Text>
            <View style={styles.numberContainer}>
                <View style={styles.imageNumberContainer}>
                    <Image
                        source={require("../../assets/img/phone_number.png")}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>
                <TextInput
                    style={styles.input}
                    mode="outlined"
                    placeholder=""
                    value={number}
                    onChangeText={handleChange(setNumber)}
                    autoFocus
                />
            </View>
            <View style={styles.buttonContinue}>
                <Button 
                    mode="contained" 
                    onPress={() => navigation.navigate("Home")}
                    style={styles.continueButtonHeight} 
                    labelStyle={styles.continueButtonLabel}>
                    Continue
                </Button>
            </View>
        </View>
    </SafeAreaView>
}
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "white",
        },
        headerContainer: {
            backgroundColor: "#5995F1",
            height: 100,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
        },
        profileTextContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        profileText: {
            color: "white",
            fontSize: 28,
            fontWeight: "bold",
        },
        imageContainer: {
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
        },
        image: {
            flex: 1,
            width: "100%",
            height: "100%",
        },
        icon: {
            fontSize: 28,
        },
        mainContainer: {
            flex: 1,
            backgroundColor: "white",
            paddingHorizontal: 20,
            paddingTop: 70,
        },
        titleText: {
            paddingTop: 15,
            paddingBottom: 15,
            fontFamily: "yu-gothic",
            color: "#AEAEB2",
        },
        buttonContinue: {
            marginTop: 70,
        },
        continueButtonHeight: {
            height: 60,
            justifyContent: "center",
        },
        continueButtonLabel: {
            fontSize: 16,
        },
    }
);