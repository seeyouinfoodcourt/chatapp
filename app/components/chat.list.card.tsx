import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
                <Text style={styles.lastMessage}>This is a placehold</Text>
            </View>
            <View style={styles.chevron}>
                <Icon name="chevron-right" size={40} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
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
    chevron: {
        marginLeft: 'auto',
    },
});
