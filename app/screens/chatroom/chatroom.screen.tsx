import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { AppStackParamList } from '../../navigators/navigation.types';
import { ChatInput } from '../../components/chat.input';

type ChatRoomScreenProps = {
    navigation: NavigationProp<AppStackParamList>;
    route: RouteProp<AppStackParamList>;
};

export const ChatRoomScreen = ({ navigation, route }: ChatRoomScreenProps) => {
    const { roomId, name } = route.params ?? {};
    return (
        <View style={styles.container}>
            <ScrollView style={styles.chat}></ScrollView>
            <View style={styles.footer}>
                <ChatInput />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    chat: { backgroundColor: 'green' },
    footer: {
        backgroundColor: 'orange',
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 8,
    },
});
