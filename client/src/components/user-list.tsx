
import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { useAuth } from "../provider/auth.provider";
import { useUsers } from "../provider/user.provider";
import { IUser } from "../requests/auth.request";


function UserList() {
    const { loginUser } = useAuth();
    const { users, setUserSelected } = useUsers();
    const [userList, setUserList] = useState<IUser[]>([])
    
    const handleGetUserChatWith = (user: IUser) => {
        setUserSelected(user)
    }
    const UserItem = ({ user }: { user: IUser }) => {        
        return (
            <>
                <div className="flex rounded gap-4.5 items-center select-none px-3.5 py-2 hover:bg-hover" onClick={() => { handleGetUserChatWith(user) }}>
                    <div className="relative p-1">
                        <img className="rounded-full w-14" src={"images/avatar.jpg"} alt="avatar" />
                        {user.online && <div className="absolute bottom-[-5px] right-0"><GoDotFill className="w-6 h-6" color="#3fbb46" /></div>}
                    </div>
                    <div className="w-full font-bold text-sm text-white truncate">{user.username}</div>
                </div>
            </>
        )
    }
    useEffect(()=>{
        const userNotMe = users.filter(user => user.id !== loginUser?.id)
        setUserList(userNotMe)
    },[users])
    return (
        <>
            <div className="h-full flex flex-col gap-5 border-r-2 border-r-black-opacity-3 py-2.5 max-md:border-none max-md:gap-3">
                {/* my profile */}
                <div className="flex gap-4.5 items-center select-none px-2.5">
                    <img className="rounded-full size-13" src={"images/avatar.jpg"} alt="avatar" />
                    <div className="font-bold text-xl text-white truncate">{loginUser?.username}</div>
                </div>
                {/* user online list */}
                <div className="flex gap-3 flex-col mt-5 h-full overflow-y-auto max-md:border-b-2 max-md:border-black-opacity-3 max-md:mt-2">
                    {userList.map((user, index) => {
                        return (
                            <UserItem user={user} key={index} />
                        )
                    })}
                </div>
            </div>
        </>
    );
}

export default UserList;