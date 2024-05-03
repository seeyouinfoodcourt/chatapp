import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

type ButtonProps = {
    title: string;
    onPress?: () => void;
};

export const Button = ({ title, onPress }: ButtonProps) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'orange',
        padding: 8,
    },
    buttonText: {
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
        color: '#fff',
    },
});
