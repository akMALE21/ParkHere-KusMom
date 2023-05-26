import { FlatList, StyleSheet, View, Alert, TouchableOpacity, ScrollView } from "react-native";
import { ActivityIndicator, TextInput, Button, FAB, IconButton, List, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import auth from '@react-native-firebase/auth';
import { useNavigation, useRoute} from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Image } from 'react-native';

export default function ProfileUpdate() {
    const navigation = useNavigation();
    const { user } = useAuth();
    const route = useRoute();
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState(route.params?.item?.fullName ?? "");
    const [username, setUsername] = useState(route.params?.item?.username?? "");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState(route.params?.item?.phoneNumber ?? "");

    const [title, setTitle] = useState(route.params?.item?.title ?? "");
    const [description, setDescription] = useState(route.params?.item?.description ?? "");
    const [errors, setErrors] = useState({});

    const validate = () => {

        const newErrors = {};

        if (!title) {
            newErrors.title = "Brand is required";
        } else if (title.length <= 3) {
            newErrors.title = "Title must be at least 4 characters";
        }
        if (!description) {
            newErrors.description = "Number is required";
        } else if (description.length <= 6) {
            newErrors.description = "Description must be at least 6 characters";
        }

        return newErrors;

    }

    const handleSubmit = async () => {
        console.log(user.uid, name, username, email, number)

        const findErrors = validate();
        
        if (Object.values(findErrors)?.some(value => value !== "")) {
        //     setErrors(findErrors);
        // } else {
            setLoading(true)
            
            try {
                if (route.params?.mode === "add") {
                    await firestore().collection("profile").add({
                        userId: user.uid,
                        fullName: name,
                        username,
                        email: user?.email,
                        phoneNumber: number,
                    });
                } else {
                    // await firestore().collection("profile").doc(route.params?.item?.id).set({
                    //     title: user.uid,
                    //     title,
                    //     description,
                    //     imageUrl,
                    //     updatedAt: firestore.FieldValue.serverTimestamp()
                    // }, { merge: true })
                    await firestore().collection("profile").add({
                        userId: user.uid,
                        fullName: name,
                        username,
                        email: user?.email,
                        phoneNumber: number,
                    });
                }
                // console.log("success")
                navigation.navigate("Home");
            } catch (e) {
                console.log("e", e)
            }
            setLoading(false);
        }
    }

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
                    value={user?.email}
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
                    mode="contained" onPress={handleSubmit}
                    style={styles.continueButtonHeight} 
                    labelStyle={styles.continueButtonLabel}>
                    {route.params?.mode === "add" ? "Add" : "Continue"}
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