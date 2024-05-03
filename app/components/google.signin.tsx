import React from 'react';
import { Button } from 'react-native';

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export function GoogleSignIn() {
    async function onGoogleButtonPress() {
        console.log('ongooglebuttonpress');
        // Check if your device supports Google Play
        const test = await GoogleSignin.hasPlayServices({
            showPlayServicesUpdateDialog: true,
        });
        console.log(test);
        // Get the users ID token
        // const { idToken } = await GoogleSignin.signIn();
        try {
            await GoogleSignin.signIn();
        } catch (error) {
            console.log(error);
        }

        // Create a Google credential with the token
        // const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        // return auth().signInWithCredential(googleCredential);
    }
    return (
        <Button
            title="Google Sign-In"
            onPress={() =>
                onGoogleButtonPress().then(() =>
                    console.log('Signed in with Google!'),
                )
            }
        />
    );
}
