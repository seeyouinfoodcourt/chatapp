import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { InputField } from '../../components/input.field';
import { sharedStyles } from '../../assets/styles/shared.styles';
import { Title } from '../../components/title';
import { Button } from '../../components/button';
import { GoogleSignInButton } from '../../components/google.signin';
import { StyleSheet, Text, View } from 'react-native';

export const SigninScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <Title title="Welcome to Awesome Chat App" />
                <Text style={styles.text}>
                    Please log in to access the chat rooms
                </Text>
            </View>

            <GoogleSignInButton />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        ...sharedStyles.container,
        justifyContent: 'center',
        borderWidth: 1,
    },
    titleContainer: {
        marginBottom: 16,
    },
    text: {
        // color: '#fff',
        textAlign: 'center',
    },
});
