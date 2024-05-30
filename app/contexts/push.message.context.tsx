import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { useAuthContext } from './auth.context';
import AsyncStorage from '@react-native-async-storage/async-storage';

type PushMessageContext = {
    pushEnabled: PushEnabled;
    requestPermission: () => Promise<boolean>;
    subscribeToTopic: (topic: string) => void;
    unsubscribeFromTopic: (topic: string) => void;
    checkTopicSubscription: (topic: string) => boolean;
};

type PushEnabled = boolean | undefined;

type PushMessageProviderProps = {
    children: ReactNode;
};

const PushMessageContext = createContext({} as PushMessageContext);

export const PushMessageProvider = ({ children }: PushMessageProviderProps) => {
    const { userCredentials } = useAuthContext();
    const [pushEnabled, setPushEnabled] = useState<PushEnabled>(undefined);
    const [pushTopics, setPushTopics] = useState<string[]>([]);

    const requestPermission = async () => {
        let enabled = false;

        if (Platform.OS === 'ios') {
            const authStatus = await messaging().requestPermission();
            enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        } else if (Platform.OS === 'android' && Platform.Version >= 33) {
            const hasAndroidPermission = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            );

            if (!hasAndroidPermission) {
                const requestStatus = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                );

                enabled = requestStatus === 'granted';
            } else {
                enabled = true;
            }
        } else {
            enabled = true;
        }

        return enabled;
    };

    const subscribeToTopic = async (topic: string) => {
        if (checkTopicSubscription(topic)) {
            return;
        }
        try {
            await messaging().subscribeToTopic(topic);
            setPushTopics(prevState => [...prevState, topic]);
        } catch (error) {
            console.error(error);
        }
    };

    const unsubscribeFromTopic = async (topic: string) => {
        await messaging().unsubscribeFromTopic(topic);
        const topics = pushTopics.filter(element => element !== topic);
        setPushTopics(topics);
    };

    const checkTopicSubscription = (topic: string) => {
        const isSubscribed = pushTopics.includes(topic);
        console.log('checking subs', topic, isSubscribed);
        return isSubscribed;
    };

    const storePushTopics = async () => {
        try {
            await AsyncStorage.setItem(
                'pushTopics',
                JSON.stringify(pushTopics),
            );
        } catch (e) {
            console.error(e);
        }
    };

    const getPushTopics = async () => {
        console.log('get push topics triggered');
        try {
            const jsonValue = await AsyncStorage.getItem('pushTopics');
            const parsedValue = jsonValue != null ? JSON.parse(jsonValue) : [];
            console.log('getpushtopics jsonvalue', jsonValue);
            console.log('getpushtopics parsedvaluevalue', parsedValue);
            console.log(Array.isArray(parsedValue));
            if (Array.isArray(parsedValue)) setPushTopics(parsedValue);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getPushTopics();
    }, []);

    useEffect(() => {
        console.log('context pushtopics', pushTopics);
        storePushTopics();
    }, [pushTopics]);

    /**
     * Ask for push permissions when user is logged in
     */
    useEffect(() => {
        if (!userCredentials) {
            return;
        }
        const checkPushPermission = async () => {
            const enabled = await requestPermission();
            if (enabled) {
                const token = await messaging().getToken();
                console.log('token', token);
            }
            setPushEnabled(enabled);
        };
        checkPushPermission();
    }, [userCredentials]);

    return (
        <PushMessageContext.Provider
            value={{
                pushEnabled,
                requestPermission,
                subscribeToTopic,
                unsubscribeFromTopic,
                checkTopicSubscription,
            }}>
            {children}
        </PushMessageContext.Provider>
    );
};
export const usePushMessageContext = () => {
    const context = useContext(PushMessageContext);
    if (context === undefined) {
        throw new Error(
            'usePushMessageContext must be used within a PushMessageProvider',
        );
    }
    return context;
};
