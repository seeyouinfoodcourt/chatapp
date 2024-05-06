import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/button';
import { useAuthContext } from '../../contexts/auth.context';

export const HomeScreen = () => {
    const user = auth().currentUser;

    const { signOut } = useAuthContext();

    return (
        <SafeAreaView>
            <Text>HomeScreen</Text>
            <Text>Email: {user?.email}</Text>
            <Button title="Sign out" onPress={signOut} />
        </SafeAreaView>
    );
};
