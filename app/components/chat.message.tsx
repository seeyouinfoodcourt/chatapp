import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { DateTime } from './date';

type ChatMessageProps = {
    author: string;
    imageUri?: string;
    message: string;
    timeStamp: FirebaseFirestoreTypes.Timestamp;
};

export const ChatMessage = ({
    author,
    imageUri,
    message,
    timeStamp,
}: ChatMessageProps) => {
    console.log(author, imageUri, message, timeStamp);
    return (
        <View style={styles.container}>
            <View style={styles.avatar}></View>
            <View style={styles.message}>
                <Text style={styles.author}>{author}</Text>
                {imageUri ? (
                    <Image
                        style={styles.image}
                        source={{
                            uri: imageUri,
                        }}
                    />
                ) : null}
                <Text style={styles.content}>{message}</Text>
                <DateTime timeStamp={timeStamp} style={styles.timeStamp} />
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
