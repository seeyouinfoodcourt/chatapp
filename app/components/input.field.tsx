import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import React from 'react';

interface InputFieldProps extends TextInputProps {
    value: string;
    editable?: boolean;
    onChangeText: (text: string) => void;
}

export const InputField = ({
    value,
    editable = true,
    autoCapitalize = 'none',
    onChangeText,
    ...rest
}: InputFieldProps) => {
    return (
        <TextInput
            style={[
                styles.inputField,
                !editable ? styles.inputFieldDisabled : null,
            ]}
            autoCapitalize={autoCapitalize}
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            editable={editable}
            value={value}
            {...rest}
            onChangeText={newValue => {
                onChangeText(newValue);
            }}
        />
    );
};

const styles = StyleSheet.create({
    inputField: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 8,
        backgroundColor: '#fff',
        padding: 8,
        marginVertical: 4,
    },
    inputFieldDisabled: {},
});
