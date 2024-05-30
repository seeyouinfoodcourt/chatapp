import { View, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/button';
import { useAuthContext } from '../../contexts/auth.context';
import { NavigationProp } from '@react-navigation/native';
import { AppStackParamList } from '../../navigators/navigation.types';
import { ChatListCard } from '../../components/chat.list.card';
import { sharedStyles } from '../../assets/styles/shared.styles';
import { getRooms } from '../../services/firebase.service';
import { Room } from '../../types/app.types';
import { Header } from '../../components/header';

type HomeScreenProps = {
    navigation: NavigationProp<AppStackParamList>;
};

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const { signOut } = useAuthContext();
    const [refreshing, setRefreshing] = useState(true);

    const fetchRooms = async () => {
        const rooms = await getRooms();
        const roomData = rooms.docs.map(doc => ({
            id: doc.id,
            imageUrl: doc.data().imageUrl,
            name: doc.data().name,
            description: doc.data().description,
        }));
        console.log(roomData);
        setRefreshing(false);
        setRooms(roomData);
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <SafeAreaView style={sharedStyles.container}>
            <FlatList
                data={rooms}
                refreshing={refreshing}
                onRefresh={fetchRooms}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <ChatListCard
                        room={item}
                        onPress={() =>
                            navigation.navigate('Chatroom', {
                                roomId: item.id,
                                name: item.name,
                            })
                        }
                    />
                )}
            />
            <View>
                <Button title="Sign out" onPress={signOut} />
            </View>
        </SafeAreaView>
    );
};
