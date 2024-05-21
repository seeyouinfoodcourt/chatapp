import {
    View,
    Text,
    FlatList,
    ScrollView,
    RefreshControl,
    StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/button';
import { useAuthContext } from '../../contexts/auth.context';
import { NavigationProp } from '@react-navigation/native';
import { AppStackParamList } from '../../navigators/navigation.types';
import firestore from '@react-native-firebase/firestore';
import { ChatListCard } from '../../components/chat.list.card';
import { sharedStyles } from '../../assets/styles/shared.styles';
import {
    getRooms,
    getToken,
    requestUserPermission,
} from '../../services/firebase.service';

type Room = {
    id: string;
    name: string;
    description: string;
};

type HomeScreenProps = {
    navigation: NavigationProp<AppStackParamList>;
};

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const { signOut } = useAuthContext();

    const [refreshing, setRefreshing] = useState(false);

    const fetchRooms = async () => {
        const rooms = await getRooms();
        const roomData = rooms.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
        }));
        setRefreshing(false);
        setRooms(roomData);
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const createDb = () => {
        const db = firestore();

        const mainCollectionRef = db.collection('rooms');
        const mainDocRef = mainCollectionRef.doc('room1'); // Replace 'someDocumentId' with your desired document ID

        // Step 2: Add a subcollection to the document
        mainDocRef
            .collection('messages')
            .add({
                id: 58745,
                author: 'Broder Salsa',
                message: 'Det er fedt',
                createdAt: '12:45',
            })
            .then(docRef => {
                console.log('Document written with ID: ', docRef.id);
            })
            .catch(error => {
                console.error('Error adding document: ', error);
            });
    };

    return (
        <SafeAreaView style={sharedStyles.container}>
            <FlatList
                style={styles.roomList}
                data={rooms}
                refreshing={refreshing}
                onRefresh={fetchRooms}
                renderItem={({ item }) => (
                    <ChatListCard
                        name={item.name}
                        description={item.description}
                        onPress={() =>
                            navigation.navigate('Chatroom', {
                                roomId: item.id,
                                name: item.name,
                            })
                        }
                    />
                )}
                keyExtractor={item => item.id}
            />
            <View>
                <Button title="Sigdfdfdt" onPress={() => getToken()} />
                <Button title="Sign out" onPress={signOut} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    roomList: {
        // borderWidth: 1,
    },
});
