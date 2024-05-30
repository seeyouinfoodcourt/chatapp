import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../assets/styles/fonts.styles';
import { Colors } from '../assets/styles/colors';
import { usePushMessageContext } from '../contexts/push.message.context';
import NotificationToggle from './notification.toggle';

type RouteParams = {
    roomId: string;
};
export const Header = ({
    navigation,
    route,
    options,
    back,
}: NativeStackHeaderProps) => {
    const navigationState = navigation.getState();

    const [roomId, setRoomId] = useState('');

    useEffect(() => {
        if (route.name === 'Chatroom') {
            const params = route.params as RouteParams;
            setRoomId(params.roomId);
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {navigationState.index > 0 && (
                <View style={styles.headerChild}>
                    <Pressable
                        style={styles.back}
                        onPress={() => navigation.goBack()}>
                        <Icon
                            name="chevron-left"
                            size={25}
                            color={Colors.white}
                        />
                    </Pressable>
                </View>
            )}
            <View style={styles.headerChild}>
                <Text style={styles.title}>{options.title}</Text>
            </View>

            {navigationState.index > 0 && (
                <View style={styles.headerChild}>
                    <NotificationToggle
                        topic={'room1'}
                        style={styles.notifications}
                    />
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.headerBackground,
        height: 65,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 1 },
    },
    left: {
        backgroundColor: 'red',
    },
    headerChild: {
        justifyContent: 'center',
        flex: 1,
        padding: 8,
    },
    right: {
        backgroundColor: 'blue',
    },
    back: { alignSelf: 'flex-start' },
    title: {
        ...fonts.defaultFont,
        color: Colors.white,
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },

    notifications: {
        alignSelf: 'flex-end',
    },
});
