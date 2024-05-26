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
import { Button } from './button';

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

            // const formattedMessages = querySnapshot
            //     .docChanges()
            //     .map(change => ({
            //         id: change.doc.id,
            //         author: change.doc.data().author,
            //         message: change.doc.data().message,
            //         imageUri: change.doc.data().imageUri,
            //         createdAt: change.doc.data().createdAt,
            //     }));

            const formattedMessages = formatMessages(querySnapshot);
            setMessages(formattedMessages);
            if (listRef.current)
                listRef.current.scrollToIndex({ animated: false, index: 0 });
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
