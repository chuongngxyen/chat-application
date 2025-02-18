import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { USER } from "../enums/user";
import { IUser, loginRequest, logoutRequest } from "../requests/auth.request";
import socketIO from "../utils/socket";
interface IAuthContext {
    loginUser: IUser | null;
    login: (username: string) => Promise<void>;
    logout: () => Promise<void>;
    loadingLogin: boolean
}

const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [loginUser, setLoginUser] = useState<IUser | null>(() => {
        const user = sessionStorage.getItem(USER.USER);
        return user ? JSON.parse(user) : null;
    });
    const [loadingLogin, setLoadingLogin] = useState<boolean>(false)

    const login = async (username: string) => {
        try {
            setLoadingLogin(true)
            const result = await loginRequest({ username })
            if (!result.data) {
                throw new Error('User is online or can find user');
            }
            socketIO.emit("user:login", result.data)
            sessionStorage.setItem(USER.USER, JSON.stringify(result.data))
            setLoginUser(result.data);
        } catch (error) {
            console.log(error)
        }
        setLoadingLogin(false)
    };

    const logout = async () => {
        try {
            if (loginUser) {
                const result = await logoutRequest({ userId: loginUser.id })
                toast.success(result.data.message)
                sessionStorage.removeItem(USER.USER)
            }
            else {
                throw new Error('Dont have user to logout!')
            }

        } catch (error) {
            toast.error('Can logout!');
            console.log(error);
        }
    };


    useEffect(() => {
        const userData = sessionStorage.getItem(USER.USER)
        
        if (userData) {
            const user: IUser = JSON.parse(userData)
            socketIO.emit("user:login", user)
        }
    }, [])

    return (
        <AuthContext.Provider value={{ loginUser: loginUser, login, logout, loadingLogin }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("dont have auth data!")
    }
    return ctx
}