import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type Room = {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
};

export type Author = {
    name: string;
    avatar: string;
};

export type Message = {
    id: string;
    author: Author;
    imageUri?: string;
    message: string;
    createdAt: FirebaseFirestoreTypes.Timestamp;
};
