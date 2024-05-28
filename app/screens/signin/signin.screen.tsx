import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sharedStyles } from '../../assets/styles/shared.styles';
import { Title } from '../../components/title';
import { Button } from '../../components/button';
import { GoogleSignInButton } from '../../components/google.signin';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { useAuthContext } from '../../contexts/auth.context';
import { Provider } from '../../types/app.types';

export const SigninScreen = () => {
    const { signInWithProvider } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async (provider: Provider) => {
        try {
            setIsLoading(true);
            await signInWithProvider(provider);
        } catch (error) {
            Alert.alert('Sign in failed', JSON.stringify(error));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <View style={styles.titleContainer}>
                    <Title title="Signing in" />
                    <Text style={styles.text}>
                        This should only take a moment
                    </Text>
                    <ActivityIndicator
                        style={styles.activityIndicator}
                        animating={isLoading}
                        size={'large'}
                        color={'orange'}
                    />
                </View>
            ) : (
                <>
                    <View style={styles.titleContainer}>
                        <Title title="Welcome to Awesome Chat App" />
                        <Text style={styles.text}>
                            Please log in to access the chat rooms
                        </Text>
                    </View>

                    <Button
                        title="Sign in with Facebook"
                        onPress={() => handleSignIn('facebook')}
                    />

                    <Button
                        title="Sign in with Google"
                        onPress={() => handleSignIn('google')}
                    />
                </>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        ...sharedStyles.container,
        justifyContent: 'center',
        borderWidth: 1,
    },
    activityIndicator: {
        marginTop: 8,
    },
    titleContainer: {
        marginBottom: 16,
    },
    text: {
        textAlign: 'center',
    },
});
