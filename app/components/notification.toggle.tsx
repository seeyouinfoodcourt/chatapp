import {
    View,
    Text,
    StyleProp,
    ViewProps,
    Pressable,
    ViewStyle,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../assets/styles/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { usePushMessageContext } from '../contexts/push.message.context';

type NotificationToggleProps = {
    topic: string;
    style?: StyleProp<ViewStyle>;
};

const NotificationToggle = ({ topic, style }: NotificationToggleProps) => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const {
        pushEnabled,
        requestPermission,
        subscribeToTopic,
        unsubscribeFromTopic,
        checkTopicSubscription,
    } = usePushMessageContext();

    const toggleNotifications = async () => {
        if (!isSubscribed) {
            subscribeToTopic(topic);
            setIsSubscribed(true);
        } else {
            unsubscribeFromTopic(topic);
            setIsSubscribed(false);
        }
    };

    // Check if notifications are on
    useEffect(() => {
        console.log('notification toggle topic', topic);
        setIsSubscribed(checkTopicSubscription(topic));
    }, [topic]);

    return (
        <Pressable style={style} onPress={toggleNotifications}>
            <Icon
                name={isSubscribed ? 'notifications' : 'notifications-none'}
                size={24}
                color={Colors.white}
            />
        </Pressable>
    );
};

export default NotificationToggle;
