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

export default function Location() {
    const navigation = useNavigation();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    const handleLogout = () => {

        auth().signOut();
    }

    return <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            
        </View>
        <View style={styles.main}>
            
        </View>
        <View style={styles.component}>
            <View style={styles.comFill}>
                <View>
                    <Button
                        icon={({}) => (
                            <Image
                                source={require('../../assets/img/home.png')}
                                style={styles.comFillButton}
                            />)}
                            onPress={() => navigation.navigate("Home")}>
                    </Button>
                    <Text style={styles.comFilltext}>Home</Text>
                </View>
                <View >
                    <Button
                        icon={({}) => (
                            <Image
                                source={require('../../assets/img/qrcode.png')}
                                style={styles.comFillButton}
                            />)}
                            onPress={() => navigation.navigate("MyQR")}>
                    </Button>
                    <Text style={styles.comFilltext}>My QR</Text>
                </View>
                <View >
                    <Button
                        icon={({}) => (
                            <Image
                                source={require('../../assets/img/pmark.png')}
                                style={{width: 25, height: 25, marginLeft:-3, marginBottom:-10, tintColor: "white"}}
                                
                            />)}
                            onPress={() => navigation.navigate("Location")}>
                    </Button>
                    <Text style={styles.chooseComFillText}>Location</Text>
                </View>
                <View >
                    <Button
                        icon={({}) => (
                            <Image
                                source={require('../../assets/img/history.png')}
                                style={styles.comFillButton}
                            />)}
                            onPress={() => navigation.navigate("Kendaraan")}>
                    </Button>
                    <Text style={styles.comFilltext}>History</Text>
                </View>
            </View>
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgb(89, 149, 241)",
        flex: 1
    },
    header: {
        flex: 1,
        flexDirection: "column",
        
    },
    main: {
        flex: 5,
        backgroundColor: "#F8F8F8",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingBottom: 50
    },
    component: {
        flex: 1,
        position: "absolute",
        backgroundColor: "rgb(89, 149, 241)",
        width: 350, 
        height: 65, 
        borderRadius: 28, 
        right: 30,
        bottom: 40,
        
    },
    comFill: {
        marginLeft: 20,
        marginRight: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 2,
        
    },
    comFillButton: {
        width: 30, 
        height: 30, 
        marginLeft:-3, 
        marginBottom:-10, 
    },
    comFilltext: {
        fontSize: 10, 
        textAlign: "center",
        paddingBottom: 13,
        borderBottomColor: "white",
        width: 50,
        color: "#DEDEDE"
    },
    chooseComFillText: {
        fontSize: 10, 
        textAlign: "center",
        paddingBottom: 13,
        borderBottomColor: "white",
        width: 50,
        color: "#DEDEDE",
        borderBottomWidth: 3, 
        color: "white"
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})