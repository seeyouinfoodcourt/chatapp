import { View, Text, VirtualizedList, FlatList } from 'react-native';
import React from 'react';
import { ChatMessage } from './chat.message';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Message } from '../types/app.types';

type ChatFeedProps = {
    messages: Message[];
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
                    imageUri={item.imageUri}
                    author={item.author}
                    timeStamp={item.createdAt}
                />
            )}
        />
    );
};
