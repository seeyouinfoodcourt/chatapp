/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './app/App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

// Background Push messages
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background message handled:', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
