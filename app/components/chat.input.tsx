import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
    Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

type ChatInputProps = {
    onSend: (message: string) => void;
};

export const ChatInput = ({ onSend }: ChatInputProps) => {
    const [text, setText] = useState('');
    const [enableSend, setEnableSend] = useState(false);

    const handleSend = () => {
        if (!enableSend) {
            return;
        }
        onSend(text);
        setText('');
    };

    useEffect(() => {
        if (text) {
            setEnableSend(true);
        } else {
            setEnableSend(false);
        }
    }, [text]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Start typing..."
                value={text}
                multiline
                onChangeText={newText => setText(newText)}
            />
            <Pressable style={styles.sendIcon} onPress={() => handleSend()}>
                <Icon
                    name="send"
                    size={30}
                    color={enableSend ? 'orange' : 'grey'}
                />
            </Pressable>
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
    sendIcon: {
        justifyContent: 'center',
    },
});
