import React from 'react';

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Button } from './button';
import { Alert } from 'react-native';

export function GoogleSignInButton() {
    async function onGoogleButtonPress() {
        try {
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true,
            });
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential =
                auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            return auth().signInWithCredential(googleCredential);
        } catch (error) {
            Alert.alert('Error signing in with Google', JSON.stringify(error));
        }
    }
    return (
        <Button title="Google Sign-In" onPress={() => onGoogleButtonPress()} />
    );
}
