import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { DateTime } from './date';
import { Message } from '../types/app.types';
import { Colors } from '../assets/styles/colors';
import { fonts } from '../assets/styles/fonts.styles';
import { useAuthContext } from '../contexts/auth.context';

type ChatMessageProps = {
    message: Message;
};
export const ChatMessage = React.memo((props: ChatMessageProps) => {
    const { userCredentials } = useAuthContext();
    const { author, authorId, message, imageUri, createdAt } = props.message;

    const [isMyMessage, setIsMyMessage] = useState(false);
    const avatarPlaceholder = require('../assets/img/avatar-placeholder.jpeg');

    useEffect(() => {
        userCredentials?.uid === authorId && setIsMyMessage(true);
    });
    useEffect(() => {
        console.log('message rendered', Platform.OS, message);
    });

    return (
        <View style={[styles.container, isMyMessage && styles.myMessage]}>
            {!isMyMessage && (
                <Image
                    style={styles.avatar}
                    source={
                        author.avatar
                            ? { uri: author.avatar }
                            : avatarPlaceholder
                    }
                    defaultSource={avatarPlaceholder}
                />
            )}
            <View style={styles.message}>
                {!isMyMessage && (
                    <Text style={styles.author}>{author.name}</Text>
                )}
                {imageUri ? (
                    <Image
                        style={styles.image}
                        source={{
                            uri: imageUri,
                        }}
                    />
                ) : null}
                <Text style={styles.content}>{message}</Text>
                <DateTime timeStamp={createdAt} style={styles.timeStamp} />
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    myMessage: {
        alignSelf: 'flex-end',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 25,
        marginRight: 8,
        backgroundColor: Colors.white,
    },
    image: {
        flex: 1,
        height: 200,
        width: 200,
        marginVertical: 4,
    },
    message: {
        backgroundColor: Colors.white,
        borderRadius: 8,
        padding: 8,
    },
    author: {
        ...fonts.defaultFont,
        fontWeight: 'bold',
    },
    content: {
        ...fonts.defaultFont,
    },
    timeStamp: { ...fonts.defaultFont, textAlign: 'right', fontSize: 12 },
});
