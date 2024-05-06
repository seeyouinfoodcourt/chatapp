import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HomeScreen = () => {
    const user = auth().currentUser;
    return (
        <SafeAreaView>
            <Text>HomeScreen</Text>
            <Text>Email: {user?.email}</Text>
        </SafeAreaView>
    );
};
