import { ReactNode, createContext, useContext, useState } from 'react';

type UserCredentials = {
    id: number;
    name: string;
    email: string;
};

type AuthContext = {
    isLoading: boolean;
    userCredentials: UserCredentials | null;
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
        useState<UserCredentials | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
