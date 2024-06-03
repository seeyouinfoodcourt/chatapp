import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../assets/styles/fonts.styles';
import { Colors } from '../assets/styles/colors';
import { usePushMessageContext } from '../contexts/push.message.context';
import NotificationToggle from './notification.toggle';
import { Route } from '@react-navigation/native';

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
    const [roomdId, setRoomId] = useState('');

    useEffect(() => {
        const updateRoomId = async () => {
            if (route.name === 'Chatroom') {
                const params = route.params as RouteParams;
                await setRoomId(params.roomId);
            }
        };
        updateRoomId();
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
                        topic={roomdId}
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
    },
    right: {
        backgroundColor: 'blue',
    },
    back: { alignSelf: 'flex-start', padding: 16 },
    title: {
        ...fonts.defaultFont,
        color: Colors.white,
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },

    notifications: {
        padding: 16,
        alignSelf: 'flex-end',
    },
});
