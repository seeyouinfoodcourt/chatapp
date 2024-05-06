import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

type AuthContext = {
    isLoading: boolean;
    userCredentials: FirebaseAuthTypes.User | null;
    clearCredentials: () => void;
};

type AuthProviderProps = {
    children: ReactNode;
};

const AuthContext = createContext({} as AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const mockdata = {
        id: 666,
        name: 'Broder Salsa',
        email: 'broder@salsa.dk',
    };
    const [userCredentials, setUserCredentials] =
        useState<FirebaseAuthTypes.User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Handle user state changes
    const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
        setUserCredentials(user);
        if (isLoading) setIsLoading(false);
    };

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const clearCredentials = () => {
        setUserCredentials(null);
    };
    return (
        <AuthContext.Provider
            value={{ isLoading, userCredentials, clearCredentials }}>
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
