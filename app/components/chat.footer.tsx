import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ChatImagePicker } from './chat.image.picker';
import { ChatInput } from './chat.input';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { sendMessage } from '../services/firebase.service';
import auth from '@react-native-firebase/auth';

type ChatFooterProps = {
    roomId: string;
};

export const ChatFooter = ({ roomId }: ChatFooterProps) => {
    const user = auth().currentUser;
    const [imageUri, setImageUri] = useState('');
    const [text, setText] = useState('');
    const [enableSend, setEnableSend] = useState(false);

    // Enable send on image or text input
    useEffect(() => {
        if (text || imageUri) {
            setEnableSend(true);
        } else {
            setEnableSend(false);
        }
    }, [text, imageUri]);

    const handleSend = () => {
        if (!enableSend) {
            return;
        }
        const newMessage = {
            message: text,
            imageUri: imageUri,
            author: user?.displayName,
        };

        sendMessage(roomId, newMessage);
        setText('');
        clearImage();
    };

    const clearImage = () => {
        setImageUri('');
    };

    const handleImagePick = (uri: string) => {
        setImageUri(uri);
    };
    return (
        <>
            {imageUri ? (
                <View style={styles.imagePreview}>
                    <Image source={{ uri: imageUri }} style={{ flex: 1 }} />
                    <TouchableOpacity
                        style={styles.removeImage}
                        onPress={clearImage}>
                        <Icon name="delete" size={16} />
                    </TouchableOpacity>
                </View>
            ) : null}
            <View style={styles.inputContainer}>
                <ChatImagePicker type="camera" onPick={handleImagePick} />
                <ChatImagePicker type="library" onPick={handleImagePick} />
                <ChatInput
                    text={text}
                    onChangeText={newText => setText(newText)}
                />
                <Pressable style={styles.sendIcon} onPress={() => handleSend()}>
                    <Icon
                        name="send"
                        size={30}
                        color={enableSend ? '#fff' : '#e8c882'}
                    />
                </Pressable>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    imagePreview: {
        height: 60,
        width: 60,
        backgroundColor: '#fff',
    },
    removeImage: {
        padding: 4,
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: '#fff',
        borderColor: 'orange',
        borderRadius: 50,
        borderWidth: 2,
    },
    inputContainer: {
        flexDirection: 'row',
    },
    sendIcon: {
        justifyContent: 'center',
        marginLeft: 8,
    },
});
