import {
    View,
    Text,
    StyleSheet,
    TextProps,
    StyleProp,
    TextStyle,
} from 'react-native';
import React from 'react';

type TitleProps = {
    title: string;
    style?: StyleProp<TextStyle>;
};

export const Title = ({ title, style }: TitleProps) => {
    return (
        <View style={{ alignItems: 'center', marginVertical: 8 }}>
            <Text style={[{ fontSize: 24, fontWeight: 'bold' }, style]}>
                {title}
            </Text>
        </View>
    );
};
