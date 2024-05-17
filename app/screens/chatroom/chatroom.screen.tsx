import { View, StyleSheet, KeyboardAvoidingView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../../navigators/navigation.types';
import { ChatInput } from '../../components/chat.input';
import { ChatFeed } from '../../components/chat.feed';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { getMessages, sendMessage } from '../../services/firebase.service';
import { Message } from '../../types/app.types';
import { ChatImagePicker } from '../../components/chat.image.picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

type ChatRoomScreenProps = {
    navigation: NavigationProp<AppStackParamList>;
    route: RouteProp<AppStackParamList>;
};

export const ChatRoomScreen = ({ route }: ChatRoomScreenProps) => {
    const { roomId } = route.params ?? {};
    const user = auth().currentUser;
    const [messages, setMessages] = useState<Message[]>([]);
    const [imageUri, setImageUri] = useState('');

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

    const handleSend = (message: string) => {
        const newMessage = {
            message: message,
            imageUri: imageUri,
            author: user?.displayName,
        };

        sendMessage(roomId, newMessage);
    };

    const handleImagePick = (uri: string) => {
        setImageUri(uri);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.chat}>
                <ChatFeed messages={messages} />
            </View>
            <View style={styles.footer}>
                {imageUri ? (
                    <View style={styles.imagePreview}>
                        <Image source={{ uri: imageUri }} style={{ flex: 1 }} />
                        {/* <Icon name="delete" size={16} style={styles.removeImage} /> */}
                    </View>
                ) : null}

                <View style={styles.inputContainer}>
                    <ChatImagePicker onPick={handleImagePick} />
                    <ChatInput onSend={handleSend} />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chat: {
        backgroundColor: 'green',
        flex: 1,
        padding: 8,
    },
    footer: {
        backgroundColor: 'orange',
        justifyContent: 'center',
        padding: 8,
        gap: 8,
    },
    imagePreview: {
        height: 60,
        width: 60,
        backgroundColor: '#fff',
    },
    removeImage: {
        padding: 4,
    },
    inputContainer: {
        flexDirection: 'row',
    },
});
