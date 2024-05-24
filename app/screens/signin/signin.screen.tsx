import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sharedStyles } from '../../assets/styles/shared.styles';
import { Title } from '../../components/title';
import { Button } from '../../components/button';
import { GoogleSignInButton } from '../../components/google.signin';
import { StyleSheet, Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
export const SigninScreen = () => {
    async function onFacebookButtonPress() {
        try {
            // Attempt login with permissions
            const result = await LoginManager.logInWithPermissions([
                'public_profile',
                'email',
            ]);

            if (result.isCancelled) {
                throw 'User cancelled the login process';
            }

            // Once signed in, get the users AccessToken
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
                throw 'Something went wrong obtaining access token';
            }

            // Create a Firebase credential with the AccessToken
            const facebookCredential = auth.FacebookAuthProvider.credential(
                data.accessToken,
            );

            // Sign-in the user with the credential
            await auth().signInWithCredential(facebookCredential);
        } catch (e) {
            console.log('error signing in with facebook', e);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <Title title="Welcome to Awesome Chat App" />
                <Text style={styles.text}>
                    Please log in to access the chat rooms
                </Text>
            </View>

            <GoogleSignInButton />
            <Button
                title="Facebook Sign-In"
                onPress={() =>
                    onFacebookButtonPress().then(() =>
                        console.log('Signed in with Facebook!'),
                    )
                }
            />
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
        textAlign: 'center',
    },
});
