import { View, Text, StyleProp, TextStyle } from 'react-native';
import React from 'react';

type TitleProps = {
    title: string;
    style?: StyleProp<TextStyle>;
};

export const Title = ({ title, style }: TitleProps) => {
    return (
        <View style={{ alignItems: 'center', marginVertical: 8 }}>
            <Text
                style={[
                    {
                        fontSize: 24,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        textTransform: 'uppercase',
                    },
                    style,
                ]}>
                {title}
            </Text>
        </View>
    );
};
