import { FlatList, StyleSheet, View, Alert, TouchableOpacity, ScrollView } from "react-native";
import { ActivityIndicator, Appbar, Button, FAB, IconButton, List, Text, Divider, Menu } from "react-native-paper";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../../config/theme";
import RNPickerSelect from "react-native-picker-select";
import DropdownPicker from 'react-native-dropdown-picker';


import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Image } from 'react-native';

export default function MyQR() {
    const navigation = useNavigation();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState(null);

    const data = [
        { label: 'Mercedes G 63', value: '1' },
        { label: 'Ford F350', value: '2' },
        { label: 'Honda Xmax', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ];

    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
                {item.value === value && (
                    <AntDesign
                        style={styles.icon}
                        color="black"
                        name="Safety"
                        size={20}
                    />
                )}
            </View>
        );
    };

    return <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
            <View style={styles.headerContent}>
                <View style={styles.profileTextContainer}>
                    <Text style={styles.profileText}>My QR</Text>
                </View>
            </View>
        </View>
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select Vehicle"
            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
                setValue(item.value);
            }}
            renderLeftIcon={() => (
                <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            )}
            renderItem={renderItem}
        />
        <View style={styles.main}>
            <View style={styles.box}>
                <View style={styles.boxQR}>
                    <View style={{ alignItems: "center", marginTop: 10 }}>
                        <Text style={styles.boxQRText}>
                            Scan this on the scanner machine when you are in the parking lot
                        </Text>
                        <Image
                            source={require("../../assets/img/frameqr.png")}
                            style={styles.imageQR}
                        />
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", width: "100%", overflow: "hidden" }}>
                        <View style={{ backgroundColor: "#F8F8F8", borderRadius: 100, width: 30, height: 30, left: -14, bottom: -10 }} />
                        <View style={{ backgroundColor: "#F8F8F8", borderRadius: 100, width: 30, height: 30, right: -14, bottom: -10 }} />
                    </View>
                </View>
                <View style={{ borderBottomWidth: 1, borderStyle: "dashed", height: 1, width: 330, alignSelf: "center" }}>
                </View>
                <View style={styles.boxKet}>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", width: "100%", overflow: "hidden" }}>
                        <View style={{ backgroundColor: "#F8F8F8", borderRadius: 100, width: 30, height: 30, left: -14,  top: -10}} />
                        <View style={{ backgroundColor: "#F8F8F8", borderRadius: 100, width: 30, height: 30, right: -14, top: -10}} />
                    </View>
                    <View style={{ alignItems: "center", top: -10}}>
                        <View style={styles.boxAtas}>
                            <View style={styles.boxKiri}>
                                <View style={styles.boxJudul}>
                                    <Text style={styles.boxQRJudul}>
                                        Vehicle Number
                                    </Text>
                                </View>
                                <View style={styles.boxIsi}>
                                    <Text style={styles.boxQRIsi}>
                                        D 100 AF
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.boxKanan}>
                                <View style={styles.boxJudul}>
                                    <Text style={styles.boxQRJudul}>
                                        STNK NUMBER
                                    </Text>
                                </View>
                                <View style={styles.boxIsi}>
                                    <Text style={styles.boxQRIsi}>
                                        11245688
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.boxBawah}>
                            <View style={styles.boxKiri}>
                                <View style={styles.boxJudul}>
                                    <Text style={styles.boxQRJudul}>
                                        Brand
                                    </Text>
                                </View>
                                <View style={styles.boxIsi}>
                                    <Text style={styles.boxQRIsi}>
                                        Mercedes G 63
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.boxKanan}>
                                <View style={styles.boxJudul}>
                                    <Text style={styles.boxQRJudul}>
                                        Type
                                    </Text>
                                </View>
                                <View style={styles.boxIsi}>
                                    <Text style={styles.boxQRIsi}>
                                        Car
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    

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
        height: 166,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    profileTextContainer: {
        marginBottom: 50,
    },
    profileText: {
        color: "white",
        fontSize: 32,
        fontWeight: "bold",
    },
    dropdown: {
        bottom: 50,
        posistion: "absolute",
        left: 30,
        bottom: 25,
        height: 50,
        width: 350,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    main: {
        flex: 1,
        backgroundColor: "#F8F8F8",
    },
    box: {
        flex: 1,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        paddingBottom: 120,
        height: 2,
    },
    boxQR: {
        flex: 2,
        backgroundColor: "white",
        alignItems: "center",
        borderRadius: 25,
    },
    boxQRText: {
        color: "black",
        fontSize: 18,
        fontWeight: "medium",
        textAlign: "center",
        width: 280,
        margin: 15,
    },
    imageQR: {
        width: 226,
        height: 226,
        marginTop: 15,
    },
    boxKet: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 25,
        justifyContent: "center",
    },
    boxAtas: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    boxKiri: {
        width: 150,
        height: 70,
        justifyContent: "center",
        marginLeft: 20
    },
    boxKanan: {
        width: 150,
        height: 70,
        justifyContent: "center",
        marginRight: 15
    },
    boxBawah: {
        flexDirection: "row",
        justifyContent: "space-between",

    },
    boxJudul: {
        marginBottom: 3
    },
    boxQRJudul: {
        color: "black",
        fontSize: 18,
        fontWeight: "medium",
    },
    boxQRIsi: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
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

