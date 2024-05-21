import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

type ChatInputProps = {
    text: string;
    onChangeText: (newText: string) => void;
};

export const ChatInput = ({ text, onChangeText }: ChatInputProps) => {
    return (
        <TextInput
            style={styles.input}
            placeholder="Start typing..."
            value={text}
            multiline
            onChangeText={onChangeText}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        flex: 1,
        maxHeight: 100,
        backgroundColor: '#fff',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingBottom: 0,
        paddingTop: 6,
    },
});
