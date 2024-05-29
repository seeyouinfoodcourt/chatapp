import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Colors } from '../assets/styles/colors';

type ChatImagePickerProps = {
    type: 'library' | 'camera';
    onPick: (uri: string) => void;
};

export const ChatImagePicker = ({ type, onPick }: ChatImagePickerProps) => {
    const pickImage = async () => {
        const result =
            type === 'camera'
                ? await launchCamera({ mediaType: 'photo' })
                : await launchImageLibrary({ mediaType: 'photo' });

        if (result.assets) {
            console.log('assets', result);
            if (result.assets[0].uri) onPick(result.assets[0].uri);
        } else if (result.didCancel) {
            console.log('User cancelled image picker', result);
        } else if (result.errorCode) {
            console.error('errorcode', result);
        } else if (result.errorMessage) {
            console.error('errormessage', result);
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={() => pickImage()}>
            <Icon
                name={type === 'camera' ? 'photo-camera' : 'image'}
                size={24}
                style={styles.icon}
                color={Colors.black}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        padding: 4,
        height: 36,
        width: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 59,
        marginRight: 8,
    },
    icon: {},
});
