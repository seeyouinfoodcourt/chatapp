import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../assets/styles/colors';

export const SplashScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Super cool chat app</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.orange,
    },
    text: {
        color: Colors.white,
        fontSize: 24,
        fontWeight: 'bold',
    },
});
