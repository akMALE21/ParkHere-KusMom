import { FlatList, StyleSheet, View, Alert, TouchableOpacity, ScrollView, Image } from "react-native";
import { ActivityIndicator, TextInput, Button, FAB, IconButton, List, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";

export default function Payment() {
    const navigation = useNavigation();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

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
                    <Text style={styles.profileText}>Payment</Text>
                </View>
                <View style={styles.imageContainer}>

                </View>
            </View>

            <View style={styles.Payment}>
                <View style={styles.usePay}>
                    <Image
                        source={require('../../assets/img/gopay.png')}
                        style={{ width: 74, height: 42, marginLeft: 15, marginTop: 10 }}
                    />
                    <View style={{ flexDirection: "row", allignItems: "center" }}>
                        <Text style={{ marginTop: 20, fontSize: 10 }}>IDR</Text>
                        <Text style={{ marginTop: 20, fontSize: 18 }}>50.000</Text>
                    </View>
                </View>
            </View>
        </View>
        <View style={styles.mainContainer}>
            <Text style={styles.methodText}>Choose Payment Method</Text>
            <TouchableOpacity 
                    style={[styles.paymentOption, selectedOption === 1 ? styles.selectedOption : null]}
                    onPress={() => handleOptionSelect(1)}>
                    <Image
                        source={require('../../assets/img/gopay.png')}
                        style={{ width: 74, height: 42, marginLeft: 15, marginTop: 10 }}
                    />
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.paymentOption, selectedOption === 2 ? styles.selectedOption : null]}
                onPress={() => handleOptionSelect(2)}>
                <Image
                    source={require('../../assets/img/gopay.png')}
                    style={{ width: 74, height: 42, marginLeft: 15, marginTop: 10 }}
                />
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.paymentOption, selectedOption === 3 ? styles.selectedOption : null]}
                onPress={() => handleOptionSelect(3)}>
                <Image
                    source={require('../../assets/img/gopay.png')}
                    style={{ width: 74, height: 42, marginLeft: 15, marginTop: 10 }}
                />
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.paymentOption, selectedOption === 4 ? styles.selectedOption : null]}
                onPress={() => handleOptionSelect(4)}>
                <Image
                    source={require('../../assets/img/gopay.png')}
                    style={{ width: 74, height: 42, marginLeft: 15, marginTop: 10 }}
                />
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.paymentOption, selectedOption === 5 ? styles.selectedOption : null]}
                onPress={() => handleOptionSelect(5)}>
                <Image
                    source={require('../../assets/img/gopay.png')}
                    style={{ width: 74, height: 42, marginLeft: 15, marginTop: 10 }}
                />
            </TouchableOpacity>
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
            height: 250,
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
        },
        profileText: {
            color: "white",
            fontSize: 32,
            fontWeight: "bold",
        },
        imageContainer: {
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
        },
        Payment: {
            paddingTop: 50,
            margin: 20,
        },
        usePay: {
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "white",
            width: 360,
            height: 60,
            borderRadius: 16,
            marginLeft: 10,
            paddingHorizontal: 15,
        },
        mainContainer: {
            flex: 1,
            backgroundColor: "white",
            paddingHorizontal: 35,
            paddingTop: 60,
        },
        methodText: {
            fontFamily: "yu-gothic",
            color: "#464646",
            textAlign: "left",
            fontSize: 18,
            fontWeight: "semibold",
            paddingBottom: 30,
        },
        paymentOption: {
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "white",
            width: 350,
            height: 60,
            borderRadius: 16,
            paddingHorizontal: 15,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: "black",
        },
        selectedOption: {
            borderColor: "#5995F1",
        },
    }
);