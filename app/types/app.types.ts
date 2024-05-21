import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type Message = {
    id?: string;
    author: string;
    imageUri?: string;
    message: string;
    createdAt?: FirebaseFirestoreTypes.Timestamp;
};
