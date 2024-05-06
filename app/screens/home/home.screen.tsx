import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/button';

export const HomeScreen = () => {
    const user = auth().currentUser;

    const signOut = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    };
    return (
        <SafeAreaView>
            <Text>HomeScreen</Text>
            <Text>Email: {user?.email}</Text>
            <Button title="Sign out" onPress={signOut} />
        </SafeAreaView>
    );
};
