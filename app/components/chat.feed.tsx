import { Alert, FlatList } from 'react-native';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
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
    const listRef = useRef<FlatList>(null);

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
        // setMessages(formattedMessages);
    };

    // Load initial messages
    useEffect(() => {
        // getInitialMessages();
    }, []);

    // Get initial messages and listen for new messages
    useEffect(() => {
        const unsubscribe = getMessages(roomId).onSnapshot(querySnapshot => {
            const filteredChanges = querySnapshot
                .docChanges()
                .filter(change => change.type === 'added');

            const formattedMessages = filteredChanges.map(change => ({
                id: change.doc.id,
                author: change.doc.data().author,
                message: change.doc.data().message,
                imageUri: change.doc.data().imageUri,
                createdAt: change.doc.data().createdAt,
            }));

            setMessages(prevState => [...prevState, ...formattedMessages]);
        });

        return unsubscribe;
    }, []);

    // Store last message in state
    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        setLastMessage(lastMessage);
    }, [messages]);

    return (
        <>
            <FlatList
                ref={listRef}
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
        </>
    );
};
