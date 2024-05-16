import firestore from '@react-native-firebase/firestore';
import { Message } from '../types/app.types';

export const getRooms = () => {
    return firestore().collection('rooms').get();
};

/* Get messages from Room ID */
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

/* Send message */

export const sendMessage = (roomId: string, message: Message) => {
    if (!message.createdAt) {
        message.createdAt = firestore.Timestamp.now();
    }
    const docRef = firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .add(message)
        .then(() => console.log('Message added'));
};
