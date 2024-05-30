import { Alert, FlatList } from 'react-native';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { ChatMessage } from './chat.message';
import { Message } from '../types/app.types';
import { ActivityIndicator } from 'react-native';
import { getMessages, loadNext } from '../services/firebase.service';
import { Colors } from '../assets/styles/colors';

type ChatFeedProps = {
    roomId: string;
};

export const ChatFeed = ({ roomId }: ChatFeedProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [lastMessage, setLastMessage] = useState<Message>();
    const [refreshing, setRefreshing] = useState(true);
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

    // Get initial messages and listen for new messages
    useEffect(() => {
        // Remove messages before feed re-render to make sure the initial messages are not set twice
        // TODO: remove messages from previous state if the same ID exists in the newMessages array
        setMessages([]);
        const unsubscribe = getMessages(roomId).onSnapshot(querySnapshot => {
            const newMessages = querySnapshot
                .docChanges()
                .filter(change => change.type === 'added')
                .map(change => ({
                    id: change.doc.id,
                    author: change.doc.data().author,
                    authorId: change.doc.data().authorId,
                    message: change.doc.data().message,
                    imageUri: change.doc.data().imageUri,
                    createdAt: change.doc.data().createdAt,
                }));

            setMessages(prevState => [...newMessages, ...prevState]);
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
                        color={Colors.orange}
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
