import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';

type ChatInputProps = {
    onSend: (message: string) => void;
};

export const ChatInput = ({ onSend }: ChatInputProps) => {
    const [text, setText] = useState('');
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Start typing..."
                value={text}
                multiline
                onChangeText={newText => setText(newText)}
            />
            <TouchableWithoutFeedback
                style={styles.sendIcon}
                onPress={() => onSend(text)}>
                <Text>{'>'}</Text>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 24,
        flexDirection: 'row',
    },
    input: {
        flex: 1,
    },
    sendIcon: {},
});
