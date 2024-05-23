import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Alert } from 'react-native';

type AuthContext = {
    isLoading: boolean;
    userCredentials: FirebaseAuthTypes.User | null;
    signOut: () => void;
};

type AuthProviderProps = {
    children: ReactNode;
};

const AuthContext = createContext({} as AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userCredentials, setUserCredentials] =
        useState<FirebaseAuthTypes.User | null>(null);

    // Update user state when auth state is changed
    const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
        console.log('on auth state changed', user?.metadata.creationTime);
        setUserCredentials(user);
        if (isLoading) setIsLoading(false);
    };

    useEffect(() => {
        console.log('Credentials update: ', userCredentials);
    }, [userCredentials]);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const signOut = () => {
        const handleSignOut = () => {
            auth()
                .signOut()
                .then(() => console.log('User signed out!'));

            if (
                auth().currentUser?.providerData[0].providerId === 'google.com'
            ) {
                GoogleSignin.revokeAccess();
            }
        };
        Alert.alert('Byeee', 'Do you wish to sign out?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Sign out',
                onPress: () => handleSignOut(),
                style: 'destructive',
            },
        ]);
    };
    return (
        <AuthContext.Provider
            value={{
                isLoading,
                userCredentials,
                signOut,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within a AuthProvider');
    }
    return context;
};
