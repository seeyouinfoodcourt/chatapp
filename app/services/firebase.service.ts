import firestore, {
    FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Message } from '../types/app.types';

const queryLimit = 10;
const roomsRef = firestore().collection('rooms');

/**
 * Get Rooms
 * */
export const getRooms = () => {
    return roomsRef.orderBy('latestMessage', 'desc').get();
};

/* 
    Get messages from Room ID with realtime updates 
*/
export const getMessages = (roomId: string) => {
    return roomsRef
        .doc(roomId)
        .collection('messages')
        .limit(queryLimit)
        .orderBy('createdAt', 'desc');
};

export const loadNext = async (roomId: string, lastMessage: Message) => {
    // Get the last document based on the last message ID
    const lastDoc = await roomsRef
        .doc(roomId)
        .collection('messages')
        .doc(lastMessage.id)
        .get();

    // Get the next amount of messages after last document
    const result = await roomsRef
        .doc(roomId)
        .collection('messages')
        .limit(queryLimit)
        .orderBy('createdAt', 'desc')
        .startAfter(lastDoc)
        .get();

    const messages = formatMessages(result);

    return messages;
};

/**
 * Format message data
 */

export const formatMessages = (
    messageData: FirebaseFirestoreTypes.QuerySnapshot,
) => {
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
    }

    await roomsRef.doc(roomId).collection('messages').add(message);

    updateLatestMessage(roomId, message.createdAt);
};

/* 
    Upload image to Firebase storage and get the URL
*/

export const uploadImage = async (fileName: string, uri: string) => {
    // Create a reference to the image location
    const reference = storage().ref(fileName);

    // Upload the image to Firebase Storage
    await reference.putFile(uri);

    // Retrieve the download URL for the uploaded file
    const url = await reference.getDownloadURL();

    return url;
};

/* Update timestamp for latest message */
const updateLatestMessage = (
    roomId: string,
    timestamp: FirebaseFirestoreTypes.Timestamp,
) => {
    roomsRef.doc(roomId).update({ latestMessage: timestamp });
};
