import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

type TitleProps = {
    title: string;
};

export const Title = ({ title }: TitleProps) => {
    return (
        <View style={{ alignItems: 'center', marginVertical: 8 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{title}</Text>
        </View>
    );
};
