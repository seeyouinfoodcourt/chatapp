import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Alert, Platform } from 'react-native';
import {
    LoginManager,
    AccessToken,
    AuthenticationToken,
} from 'react-native-fbsdk-next';
import { sha256 } from 'react-native-sha256';
import uuid from 'react-native-uuid';

type AuthContext = {
    isLoading: boolean;
    userCredentials: FirebaseAuthTypes.User | null;
    signInWithProvider: (provider: 'facebook' | 'google') => void;
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

    /**
     * Sign in with Facebook credentials
     * Doesn't work on ios - Use signInWithFacebookLimited
     */
    const signInWithFacebook = async () => {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions([
            'public_profile',
            'email',
        ]);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccessToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(
            data.accessToken,
        );

        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
    };

    /**
     * Sign in with Facebook credentials on ios
     */
    const signInWithFacebookLimited = async () => {
        // Create a nonce and the corresponding
        // sha256 hash of the nonce
        const nonce = uuid.v4();
        const nonceString =
            typeof nonce === 'string' ? nonce : JSON.stringify(nonce);
        const nonceSha256 = await sha256(nonceString);
        // Attempt login with permissions and limited login
        const result = await LoginManager.logInWithPermissions(
            ['public_profile', 'email'],
            'limited',
            nonceSha256,
        );

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AuthenticationToken
        const data = await AuthenticationToken.getAuthenticationTokenIOS();

        if (!data) {
            throw 'Something went wrong obtaining authentication token';
        }

        // Create a Firebase credential with the AuthenticationToken
        // and the nonce (Firebase will validates the hash against the nonce)
        const facebookCredential = auth.FacebookAuthProvider.credential(
            data.authenticationToken,
            nonceString,
        );

        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
    };

    /**
     * Sign in with Google
     */
    const signInWithGoogle = async () => {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({
            showPlayServicesUpdateDialog: true,
        });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    };

    /**
     * Handles provider signin
     * @param provider 'facebook' or 'google'
     */
    const signInWithProvider = async (provider: 'facebook' | 'google') => {
        let signInMethod = undefined;
        switch (provider) {
            case 'facebook':
                signInMethod =
                    Platform.OS === 'ios'
                        ? signInWithFacebookLimited
                        : signInWithFacebook;
                break;
            case 'google':
                signInMethod = signInWithGoogle;
                break;
        }
        if (signInMethod === undefined) {
            throw new Error('Provider not supported');
        }

        try {
            return await signInMethod();
        } catch (error) {
            console.error(provider, 'Sign in failed - ', error);
            throw error;
        }
    };

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

    useEffect(() => {
        console.log('Credentials update: ', userCredentials);
    }, [userCredentials]);

    // Listen for changes in the auth state
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                userCredentials,
                signInWithProvider,
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
