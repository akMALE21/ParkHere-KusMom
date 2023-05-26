import { FlatList, StyleSheet, View, Alert, TouchableOpacity, ScrollView } from "react-native";
import { ActivityIndicator, Appbar, Button, FAB, IconButton, List, Text, Divider, Menu } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { Image } from 'react-native';

export default function MyQR() {
    const navigation = useNavigation();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    return <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
            <View style={styles.headerContent}>
                <IconButton
                    icon={() => (
                        <MaterialCommunityIcons
                        name="arrow-left"
                        size={24}
                        color="white"
                        style={styles.icon}
                        />
                    )}
                    onPress={() => navigation.navigate("Home")}
                />
                <View style={styles.profileTextContainer}>
                    <Text style={styles.profileText}>Notification</Text>
                </View>
                <View style={styles.imageContainer}></View>
            </View>
        </View>
        
        <View style={styles.mainContainer}>
            <Text style={styles.titleText}>Today</Text>
                <View style={styles.historyContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require("../../assets/img/checklist.png")}
                            style={styles.paymentOptionImage}
                        />
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 3,}}>Payment Successful!</Text>
                        <Text style={{ fontSize: 12, paddingBottom: 10, color: "#B1B1B1",}}>Parking booking at Mall of Indonesia</Text>
                    </View>
                </View>
                <View style={{marginVertical: 10 }}></View>
                <View style={styles.historyContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require("../../assets/img/cross.png")}
                            style={styles.paymentOptionImage}
                        />
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 3,}}>Parking Booking Canceled</Text>
                        <Text style={{ fontSize: 12, paddingBottom: 10, color: "#B1B1B1",}}>You have canceled parking at Cibubur Junction</Text>
                    </View>
                </View>
            <Text style={styles.titleText}>Yesterday</Text>
                <View style={styles.historyContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require("../../assets/img/checklist.png")}
                            style={styles.paymentOptionImage}
                        />
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 3,}}>Verification Successful</Text>
                        <Text style={{ fontSize: 12, paddingBottom: 10, color: "#B1B1B1",}}>Account verification completed</Text>
                    </View>
                </View>
        </View>

        <View style={styles.component}>
            <View style={styles.comFill}>
                <View>
                    <Button
                        icon={({ }) => (
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
                        icon={({ }) => (
                            <Image
                                source={require('../../assets/img/qrcode.png')}
                                style={[styles.comFillButton, { tintColor: "white" }]}
                            />)}
                        onPress={() => navigation.navigate("MyQR")}>
                    </Button>
                    <Text style={styles.chooseComFillText}>My QR</Text>
                </View>
                <View >
                    <Button
                        icon={({ }) => (
                            <Image
                                source={require('../../assets/img/pmark.png')}
                                style={{ width: 25, height: 25, marginLeft: -3, marginBottom: -10 }}
                            />)}
                        onPress={() => navigation.navigate("Location")}>
                    </Button>
                    <Text style={styles.comFilltext}>Location</Text>
                </View>
                <View >
                    <Button
                        icon={({ }) => (
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
        flex: 1,
        backgroundColor: "#F8F8F8",
    },
    headerContainer: {
        backgroundColor: "#5995F1",
        height: 116,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    profileTextContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 20,
    },
    profileText: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
    },
    imageContainer: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    mainContainer: {
        flex: 1,
        backgroundColor: "#F8F8F8",
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    historyContainer: {
        flexDirection: "row",
        backgroundColor: "white",
        alignItems: "center",
        width: 370,
        height: 100,
    },
    imageContainer: {
        paddingLeft: 20,
    },
    descriptionContainer: {
        paddingTop: 5,
        paddingLeft: 20,
    },
    titleText: {
        paddingTop: 15,
        paddingBottom: 15,
        fontFamily: "yu-gothic",
        color: "black",
        fontSize: 18,
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
        marginLeft: -3,
        marginBottom: -10,
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
    },
})

