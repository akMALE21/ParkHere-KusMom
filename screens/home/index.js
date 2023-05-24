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
                            onPress={() => navigation.navigate("ProfileUpdate")}>
                    </Button>
                </View>
            </View>
            <View style={styles.hiHeader}>
                <Text style={{marginLeft: 10, fontSize: 20, fontWeight: "bold", color: "white"}}>Hi, {user?.email}!</Text>
            </View>
        </View>
        <View style={styles.main}>
            <ScrollView>
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
                <View style={styles.Promotions}>
                    <Text style={{marginBottom: 10, fontSize: 15, fontWeight: "bold"}}>Promotions</Text>
                    <View style={{marginLeft:-5}}>
                        <Image
                            source={require('../../assets/img/promo.png')}
                            style={{ width: 350, height: 170, marginLeft: 15, marginTop: 10}}
                        />
                    </View>
                </View>
                <View style={styles.Nearby}>
                    <View style={styles.NearSpace}>
                        <Text style={{marginBottom: 10, fontSize: 15, fontWeight: "bold"}}>Parking Nearby</Text>
                        <TouchableOpacity>
                            <Text style={{marginBottom: 10, fontSize: 14, color:"rgb(89, 149, 241)"}}>View all</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal style={styles.cardParkir}>
                            <Image
                                source={require('../../assets/img/cardPark.png')}
                                style={{ width: 234, height: 124, marginLeft: -4}}
                            /> 
                            <Image
                                source={require('../../assets/img/cardPark2.png')}
                                style={{ width: 245, height: 135, marginLeft: -4}}
                            /> 
                            <Image
                                source={require('../../assets/img/cardPark3.png')}
                                style={{ width: 245, height: 135, marginLeft: -4}}
                            /> 
                    </ScrollView>
                </View>
                <View style={styles.Vehicles}>
                    <View style={styles.NearSpace}>
                        <Text style={{marginBottom: 10, fontSize: 15, fontWeight: "bold"}}>Parking Nearby</Text>
                        <TouchableOpacity>
                            <Text style={{marginBottom: 10, fontSize: 14, color:"rgb(89, 149, 241)"}}>View all</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal style={styles.cardVehicles}>
                            <Image
                                source={require('../../assets/img/cardV1.png')}
                                style={{ width: 225, height: 105, marginLeft: -4, marginRight: 5}}
                            /> 
                            <Image
                                source={require('../../assets/img/cardV2.png')}
                                style={{ width: 225, height: 105, marginLeft: -4, marginRight: 5}}
                            /> 
                            <Image
                                source={require('../../assets/img/cardV3.png')}
                                style={{ width: 225, height: 105, marginLeft: -4}}
                            /> 
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
        <View style={styles.component}>
            <View style={styles.comFill}>
                <View>
                    <Button
                        icon={({}) => (
                            <Image
                                source={require('../../assets/img/home.png')}
                                style={[styles.comFillButton, {tintColor: "white"}]}
                            />)}
                            onPress={() => navigation.navigate("Home")}>
                    </Button>
                    <Text style={styles.chooseComFillText}>Home</Text>
                </View>
                <View >
                    <Button
                        icon={({}) => (
                            <Image
                                source={require('../../assets/img/qrcode.png')}
                                style={styles.comFillButton}
                            />)}
                            onPress={() => navigation.navigate("Kendaraan")}>
                    </Button>
                    <Text style={styles.comFilltext}>My QR</Text>
                </View>
                <View >
                    <Button
                        icon={({}) => (
                            <Image
                                source={require('../../assets/img/pmark.png')}
                                style={{width: 25, height: 25, marginLeft:-3, marginBottom:-10}}
                            />)}
                            onPress={() => navigation.navigate("Location")}>
                    </Button>
                    <Text style={styles.comFilltext}>Location</Text>
                </View>
                <View >
                    <Button
                        icon={({}) => (
                            <Image
                                source={require('../../assets/img/history.png')}
                                style={styles.comFillButton}
                            />)}
                            onPress={() => navigation.navigate("history")}>
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
    Promotions: {
        marginLeft: 20,
    },
    Nearby: {
        marginLeft: 20,
        marginRight: 35,
    },
    NearSpace: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cardParkir: {
        backgroundColor: "#F8F8F8",
        height: 102, 
        borderRadius: 16, 
        marginLeft: 10
    },
    Vehicles: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 35,
    },
    cardVehicles: {
        backgroundColor: "#F8F8F8",
        height: 74, 
        borderRadius: 16, 
        marginLeft: 10
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