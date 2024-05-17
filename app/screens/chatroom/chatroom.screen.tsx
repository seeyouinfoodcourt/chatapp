import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Image,
    TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../../navigators/navigation.types';
import { ChatInput } from '../../components/chat.input';
import { ChatFeed } from '../../components/chat.feed';
import auth from '@react-native-firebase/auth';
import { sendMessage } from '../../services/firebase.service';
import { ChatImagePicker } from '../../components/chat.image.picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

type ChatRoomScreenProps = {
    navigation: NavigationProp<AppStackParamList>;
    route: RouteProp<AppStackParamList>;
};

export const ChatRoomScreen = ({ route }: ChatRoomScreenProps) => {
    const { roomId } = route.params ?? {};
    const user = auth().currentUser;
    const [imageUri, setImageUri] = useState('');

    const handleSend = (message: string) => {
        const newMessage = {
            message: message,
            imageUri: imageUri,
            author: user?.displayName,
        };

        sendMessage(roomId, newMessage);
        clearImage();
    };

    const clearImage = () => {
        setImageUri('');
    };

    const handleImagePick = (uri: string) => {
        setImageUri(uri);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.chat}>
                <ChatFeed roomId={roomId} />
            </View>
            <View style={styles.footer}>
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
                    <ChatInput onSend={handleSend} />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chat: {
        backgroundColor: 'green',
        flex: 1,
        padding: 8,
    },
    footer: {
        backgroundColor: 'orange',
        justifyContent: 'center',
        padding: 8,
        gap: 8,
    },
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
});
