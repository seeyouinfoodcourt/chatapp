import { View, StyleSheet, VirtualizedList } from 'react-native';
import React from 'react';
import { NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { AppStackParamList } from '../../navigators/navigation.types';
import { ChatInput } from '../../components/chat.input';
import { ChatMessage } from '../../components/chat.message';

type ChatRoomScreenProps = {
    navigation: NavigationProp<AppStackParamList>;
    route: RouteProp<AppStackParamList>;
};

type ItemData = {
    id: string;
    title: string;
};
export const ChatRoomScreen = ({ navigation, route }: ChatRoomScreenProps) => {
    const { roomId, name } = route.params ?? {};

    const getItem = (_data: unknown, index: number): ItemData => ({
        id: Math.random().toString(12).substring(0),
        title: `Item ${index + 1}`,
    });
    return (
        <View style={styles.container}>
            <View style={styles.chat}>
                <VirtualizedList
                    initialNumToRender={4}
                    renderItem={({ item }) => (
                        <ChatMessage
                            message={item.title}
                            author="Broder Salsa"
                            timeStamp="13:45"
                        />
                    )}
                    keyExtractor={item => item.id}
                    getItemCount={() => 4}
                    getItem={getItem}
                />
            </View>
            <View style={styles.footer}>
                <ChatInput />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    chat: { backgroundColor: 'green', flex: 1, padding: 8 },
    footer: {
        backgroundColor: 'orange',
        justifyContent: 'center',
        padding: 8,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
});
