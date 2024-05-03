import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { InputField } from '../../components/input.field';
import { sharedStyles } from '../../assets/styles/shared.styles';
import { Title } from '../../components/title';
import { Button } from '../../components/button';
import { GoogleSignIn } from '../../components/google.signin';

export const SigninScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <SafeAreaView style={sharedStyles.container}>
            <Title title="Sign In" />
            <InputField value={email} onChangeText={setEmail} />
            <InputField value={password} onChangeText={setPassword} />
            <Button title="Log in" />
            <GoogleSignIn />
        </SafeAreaView>
    );
};
