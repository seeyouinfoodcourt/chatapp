import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

type ChatMessageProps = {
    author: string;
    message: string;
    timeStamp?: string;
};

export const ChatMessage = ({
    author,
    message,
    timeStamp,
}: ChatMessageProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.avatar}></View>
            <View style={styles.message}>
                <Text style={styles.author}>{author}</Text>
                <Text style={styles.content}>{message}</Text>
                <Text style={styles.timeStamp}>{timeStamp}</Text>
            </View>
        </View>
    );
};

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
