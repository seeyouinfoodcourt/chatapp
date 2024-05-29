import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Room } from '../types/app.types';
import { Colors } from '../assets/styles/colors';

type ChatListCardProps = {
    room: Room;
    onPress: () => void;
};

export const ChatListCard = ({ room, onPress }: ChatListCardProps) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress()}>
            <Image style={styles.image} source={{ uri: room.imageUrl }} />
            <View style={styles.textContainer}>
                <Text style={styles.name}>{room.name}</Text>
                <Text style={styles.description}>{room.description}</Text>
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
        borderBottomColor: Colors.grey,
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    textContainer: {},
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 2,
    },
    description: {},
    chevron: {
        marginLeft: 'auto',
    },
});
