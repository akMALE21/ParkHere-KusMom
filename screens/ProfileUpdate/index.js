import { FlatList, StyleSheet, View, Alert, TouchableOpacity, ScrollView } from "react-native";
import { ActivityIndicator, Appbar, Button, FAB, IconButton, List, Text } from "react-native-paper";
import theme from "../../config/theme";

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

    const handleLogout = () => {
        auth().signOut();
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>

            </View>
            <View style={styles.mainContainer}>
                 {/* Main content */}
            </View>
        </View>
    );
}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        headerContainer: {
            backgroundColor: "#5995F1",
            height: 150,
            justifyContent: "center",
            alignItems: "center",
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            elevation: 5,
          },
          mainContainer: {
            flex: 1,
            backgroundColor: "white",
            paddingHorizontal: 20,
            paddingTop: 20,
          },
    });