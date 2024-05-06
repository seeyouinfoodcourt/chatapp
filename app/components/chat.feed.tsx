import { View, Text, VirtualizedList } from 'react-native';
import React from 'react';
import { ChatMessage } from './chat.message';

type ItemData = {
    id: number;
    message: string;
    author: string;
    timeStamp: string;
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
            renderItem={({ item }) => (
                <ChatMessage
                    message={item.message}
                    author={item.author}
                    timeStamp={item.timeStamp}
                />
            )}
            keyExtractor={item => item.id.toString()}
            getItemCount={() => Object.keys(messages).length}
            getItem={getItem}
        />
    );
};
