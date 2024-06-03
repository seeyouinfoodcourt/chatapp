import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Alert } from 'react-native';
import { useAuthContext } from './auth.context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    getPushToken,
    requestPermission,
    subscribeToTopic,
    unsubscribeFromTopic,
} from '../services/push.service';

type PushMessageContext = {
    subscribeToPushTopic: (topic: string) => void;
    unsubscribeFromPushTopic: (topic: string) => void;
    checkTopicSubscription: (topic: string) => boolean;
};

type PushMessageProviderProps = {
    children: ReactNode;
};

const PushMessageContext = createContext({} as PushMessageContext);

export const PushMessageProvider = ({ children }: PushMessageProviderProps) => {
    const { userCredentials } = useAuthContext();
    const [pushEnabled, setPushEnabled] = useState(false);
    const [pushTopics, setPushTopics] = useState<string[]>([]);
    const storageKey = userCredentials?.uid + '/pushSubscriptions';

    const subscribeToPushTopic = async (topic: string) => {
        try {
            console.log('context subscribe', topic);
            await subscribeToTopic(topic);
            setPushTopics(prev => {
                storePushTopics([...prev, topic]);
                return [...prev, topic];
            });
        } catch (error) {
            Alert.alert('Push error', 'Failed to subscribe');
        }
    };

    const unsubscribeFromPushTopic = async (topic: string) => {
        try {
            await unsubscribeFromTopic(topic);
            const topics = pushTopics.filter(element => element !== topic);
            setPushTopics(topics);
            storePushTopics(topics);
        } catch (error) {
            Alert.alert('Push error', 'Failed to unsubscribe');
        }
    };

    // Store the push topic array in async storage
    const storePushTopics = async (topics: string[]) => {
        try {
            console.log('store topics try', topics, storageKey);
            await AsyncStorage.setItem(storageKey, JSON.stringify(topics));
        } catch (e) {
            console.error(e);
        }
    };
    //Check if topic is already in subscription array
    const checkTopicSubscription = (topic: string) => {
        const isSubscribed = pushTopics.includes(topic);
        console.log('checking subs', topic, isSubscribed);
        return isSubscribed;
    };

    // Load push topics from async storage
    useEffect(() => {
        const loadPushTopics = async () => {
            console.log('get push topics triggered', storageKey);
            const storedTopics = await AsyncStorage.getItem(storageKey);
            console.log('asyncresult', storedTopics);
            if (storedTopics) {
                setPushTopics(JSON.parse(storedTopics));
            }
        };
        loadPushTopics();
    }, [userCredentials]);

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
                const token = await getPushToken();
                console.log('token', token);
            }
            setPushEnabled(enabled);
        };
        checkPushPermission();
    }, [userCredentials]);

    return (
        <PushMessageContext.Provider
            value={{
                subscribeToPushTopic,
                unsubscribeFromPushTopic,
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
