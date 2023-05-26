import { FlatList, StyleSheet, View, Alert } from "react-native";
import { ActivityIndicator, Appbar, Button, FAB, IconButton, List, Text } from "react-native-paper";
import theme from "../../config/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Image } from 'react-native';

export default function Kendaraan() {
    const navigation = useNavigation();
    const { user } = useAuth();

    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const subscriber = firestore()
        .collection("todos")
        .where("userId", "==", user?.uid).onSnapshot({
            error: (e) => console.error(e),
            next: (querySnapshot) => {
                const items = [];
    
                querySnapshot.forEach(documentSnapshot => {
                    items.push({
                        ...documentSnapshot.data(),
                        id: documentSnapshot.id,
                    });
                });
    
                setLoading(false);
                setItems(items);
            }
        });

        return () => subscriber();
    }, [])

    const handleDelete = item => e => {
        Alert.alert('Delete Confirmation', 'Are you sure want to delete this todo?', [
            {
                text: 'Cancel',
                onPress: () => { },
                style: 'cancel',
            },
            {
                text: 'Yes', onPress: async () => {

                    await firestore().collection("todos").doc(item.id).delete();

                }
            },
        ]);

    }

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
                    <Text style={styles.profileText}>Your Vehicles</Text>
                </View>
                <View style={styles.imageContainer}></View>
            </View>
        </View>
        {loading ?
        
            <View style={styles.loading}>
                <ActivityIndicator />
            </View>
            :
            <FlatList 
                data={items}
                removeClippedSubviews={false}
                renderItem={({ item }) => {

                    const { title, description } = item;
                    return <List.Item style={{borderRadius: 20, borderWidth: 1, borderColor: "rgb(89, 149, 241)" , margin: 10, backgroundColor: "white"}}
                        
                        left={props => <List.Icon {...props} icon="car-arrow-right" />}
                        title={title}
                        description={description}
                        right={props => <View {...props}>
                            <View style={styles.actionBtns}>
                                {/* <IconButton onPress={() => navigation.navigate("ToDoForm", {
                                    mode: "update",
                                    item
                                })} icon="eye" /> */}
                                <IconButton onPress={() => navigation.navigate("MyQR", {
                                    item
                                })} icon="eye" />
                                <IconButton
                                    onPress={handleDelete(item)}
                                    icon="delete" />
                            </View>
                        </View>}
                    />
                }}
            />}
        <View style={styles.component}>
            <Button 
                mode="contained" 
                icon = "plus-circle"
                onPress={() => navigation.navigate("ToDoForm", { mode: "add" })}
                style={styles.continueButtonHeight} 
                labelStyle={styles.continueButtonLabel}>
                New Vehicle
            </Button>
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F8F8F8",
        flex: 1
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
    buttonContainer: {
        marginTop: 20,
        top: 500,
    },
    title: {
        backgroundColor: "rgb(255, 255, 255)",
        color: theme.colors.primary
    },
    actionBtns: {
        flexDirection: "row"
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
        justifyContent: "center",
    },
    continueButtonHeight: {
        width: 350, 
        height: "100%", 
        justifyContent: "center",
    },
    continueButtonLabel: {
        fontSize: 20,
        marginVertical: 0,
        
    },
})