import { View, Text, VirtualizedList, FlatList } from 'react-native';
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
                    author={item.author}
                    timeStamp={item.createdAt}
                />
            )}
        />
    );
};
