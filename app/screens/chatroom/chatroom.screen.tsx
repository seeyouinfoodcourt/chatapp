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
import { ChatFeed } from '../../components/chat.feed';

import { ChatFooter } from '../../components/chat.footer';
import { Text } from 'react-native';
import { subscribeToPushTopic } from '../../services/firebase.service';

type ChatRoomScreenProps = {
    navigation: NavigationProp<AppStackParamList>;
    route: RouteProp<AppStackParamList>;
};

export const ChatRoomScreen = ({ route }: ChatRoomScreenProps) => {
    const { roomId } = route.params ?? {};

    if (!roomId) {
        return (
            <View>
                <Text>No room id found</Text>
            </View>
        );
    }

    useEffect(() => {
        subscribeToPushTopic(roomId);
        console.log('useeffect subscribe');
    }, []);

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.chat}>
                <ChatFeed roomId={roomId} />
            </View>
            <View style={styles.footer}>
                <ChatFooter roomId={roomId} />
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
