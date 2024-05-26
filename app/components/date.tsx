import { View, Text, StyleProp, TextStyle } from 'react-native';
import React from 'react';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

type DateProps = {
    timeStamp: FirebaseFirestoreTypes.Timestamp;
    style?: StyleProp<TextStyle>;
};

export const DateTime = ({ timeStamp, style }: DateProps) => {
    const date = new Date(timeStamp.seconds * 1000);
    const now = new Date();

    return (
        <Text style={style}>
            {date.toUTCString()}
            {/* {date.getHours()}:{date.getMinutes()} */}
        </Text>
    );
};
