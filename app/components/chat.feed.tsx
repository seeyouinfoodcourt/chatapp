import { View, Text, VirtualizedList, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ChatMessage } from './chat.message';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Message } from '../types/app.types';
import firestore from '@react-native-firebase/firestore';

type ChatFeedProps = {
    roomId: string;
};

export const ChatFeed = ({ roomId }: ChatFeedProps) => {
    const [messages, setMessages] = useState<Message[]>([]);

    // Fetch messages with realtime changes
    useEffect(() => {
        const subscriber = firestore()
            .collection('rooms')
            .doc(roomId)
            .collection('messages')
            .limit(5)
            .orderBy('createdAt', 'desc')
            .onSnapshot(documentSnapshot => {
                const newDocs = documentSnapshot.docs.map(doc => ({
                    id: doc.id,
                    author: doc.data().author,
                    imageUri: doc.data().imageUri,
                    message: doc.data().message,
                    createdAt: doc.data().createdAt,
                }));

                setMessages(newDocs);
            });

        // Stop listening for updates when no longer required
        return () => subscriber();
    }, []);

    return (
        <FlatList
            data={messages}
            // onRefresh={() => console.log()}
            // refreshing
            initialNumToRender={10}
            inverted
            renderItem={({ item }) => (
                <ChatMessage
                    message={item.message}
                    imageUri={item.imageUri}
                    author={item.author}
                    timeStamp={item.createdAt}
                />
            )}
        />
    );
};
