import { FlatList, StyleSheet, View, Alert, TouchableOpacity, ScrollView, TextInput, Modal, SafeAreaView } from "react-native";
import { ActivityIndicator, Appbar, Button, FAB, IconButton, List, Text } from "react-native-paper";

import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";

import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";  
import { Image } from 'react-native';

export default function Location() {
    const navigation = useNavigation();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [showNestedPopup, setShowNestedPopup] = useState(false);

    const handleSearch = () => {
        // Handle search functionality
        console.log("Search Text : ", searchText);
    }
    
    const handleImagePress = () => {
        setShowPopup(true);
    };
    
    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleOpenNestedPopup = () => {
        setShowNestedPopup(true);
    };
    
    const handleCloseNestedPopup = () => {
        setShowNestedPopup(false);
    };

    return <View style={styles.container}>
        <View style={styles.main}>
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Where To Park"
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <IconButton
                    icon="magnify"
                    color="#"
                    onPress={handleSearch}
                />
            </View>
            <TouchableOpacity onPress={handleImagePress} style={styles.mainImage}>
                <Image
                    source={require("../../assets/img/locationImage.png")}
                    style={styles.locationImage}
                />
            </TouchableOpacity>
        </View>

        <Modal
            visible={showPopup}
            animationType="none"
            transparent={true}
            onRequestClose={handleClosePopup}
            >
            <TouchableOpacity
            style={styles.popupContainer}
            activeOpacity={1}
            onPress={handleClosePopup}
            >
            <View style={styles.popupContent}>
                <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', }}>Yogya Riau Junction</Text>
                <IconButton
                    icon="chevron-right"
                    color="#FFFFFF"
                    width={20}
                    style={styles.rightArrowIcon}
                    onPress={handleOpenNestedPopup}
                />
            </View>
            </TouchableOpacity>
        </Modal>

        <Modal
            visible={showNestedPopup}
            animationType="slide"
            transparent={true}
            onRequestClose={handleCloseNestedPopup}>
            
            <TouchableOpacity
                style={styles.nestedPopupContainer}
                activeOpacity={1}
                onPress={handleCloseNestedPopup}>
                <View style={styles.nestedPopupContent}>
                    <View style={styles.nestedPopupContentHeader}>
                        <Text style={{ fontSize: 32, fontWeight: 'bold',}}>About</Text>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderStyle: "dashed", height: 1, width: 370, alignSelf: "center", borderBottomColor: "#D9D9D9", }}></View>
                    <View style={styles.nestedPopupContentImage}>
                        <Image
                            source={require("../../assets/img/parkiran.png")}
                            style={styles.locationContentImage}
                        />
                    </View>
                    <View style={styles.nestedPopupContentDetail}>
                        <Text style={{ fontSize: 28, fontWeight: 'bold', paddingBottom: 3,}}>Yogya Riau Junction</Text>
                        <Text style={{ fontSize: 22, paddingBottom: 10, color: "#B1B1B1",}}>Jl. LLRE Martadinata, Citaurm</Text>
                    </View>
                    <View style={styles.nestedPopupContentDetailButton}>
                        <Button 
                            mode="contained" 
                            onPress={() => navigation.navigate("SlotParkir")}
                            style={styles.detailButtonHeight} 
                            labelStyle={styles.detailButtonLabel}>
                            Detail
                        </Button>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
        
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
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    main: {
        flex: 5,
        backgroundColor: "#F8F8F8",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingBottom: 50
    },
    searchBar: {
        position: "absolute",
        top: 70,
        left: 20,
        right: 20,
        height: 50,
        backgroundColor: "white",
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        zIndex: 1,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
    },
    mainImage: {
        position: "relative",
        marginTop: 100,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 0,
    },
    popupContainer: {
        position: 'absolute',
        top: 220, // Adjust the top position as needed
        left: 120, // Adjust the left position as needed
        justifyContent: 'center',
        alignItems: 'center',
    },
    popupContent: {
        backgroundColor: '#3277D8',
        paddingLeft: 40,
        borderRadius: 200,
        borderBottomLeftRadius: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightArrowIcon: {
        marginLeft: 10,
        color: "white",
    },
    nestedPopupContainer: {
        flex: 1,
        backgroundColor: "white",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "60%", // Adjust the height as needed
      },
    nestedPopupContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 50, // Adjust the padding as needed
    },
    nestedPopupContentHeader: {
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: "center",
    },
    nestedPopupContentImage: {
        paddingTop : 20,
        alignItems: "center",
    },
    locationContentImage: {
        width: 370,
        height: 175,
    },

    nestedPopupContentDetail: {
        paddingTop: 20,
        paddingBottom: 20,
    },
    detailButtonHeight: {
        height: 50,
        justifyContent: "center",
    },
    detailButtonLabel: {
        fontSize: 16,
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