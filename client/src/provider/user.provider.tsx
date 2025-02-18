import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { IUser } from "../requests/auth.request";
import { getUsersOnline } from "../requests/user.request";

interface IUserContext{
    users: IUser[];
    userSelected: IUser|null;
    setUserSelected: (user:IUser) => void;
    setUserOnline: (users:IUser[]) => void;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider = ({ children }:{ children: ReactNode })=>{
    const [usersOnline, setUserOnline] = useState<IUser[]>([]);
    const [userSelected, setUserSelected] = useState<IUser|null>(null);

    const updateUserSelected = (user: IUser)=>{
        setUserSelected(user);
    }

    const getUsers = async () =>{
        try {
            const result = await getUsersOnline();
            const users = result.data;
                    
            setUserOnline(users);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
      getUsers()
    }, [])

    return (
        <UserContext.Provider value={{ users:usersOnline, userSelected, setUserSelected: updateUserSelected, setUserOnline }}>
            {children}
        </UserContext.Provider>
    )

}

export const useUsers = () =>{
    const ctx = useContext(UserContext);
    if(!ctx){
        throw new Error("Dont have user data!")
    }
    return ctx;
}