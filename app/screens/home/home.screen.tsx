import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/button';
import { useAuthContext } from '../../contexts/auth.context';
import { NavigationProp } from '@react-navigation/native';
import { AppStackParamList } from '../../navigators/navigation.types';

type HomeScreenProps = {
    navigation: NavigationProp<AppStackParamList>;
};

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
    const user = auth().currentUser;

    const { signOut } = useAuthContext();

    return (
        <SafeAreaView>
            <View>
                <TouchableOpacity
                    style={styles.roomBtnContainer}
                    onPress={() =>
                        navigation.navigate('Chatroom', {
                            roomId: 1,
                            name: 'Test',
                        })
                    }>
                    <Text style={styles.roomBtnText}>Chatroom 1</Text>
                    <Text>{'>'}</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text>HomeScreen</Text>
                <Text>Email: {user?.email}</Text>
                <Button title="Sign out" onPress={signOut} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    roomBtnContainer: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 16,
        margin: 8,
        flexDirection: 'row',
    },
    roomBtnText: {},
});
