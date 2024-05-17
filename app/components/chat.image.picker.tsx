import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export const ChatImagePicker = () => {
    return (
        <View style={styles.container}>
            <Icon name="image" size={24} style={styles.icon} />
        </View>
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
