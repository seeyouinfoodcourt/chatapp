import firestore, {
    FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Message } from '../types/app.types';
import { Platform } from 'react-native';

/**
 * Get Rooms
 * */
export const getRooms = () => {
    return firestore()
        .collection('rooms')
        .orderBy('latestMessage', 'desc')
        .get();
};

/* 
    Get messages from Room ID 
*/
export const getMessages = async (roomId: string) => {
    const result = await firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .limit(50)
        .orderBy('createdAt', 'desc')
        .get();

    const messages = formatMessages(result);
    return messages;
};

export const loadNext = async (roomId: string, lastMessage: Message) => {
    const lastDoc = await firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .doc(lastMessage.id)
        .get();

    const result = await firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .limit(50)
        .orderBy('createdAt', 'desc')
        .startAfter(lastDoc)
        .get();

    const messages = formatMessages(result);

    return messages;
};

/**
 * Format message data
 */

const formatMessages = (messageData: FirebaseFirestoreTypes.QuerySnapshot) => {
    const messages: Message[] = messageData.docs.map(doc => ({
        id: doc.id,
        author: doc.data().author,
        imageUri: doc.data().imageUri,
        message: doc.data().message,
        createdAt: doc.data().createdAt,
    }));

    return messages;
};

/* 
    Send message to firestore
*/

export const sendMessage = async (roomId: string, message: Message) => {
    // Add timestamp to message
    if (!message.createdAt) {
        message.createdAt = firestore.Timestamp.now();
    }
    // Upload image if there is one and change the URI to match CDN
    if (message.imageUri) {
        // TODO: Get filename for image
        const imageUrl = await uploadImage('teter.jpg', message.imageUri);
        message.imageUri = imageUrl;

        console.log('message has image', message);
    }

    // Added to help debug
    message.system = Platform.OS;

    firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .add(message)
        .then(() => {
            console.log('this');
            setLatestMessage(roomId, message.createdAt);
        });
};

/* 
    Upload image to Firebase storage
*/

export const uploadImage = async (fileName: string, uri: string) => {
    const reference = storage().ref(fileName);
    const result = await reference.putFile(uri);

    const url = await reference.getDownloadURL();

    console.log('upload image', result);
    console.log('upload image', url);

    return url;
};

/* Update timestamp for latest message */
const setLatestMessage = (
    roomId: string,
    timestamp: FirebaseFirestoreTypes.Timestamp,
) => {
    firestore()
        .collection('rooms')
        .doc(roomId)
        .update({ latestMessage: timestamp });
};
