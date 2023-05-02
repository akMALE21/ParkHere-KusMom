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

    const handleLogout = () => {

        auth().signOut();
    }

    return <SafeAreaView style={styles.container}>
        <Appbar>
            <Appbar.Content title="Your To Do" />
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
        <FAB
            onPress={() => navigation.navigate("ToDoForm", { mode: "create" })}
            style={styles.fabSatu}
            icon={"plus"}
        />
        <FAB
            onPress={() => navigation.navigate("Home")}
            style={styles.fabDua}
            icon={"minus"}
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
    fabSatu: {
        position: "absolute",
        right: 40,
        bottom: 40
    },
    fabDua: {
        position: "absolute",
        left: 40,
        bottom: 40
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