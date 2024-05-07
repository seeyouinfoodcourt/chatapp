import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './navigation.types';
import React from 'react';
import { SigninScreen } from '../screens/signin/signin.screen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Signin" component={SigninScreen} />
        </Stack.Navigator>
    );
};
