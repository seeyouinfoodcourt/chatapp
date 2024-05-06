import { View, Text, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';

export const ChatInput = () => {
    const [text, setText] = useState('');
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Start typing..."
                value={text}
                onChangeText={newText => setText(newText)}
            />
            <View style={styles.sendIcon}>
                <Text>{'>'}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        height: 40,
        borderRadius: 24,
        flexDirection: 'row',
    },
    input: {
        flex: 1,
    },
    sendIcon: {},
});
