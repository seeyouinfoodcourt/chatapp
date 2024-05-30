import React, { useEffect } from 'react';
import { AuthProvider } from './contexts/auth.context';
import { RootNavigator } from './navigators/root.navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import messaging from '@react-native-firebase/messaging';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { PushMessageProvider } from './contexts/push.message.context';
import { Alert } from 'react-native';

GoogleSignin.configure({
    webClientId:
        '795725916590-3n0gnd29p2mstkbmr7rcr21uev7rmg3i.apps.googleusercontent.com',
});

enableScreens();

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

function App(): React.JSX.Element {
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert(
                'A new FCM message arrived!',
                JSON.stringify(remoteMessage),
            );
        });

        return unsubscribe;
    }, []);
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <PushMessageProvider>
                    <RootNavigator />
                </PushMessageProvider>
            </AuthProvider>
        </SafeAreaProvider>
    );
}

export default App;
