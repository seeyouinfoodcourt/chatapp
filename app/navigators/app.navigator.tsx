import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from './navigation.types';
import React from 'react';
import { HomeScreen } from '../screens/home/home.screen';
import { ChatRoomScreen } from '../screens/chatroom/chatroom.screen';
import { Colors } from '../assets/styles/colors';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Super Awesome Chat',
                    headerStyle: { backgroundColor: Colors.header },
                }}
            />
            <Stack.Screen
                name="Chatroom"
                component={ChatRoomScreen}
                options={({ route }) => ({
                    title: route.params.name,
                })}
            />
        </Stack.Navigator>
    );
};
