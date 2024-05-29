import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../assets/styles/colors';
import { fonts } from '../assets/styles/fonts.styles';

type ChatInputProps = {
    text: string;
    onChangeText: (newText: string) => void;
};

export const ChatInput = ({ text, onChangeText }: ChatInputProps) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Start typing..."
                value={text}
                multiline
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        borderRadius: 24,
        maxHeight: 100,
        justifyContent: 'center',
    },
    input: {
        ...fonts.defaultFont,
        padding: 0,
        paddingHorizontal: 16,
    },
});
