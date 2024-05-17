import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';

export const ChatImagePicker = () => {
    const [image, setImage] = useState();

    const pickImage = async () => {
        try {
            const result = await launchImageLibrary({ mediaType: 'photo' });
            setImage(result);
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
