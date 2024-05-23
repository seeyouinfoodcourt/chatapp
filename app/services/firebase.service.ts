import firestore, {
    FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';
import { Message } from '../types/app.types';
import { Platform } from 'react-native';
import { PermissionsAndroid } from 'react-native';

/**
 * Request user permissions for push messages
 */
export const requestUserPermission = async () => {
    if (Platform.OS === 'android') {
        // Android permissions
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        return;
    }
    // iOS permissions
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
};

/**
 * Get FCM Registration token
 */

export const getFcmToken = async () => {
    const token = await messaging().getToken();
    console.log('FCM Registration token', token);

    return token;
};

/**
 * Subscribe to push notifications for a specific topic
 * @param topic - The room id is used as topic
 */

export const subscribeToPushTopic = (topic: string) => {
    messaging()
        .subscribeToTopic(topic)
        .then(res => console.log('Subscribed to topic!', res));
};

/**
 * Send push notifications to FCM
 * @param token - FCM Registration token. Alternatively to send to topics use '/topics/{topic}'
 * @param auth
 */
export const sendPushMessage = async (token: string, auth: string) => {
    const result = await fetch(
        'https://fcm.googleapis.com/v1/projects/chat-app-cedaf/messages:send',
        {
            method: 'POST',
            headers: { Authorization: 'Bearer' + auth },
            body: JSON.stringify({
                token: token,
                data: {},
                notification: {
                    title: 'TEST FROM SERVICE',
                    body: 'this push message was sent from the service',
                },
            }),
        },
    );

    console.log('api', result.status);
};

/**
 * Get Rooms
 */
export const getRooms = () => {
    return firestore()
        .collection('rooms')
        .orderBy('latestMessage', 'desc')
        .get();
};

/**
 * Get messages from Room ID
 */
export const getMessages = async (roomId: string) => {
    const messages = await firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .get();

    const messageData: Message[] = messages.docs.map(doc => ({
        id: doc.id,
        author: doc.data().author,
        message: doc.data().message,
        createdAt: doc.data().createdAt,
    }));
    return messageData;
};

/**
 * Send message to firestore
 */

export const sendMessage = async (roomId: string, message: Message) => {
    if (!message.createdAt) {
        message.createdAt = firestore.Timestamp.now();
    }
    if (message.imageUri) {
        const imageUrl = await uploadImage('teter.jpg', message.imageUri);
        message.imageUri = imageUrl;
    }

    // Added to help debug
    message.system = Platform.OS;

    firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .add(message)
        .then(() => {
            setLatestMessage(roomId, message.createdAt);
        });
};

/**
 * Upload image to Firebase storage
 */

export const uploadImage = async (fileName: string, uri: string) => {
    const reference = storage().ref(fileName);
    const result = await reference.putFile(uri);

    const url = await reference.getDownloadURL();

    console.log('upload image', result);
    console.log('upload image', url);

    return url;
};

/**
 * Update timestamp for latest message
 */
const setLatestMessage = (
    roomId: string,
    timestamp: FirebaseFirestoreTypes.Timestamp,
) => {
    firestore()
        .collection('rooms')
        .doc(roomId)
        .update({ latestMessage: timestamp });
};
