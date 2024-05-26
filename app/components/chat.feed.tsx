import { Alert, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ChatMessage } from './chat.message';
import { Message } from '../types/app.types';
import { ActivityIndicator } from 'react-native';
import {
    formatMessages,
    getMessages,
    loadNext,
} from '../services/firebase.service';

type ChatFeedProps = {
    roomId: string;
};

export const ChatFeed = ({ roomId }: ChatFeedProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [lastMessage, setLastMessage] = useState<Message>();
    const [refreshing, setRefreshing] = useState(false);

    // Load new messages on scroll
    const onEndReached = async () => {
        if (lastMessage) {
            setRefreshing(true);

            const result = await loadNext(roomId, lastMessage);

            if (result.length > 0) {
                setMessages(prevState => [...prevState, ...result]);
            } else {
                // Alert the user when reaching the end of data - it's not pretty i know
                Alert.alert('No more data');
            }
            setRefreshing(false);
        }
    };

    const getInitialMessages = async () => {
        const result = await getMessages(roomId).get();
        const formattedMessages = formatMessages(result);
        setMessages(formattedMessages);
        console.log('initial messages', formattedMessages);
    };

    // Load initial messages
    useEffect(() => {
        console.log('hul igennem?');
        getInitialMessages();
    }, []);

    // Listen for new messages
    useEffect(() => {
        const unsubscribe = getMessages(roomId).onSnapshot(querySnapshot => {
            console.log('onsnapshot', querySnapshot.docChanges());

            const formattedMessages = formatMessages(querySnapshot);
            setMessages(formattedMessages);
        });

        return unsubscribe;
    }, []);

    // Store last message in state
    useEffect(() => {
        console.log('last messages update');
        const lastMessage = messages[messages.length - 1];
        setLastMessage(lastMessage);
    }, [messages]);

    return (
        <FlatList
            data={messages}
            ListFooterComponent={
                <ActivityIndicator
                    animating={refreshing}
                    style={{ flex: 1, marginVertical: 50 }}
                    size={'large'}
                    color={'orange'}
                />
            }
            onEndReached={() => onEndReached()}
            onEndReachedThreshold={0}
            initialNumToRender={10}
            inverted
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ChatMessage message={item} />}
        />
    );
};
