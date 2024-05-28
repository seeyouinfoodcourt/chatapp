import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import React, { useEffect } from 'react';
import { DateTime } from './date';
import { Message } from '../types/app.types';

type ChatMessageProps = {
    message: Message;
};
export const ChatMessage = React.memo((props: ChatMessageProps) => {
    const { author, message, imageUri, createdAt } = props.message;
    const avatarPlaceholder = require('../assets/img/avatar-placeholder.jpeg');

    useEffect(() => {
        console.log('message rendered', Platform.OS, message);
    });

    return (
        <View style={styles.container}>
            <Image
                style={styles.avatar}
                source={
                    author.avatar ? { uri: author.avatar } : avatarPlaceholder
                }
                defaultSource={avatarPlaceholder}
            />
            <View style={styles.message}>
                <Text style={styles.author}>{author.name}</Text>
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
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 25,
        marginRight: 8,
        backgroundColor: '#fff',
    },
    image: {
        flex: 1,
        height: 200,
        width: 200,
        marginVertical: 4,
    },
    message: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 8,
    },
    author: {
        fontWeight: 'bold',
    },
    content: {},
    timeStamp: { textAlign: 'right', fontSize: 12 },
});
