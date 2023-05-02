import { FlatList, StyleSheet, View, Alert, TouchableOpacity } from "react-native";
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

export default function Home() {
    const navigation = useNavigation();
    const { user } = useAuth();

    const [loading, setLoading] = useState(true);

    const handleLogout = () => {

        auth().signOut();
    }

    return <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <View style={styles.navHeader}>
                <View style={styles.navLeft}>
                    <Image 
                        style={{width: 20, height: 32, marginLeft: 10}}
                        source={require('../../assets/img/logo2.png')} />
                    <Text style={{marginLeft: 10, fontSize: 22, fontWeight: "bold", color: "white"}}>ParkHere</Text>
                </View>
                <View style={styles.navRight}>
                    <Button
                        icon={({}) => (
                            <Image
                                source={require('../../assets/img/bell.png')}
                                style={{ width: 30, height: 30, marginRight: -50}}
                            />)}
                            onPress={() => navigation.navigate("Notif")}>
                    </Button>
                    <Button 
                        icon={({}) => (
                            <Image
                                source={require('../../assets/img/profile.jpg')}
                                style={{ width: 30, height: 30, borderRadius: 50}}
                            />)}
                            onPress={handleLogout}>
                    </Button>
                </View>
            </View>
            <View style={styles.hiHeader}>
                <Text style={{marginLeft: 10, fontSize: 20, fontWeight: "bold", color: "white"}}>Hi, {user?.email}!</Text>
            </View>
        </View>
        <View style={styles.main}>
            <View style={styles.Payment}>
                <Text style={{marginBottom: 10, fontSize: 15, fontWeight: "bold"}}>Payment</Text>
                <View style={styles.usePay}>
                    <Image
                        source={require('../../assets/img/gopay.png')}
                        style={{ width: 74, height: 42, marginLeft: 15, marginTop: 10}}
                    />
                    <View style={{flexDirection: "row", allignItems: "center"}}>
                        <Text style={{marginTop: 20, fontSize: 10}}>IDR</Text>
                        <Text style={{marginTop: 20, fontSize: 18}}>50.000</Text>
                        <IconButton style={{marginTop: 10}} icon="arrow-right-drop-circle"/>
                    </View>
                </View>
            </View>
            <View></View>
            <View></View>
            <View></View>
            <View></View>
        </View>
        <FAB
            onPress={() => navigation.navigate("Kendaraan")}
            style={styles.fabSatu}
            icon={"plus"}
        />
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
    navHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
    navLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    navRight: {
        flexDirection: "row",
        alignItems: "center",
    },
    hiHeader: {
        padding: 10,
        marginTop: 10,
    },
    main: {
        flex: 5,
        backgroundColor: "#F8F8F8",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    Payment: {
        margin: 20,
    },
    usePay: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white", 
        width: 350, 
        height: 59, 
        borderRadius: 16, 
        marginLeft: 10
    },
    buttonContainer: {
        marginTop: 20
    },
    title: {
        backgroundColor: "rgb(255, 255, 255)",
        color: theme.colors.primary
    },
    fabSatu: {
        position: "absolute",
        right: 40,
        bottom: 40
    },
    fabDua: {
        position: "absolute",
        left: 40,
        bottom: 80
    },
    actionBtns: {
        flexDirection: "row"
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})