import { ActivityIndicatorBase, Alert, FlatList, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ChatMessage } from './chat.message';
import { Message } from '../types/app.types';
import { ActivityIndicator } from 'react-native';
import { getMessages, loadNext } from '../services/firebase.service';

type ChatFeedProps = {
    roomId: string;
};

export const ChatFeed = ({ roomId }: ChatFeedProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [lastMessage, setLastMessage] = useState<Message>();
    const [refreshing, setRefreshing] = useState(false);

    const onEndReached = async () => {
        console.log('end reached. - Last doc', lastMessage?.message);

        if (lastMessage) {
            setRefreshing(true);

            const result = await loadNext(roomId, lastMessage);

            console.log('loadmore', !!result);
            if (result.length > 0) {
                setMessages(prevState => [...prevState, ...result]);
            } else {
                // Alert the user when reaching the end of data - it's not pretty i know
                Alert.alert('No more data');
            }
            setRefreshing(false);
        }
    };

    const setInitialMessages = async () => {
        const initialMessages = await getMessages(roomId);
        setMessages(initialMessages);
    };

    // Load initial messages
    useEffect(() => {
        console.log('load initial');

        setInitialMessages();
    }, []);

    // Update last message
    useEffect(() => {
        console.log('messages updated');
        const lastMessage = messages[messages.length - 1];
        setLastMessage(lastMessage);
    }, [messages]);

    useEffect(() => {
        console.log('lastMessage', lastMessage?.message);
    }, [lastMessage]);

    return (
        <FlatList
            data={messages}
            ListFooterComponent={
                <ActivityIndicator
                    animating={refreshing}
                    style={{ flex: 1, marginVertical: 50 }}
                    size={'large'}
                    color={'red'}
                />
            }
            onEndReached={() => onEndReached()}
            onEndReachedThreshold={0}
            initialNumToRender={10}
            inverted
            keyExtractor={item => item.id}
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
