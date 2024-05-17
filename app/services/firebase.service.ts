import firestore, {
    FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { Message } from '../types/app.types';

/** Get Rooms */
export const getRooms = () => {
    return firestore()
        .collection('rooms')
        .orderBy('latestMessage', 'desc')
        .get();
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

/* Update timestamp for latest message */
const setLatestMessage = (
    roomId: string,
    timestamp: FirebaseFirestoreTypes.Timestamp,
) => {
    console.log('roomid', roomId);
    console.log('timestamp', timestamp);
    firestore()
        .collection('rooms')
        .doc(roomId)
        .update({ latestMessage: timestamp });
};
