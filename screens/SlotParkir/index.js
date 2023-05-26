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
    const [selectedSlot, setSelectedSlot] = useState(0);

    const handleOptionSelect = (option) => {
        setSelectedSlot(option);
    };

    const getSlotImage = () => {
        switch (selectedSlot) {
            case 0:
                return require("../../assets/img/slotBasement.png");
            case 1:
                return require("../../assets/img/floor1.png");
            case 2:
                return require("../../assets/img/floor2.png");
            default:
                return null;
        }
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
                    <Text style={styles.profileText}>Yogya Riau Junction</Text>
                </View>
                <View style={styles.imageContainer}></View>
            </View>
        </View>

        <View style={styles.mainContainer}>
            <View style={styles.floorPlan}>
                <ScrollView horizontal style={styles.cardSlot}>
                    <TouchableOpacity
                            style={[
                                styles.slot,
                                selectedSlot === 0 && styles.selectedSlot,
                            ]}
                            onPress={() => handleOptionSelect(0)}
                        >
                            <Text
                                style={[
                                    styles.slotText,
                                    selectedSlot === 0 && styles.selectedSlotText,
                                ]}
                            >
                                Basement
                            </Text>
                        </TouchableOpacity>
                        <View style={{ paddingRight: 20 }}></View>
                        <TouchableOpacity
                            style={[
                                styles.slot,
                                selectedSlot === 1 && styles.selectedSlot,
                            ]}
                            onPress={() => handleOptionSelect(1)}
                        >
                            <Text
                                style={[
                                    styles.slotText,
                                    selectedSlot === 1 && styles.selectedSlotText,
                                ]}
                            >
                                1st Floor
                            </Text>
                        </TouchableOpacity>
                        <View style={{ paddingRight: 20 }}></View>
                        <TouchableOpacity
                            style={[
                                styles.slot,
                                selectedSlot === 2 && styles.selectedSlot,
                            ]}
                            onPress={() => handleOptionSelect(2)}
                        >
                            <Text
                                style={[
                                    styles.slotText,
                                    selectedSlot === 2 && styles.selectedSlotText,
                                ]}
                            >
                                2nd Floor
                            </Text>
                        </TouchableOpacity>
                </ScrollView>
            </View>
            <View style={styles.imageSlot}>
                <Image
                    source={getSlotImage()}
                    style={styles.slotImage}
                />
            </View>
            <View style={styles.slotDescription}>
                <Image
                    source={require("../../assets/img/selection.png")}
                    style={styles.slotDescriptionImage}
                />
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
            fontSize: 22,
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
            backgroundColor: "white",
            paddingHorizontal: 35,
            paddingTop: 30,
        },
        floorPlan: {
            flexDirection: "row",
            justifyContent: "space-between",
        },
        slot: {
            backgroundColor: "white",
            borderColor: "#5995F1",
            borderWidth: 1,
            height: 40,
            width: 120,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
        },
        slotText: {
            color: "#5995F1",
            fontWeight: "bold",
        },
        selectedSlot: {
            backgroundColor: "#5995F1",
            height: 40,
            width: 120,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
        },
        selectedSlotText: {
            color: "white",
            fontWeight: "bold",
        },
        imageSlot: {
            paddingTop: 50,
        },
        slotImage: {
            width: 318,
            height: 447,
        },
        slotDescription: {
            paddingTop: 50,
            alignItems: "center",
            justifyContent: "center",
        }
    }
);