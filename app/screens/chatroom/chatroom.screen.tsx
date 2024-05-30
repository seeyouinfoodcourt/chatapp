import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Image,
    TouchableOpacity,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../../navigators/navigation.types';
import { ChatFeed } from '../../components/chat.feed';

import { ChatFooter } from '../../components/chat.footer';
import { Text } from 'react-native';
import { Colors } from '../../assets/styles/colors';

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
        backgroundColor: Colors.background,
        flex: 1,
        padding: 8,
    },
    footer: {
        backgroundColor: Colors.orange,
        justifyContent: 'center',
        padding: 8,
        gap: 8,
    },
    imagePreview: {
        height: 60,
        width: 60,
        backgroundColor: Colors.white,
    },
    removeImage: {
        padding: 4,
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: Colors.white,
        borderColor: Colors.orange,
        borderRadius: 50,
        borderWidth: 2,
    },
    inputContainer: {
        flexDirection: 'row',
    },
});
