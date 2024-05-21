import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

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
            onPick(result.assets[0].uri);
        } else if (result.didCancel) {
            console.log('didcancel', result);
        } else if (result.errorCode) {
            console.log('errorcode', result);
        } else if (result.errorMessage) {
            console.log('errormessage', result);
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
