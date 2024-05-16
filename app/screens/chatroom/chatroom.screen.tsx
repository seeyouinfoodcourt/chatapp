import { View, StyleSheet, VirtualizedList, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { AppStackParamList } from '../../navigators/navigation.types';
import { ChatInput } from '../../components/chat.input';
import { ChatFeed } from '../../components/chat.feed';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { getMessages, sendMessage } from '../../services/firebase.service';
import { Message } from '../../types/app.types';

type ChatRoomScreenProps = {
    navigation: NavigationProp<AppStackParamList>;
    route: RouteProp<AppStackParamList>;
};

export const ChatRoomScreen = ({ route }: ChatRoomScreenProps) => {
    const { roomId } = route.params ?? {};
    const user = auth().currentUser;
    const [messages, setMessages] = useState<Message[]>([]);

    // Fetch messages with realtime changes
    useEffect(() => {
        const subscriber = firestore()
            .collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .onSnapshot(documentSnapshot => {
                const newDocs = documentSnapshot.docs.map(doc => ({
                    id: doc.id,
                    author: doc.data().author,
                    message: doc.data().message,
                    createdAt: doc.data().createdAt,
                }));

                console.log('newdocs', newDocs);

                setMessages(newDocs);
            });

        // Stop listening for updates when no longer required
        return () => subscriber();
    }, []);

    const handleSend = (message: string) => {
        const newMessage = {
            message: message,
            author: user?.displayName,
        };

        sendMessage(roomId, newMessage);
    };

    return (
        <View style={styles.container}>
            <View style={styles.footer}>
                <ChatInput onSend={handleSend} />
            </View>
            <View style={styles.chat}>
                <ChatFeed messages={messages} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column-reverse',
    },
    chat: {
        backgroundColor: 'green',
        flex: 1,
        padding: 8,
    },
    footer: {
        backgroundColor: 'orange',
        justifyContent: 'center',
        padding: 8,
    },
});
