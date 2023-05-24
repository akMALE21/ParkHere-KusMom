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
            <Text style={styles.profileText}>Profile</Text>
            <Text style={styles.editButton}>Edit</Text>
        </View>
        <View style={styles.mainContainer}>
            <View style={styles.nameContainer}>
                <TextInput
                    style={styles.input}
                    mode="outlined"
                    placeholder="Full Name"
                    value={name}
                    onChangeText={handleChange(setName)}
                    autoFocus
                />
            </View>
            <View style={styles.usernameContainer}>
                <TextInput
                    style={styles.input}
                    mode="outlined"
                    placeholder="Username"
                    value={username}
                    onChangeText={handleChange(setUsername)}
                    autoFocus
                />
            </View>
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
            <View style={styles.numberContainer}>
                <TextInput
                    style={styles.input}
                    mode="outlined"
                    placeholder="Phone Number"
                    value={email}
                    onChangeText={handleChange(setEmail)}
                    autoFocus
                />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text>Next</Text>
            
            </TouchableOpacity>
        </View>
        <View style={styles.circularShape}>
            <Text style={styles.circularText}>Upload Photo</Text>
        </View>
    </SafeAreaView>
}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        headerContainer: {
            backgroundColor: "#5995F1",
            height: 175,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: 80,
            paddingHorizontal: 20,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          },
        profileText: {
            color: "white",
            fontSize: 28,
            fontWeight: "bold",
        },
        editButton: {
            color: "white",
            fontSize: 18,
            marginRight: 16,
        },
        icon: {
            fontSize: 28,
        },
          mainContainer: {
            flex: 1,
            backgroundColor: "white",
            paddingHorizontal: 20,
            paddingTop: 20,
          },
        circularShape: {
            position: "absolute",
            backgroundColor: "#D9D9D9",
            width: 150,
            height: 150,
            borderRadius: 75,
            left: "50%",
            marginLeft: -75,
            top: "20%",
            justifyContent: "center",
            alignItems: "center",
        },
        circularText: {
            color: "black",
            fontSize: 14,
        },
    }
);