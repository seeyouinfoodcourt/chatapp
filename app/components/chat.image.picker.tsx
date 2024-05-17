import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';

type ChatImagePickerProps = {
    type: 'library' | 'camera';
    onPick: (uri: string) => void;
};

export const ChatImagePicker = ({ type, onPick }: ChatImagePickerProps) => {
    const pickImage = async () => {
        try {
            const result = await launchImageLibrary({ mediaType: 'photo' });
            onPick(result.assets[0].uri);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={() => pickImage()}>
            <Icon
                name={type === 'camera' ? 'photo-camera' : 'image'}
                size={24}
                style={styles.icon}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 4,
        borderRadius: 59,
        marginRight: 8,
    },
    icon: {},
});
