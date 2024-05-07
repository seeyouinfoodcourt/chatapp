import { View, StyleSheet, VirtualizedList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { AppStackParamList } from '../../navigators/navigation.types';
import { ChatInput } from '../../components/chat.input';
import data from '../../data/mock.json';
import { ChatFeed } from '../../components/chat.feed';
import auth, { firebase } from '@react-native-firebase/auth';

type Message = {
    id: string;
    author: string;
    message: string;
    createdAt?: string;
};

type ChatRoomScreenProps = {
    navigation: NavigationProp<AppStackParamList>;
    route: RouteProp<AppStackParamList>;
};

export const ChatRoomScreen = ({ navigation, route }: ChatRoomScreenProps) => {
    const { roomId, name } = route.params ?? {};
    const user = auth().currentUser;
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const fetchMessages = async () => {
            const messages = await firebase
                .firestore()
                .collection('rooms')
                .doc(roomId)
                .collection('messages')
                .get();

            const messageData = messages.docs.map(doc => ({
                id: doc.id,
                author: doc.data().author,
                message: doc.data().message,
            }));

            setMessages(messageData);
        };
        fetchMessages();
    }, []);

    const sendMessage = (message: string) => {
        console.log(message);

        const newMessage = {
            id: 12,
            message: message,
            author: user?.displayName,
            timeStamp: '16:32',
        };

        const docRef = firebase
            .firestore()
            .collection('rooms')
            .doc(roomId)
            .collection('messages')
            .add(newMessage)
            .then(() => console.log('Message added'));

        // setMessages([...messages, newMessage]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.footer}>
                <ChatInput onSend={sendMessage} />
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
        // position: 'absolute',
        // bottom: 0,
        // width: '100%',
    },
});
