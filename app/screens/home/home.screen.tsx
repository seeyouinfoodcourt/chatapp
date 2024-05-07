import { View, Text, FlatList } from 'react-native';
import auth from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/button';
import { useAuthContext } from '../../contexts/auth.context';
import { NavigationProp } from '@react-navigation/native';
import { AppStackParamList } from '../../navigators/navigation.types';
import firestore from '@react-native-firebase/firestore';
import { ChatListCard } from '../../components/chat.list.card';

type Room = {
    id: string;
    name: string;
};

type HomeScreenProps = {
    navigation: NavigationProp<AppStackParamList>;
};

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const user = auth().currentUser;
    const { signOut } = useAuthContext();

    useEffect(() => {
        const fetchRooms = async () => {
            const rooms = await firestore().collection('rooms').get();
            const roomData = rooms.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
            }));

            setRooms(roomData);
        };

        fetchRooms();
    }, []);

    useEffect(() => {
        console.log(rooms);
    }, [rooms]);

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
        <SafeAreaView>
            <FlatList
                data={rooms}
                renderItem={({ item }) => (
                    <ChatListCard
                        name={item.name}
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
                <Text>HomeScreen</Text>
                <Text>Email: {user?.email}</Text>
                <Button title="Sign out" onPress={signOut} />
                <Button title="gsfd" onPress={createDb} />
            </View>
        </SafeAreaView>
    );
};
