import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

type ChatListCardProps = {
    name: string;
    onPress: () => void;
};

export const ChatListCard = ({ name, onPress }: ChatListCardProps) => {
    return (
        <TouchableOpacity
            style={styles.roomBtnContainer}
            onPress={() => onPress()}>
            <Text style={styles.roomBtnText}>{name}</Text>
            <Text>{'>'}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    roomBtnContainer: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 16,
        margin: 8,
        flexDirection: 'row',
    },
    roomBtnText: {},
});
