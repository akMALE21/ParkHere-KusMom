import { FlatList, StyleSheet, View, Alert } from "react-native";
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
        <Appbar>
            <Appbar.Content title="My QR" />
        </Appbar>
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
                    return <List.Item
                        
                        left={props => <List.Icon {...props} icon="checkbox-blank-circle" />}
                        title={title}
                        description={description}
                        right={props => <View {...props}>
                            <View style={styles.actionBtns}>
                                <IconButton onPress={() => navigation.navigate("ToDoForm", {
                                    mode: "update",
                                    item
                                })} icon="pencil" />
                                <IconButton
                                    onPress={handleDelete(item)}
                                    icon="delete" />
                            </View>
                        </View>}
                    />
                }}
            />}
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
                                style={[styles.comFillButton, {tintColor: "white"}]}
                            />)}
                            onPress={() => navigation.navigate("MyQR")}>
                    </Button>
                    <Text style={styles.chooseComFillText}>My QR</Text>
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
                            onPress={() => navigation.navigate("Kendaraan")}>
                    </Button>
                    <Text style={styles.comFilltext}>History</Text>
                </View>
            </View>
        </View>
        <FAB
            onPress={() => navigation.navigate("ToDoForm", { mode: "create" })}
            style={styles.fab}
            icon={"plus"}
        />
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1
    },
    buttonContainer: {
        marginTop: 20
    },
    title: {
        backgroundColor: "rgb(255, 255, 255)",
        color: theme.colors.primary
    },
    fab: {
        position: "absolute",
        right: 40,
        bottom: 120,
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
})