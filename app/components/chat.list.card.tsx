import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';

type ChatListCardProps = {
    name: string;
    onPress: () => void;
};

export const ChatListCard = ({ name, onPress }: ChatListCardProps) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress()}>
            <View style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.lastMessage}>
                    This is a placeholder message
                </Text>
            </View>
            <Text style={styles.chevron}>{'>'}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
    },
    image: {
        height: 50,
        width: 50,
        backgroundColor: 'red',
        borderRadius: 25,
        marginRight: 16,
    },
    textContainer: {},
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 2,
    },
    lastMessage: {},
    chevron: {},
});
