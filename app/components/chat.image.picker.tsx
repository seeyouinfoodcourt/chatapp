import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    ImagePickerResponse,
    launchImageLibrary,
} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import { uploadImage } from '../services/firebase.service';

type ChatImagePickerProps = {
    onPick: (uri: string) => void;
};

export const ChatImagePicker = ({ onPick }: ChatImagePickerProps) => {
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
            <Icon name="image" size={24} style={styles.icon} />
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
