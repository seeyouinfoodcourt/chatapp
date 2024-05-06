import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

type ChatMessageProps = {
    message: string;
    timeStamp: string;
};

export const ChatMessage = ({ message, timeStamp }: ChatMessageProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.message}>ChatMessage</Text>
            <Text style={styles.timeStamp}>ChatMessage</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    message: {},
    timeStamp: {},
});
