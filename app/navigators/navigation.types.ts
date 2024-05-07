import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
    Splash: {};
    Auth: NavigatorScreenParams<AuthStackParamList>;
    App: NavigatorScreenParams<AppStackParamList>;
};

export type AuthStackParamList = {
    Signin: undefined;
};

export type AppStackParamList = {
    Home: undefined;
    Chatroom: { roomId: number; name: string };
};
