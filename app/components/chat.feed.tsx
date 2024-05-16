import { View, Text, VirtualizedList } from 'react-native';
import React from 'react';
import { ChatMessage } from './chat.message';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

type ItemData = {
    id: string;
    message: string;
    author: string;
    createdAt: FirebaseFirestoreTypes.Timestamp;
};

type ChatFeedProps = {
    messages: ItemData[];
};

export const ChatFeed = ({ messages }: ChatFeedProps) => {
    const getItem = (_data: unknown, index: number): ItemData =>
        messages[index];
    return (
        <VirtualizedList
            initialNumToRender={4}
            inverted={true}
            renderItem={({ item }) => (
                <ChatMessage
                    message={item.message}
                    author={item.author}
                    timeStamp={item.createdAt}
                />
            )}
            keyExtractor={item => item.id.toString()}
            getItemCount={() => Object.keys(messages).length}
            getItem={getItem}
        />
    );
};
