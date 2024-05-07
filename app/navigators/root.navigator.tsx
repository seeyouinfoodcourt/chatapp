import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './navigation.types';
import { useAuthContext } from '../contexts/auth.context';
import { SplashScreen } from '../screens/splash/splash.screen';
import { AuthNavigator } from './auth.navigator';
import { AppNavigator } from './app.navigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
    const authContext = useAuthContext();

    return (
        <NavigationContainer>
            {authContext.isLoading ? (
                <Stack.Navigator
                    screenOptions={{
                        presentation: 'modal',
                        headerShown: false,
                    }}>
                    <Stack.Screen name="Splash" component={SplashScreen} />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator
                    screenOptions={{
                        presentation: 'card',
                        headerShown: false,
                    }}>
                    {authContext.userCredentials == null ? (
                        // No credential found, user isn't signed in
                        <Stack.Screen
                            name="Auth"
                            component={AuthNavigator}
                            options={{ animation: 'fade' }}
                        />
                    ) : (
                        // User is signed in
                        <Stack.Screen
                            name="App"
                            component={AppNavigator}
                            options={{ animation: 'fade' }}
                        />
                    )}
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
};
