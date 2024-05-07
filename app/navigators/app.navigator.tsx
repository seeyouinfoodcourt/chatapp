import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from './navigation.types';
import React from 'react';
import { HomeScreen } from '../screens/home/home.screen';
import { ChatRoomScreen } from '../screens/chatroom/chatroom.screen';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chatroom" component={ChatRoomScreen} />
        </Stack.Navigator>
    );
};
