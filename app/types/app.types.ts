import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type Room = {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
};

export type Message = {
    id?: string;
    author: string;
    imageUri?: string;
    message: string;
    createdAt?: FirebaseFirestoreTypes.Timestamp;
};
