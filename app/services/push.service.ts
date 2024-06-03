import { Alert, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid } from 'react-native';

/**
 * Request push message permission
 */
export const requestPermission = async () => {
    let enabled = false;

    if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission();
        enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    } else if (Platform.OS === 'android' && Platform.Version >= 33) {
        const hasAndroidPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );

        if (!hasAndroidPermission) {
            const requestStatus = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            );

            enabled = requestStatus === 'granted';
        } else {
            enabled = true;
        }
    } else {
        enabled = true;
    }

    return enabled;
};

export const getPushToken = async () => {
    try {
        const token = await messaging().getToken();
        return token;
    } catch (error) {
        console.error(error);
        return '';
    }
};

export const subscribeToTopic = async (topic: string) => {
    console.log('service', topic);
    try {
        console.log('try', topic);
        const result = await messaging().subscribeToTopic(topic);
        console.log('subscribetotopic', result, topic);
    } catch (error) {
        console.log('catch');
        console.error(error);
        throw error;
    }
};

export const unsubscribeFromTopic = async (topic: string) => {
    const result = await messaging().unsubscribeFromTopic(topic);
    return result;
};
