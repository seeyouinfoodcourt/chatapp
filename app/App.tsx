import React, { useEffect } from 'react';
import { AuthProvider } from './contexts/auth.context';
import { RootNavigator } from './navigators/root.navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { requestUserPermission } from './services/firebase.service';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

GoogleSignin.configure({
    webClientId:
        '795725916590-3n0gnd29p2mstkbmr7rcr21uev7rmg3i.apps.googleusercontent.com',
});

enableScreens();

function App(): React.JSX.Element {
    // Request push permission
    useEffect(() => {
        requestUserPermission();
    }, []);
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <RootNavigator />
            </AuthProvider>
        </SafeAreaProvider>
    );
}

export default App;
