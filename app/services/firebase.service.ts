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

/* 
    Send message to firestore
*/

export const sendMessage = async (roomId: string, message: Message) => {
    if (!message.createdAt) {
        message.createdAt = firestore.Timestamp.now();
    }
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
