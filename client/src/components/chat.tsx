import clsx from "clsx";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Tooltip } from 'react-tooltip';
import { useAuth } from "../provider/auth.provider";
import { useUsers } from "../provider/user.provider";
import { IMessage, getMessageHistoryRequest } from "../requests/message.request";
import socketIO from "../utils/socket";
const Message = ({ message, isMyMessage }: { message: string, isMyMessage: boolean }) => {
    return (
        <>
            <div className={clsx("flex gap-2 items-end", isMyMessage ? "justify-end" : "")}>
                {!isMyMessage && <div className="w-8"><img className="rounded-full" src={"images/avatar.jpg"} alt="avatar" /></div>}
                <div className={clsx("text-white rounded-2xl py-2 px-3 max-w-[40%] max-md:text-sm", isMyMessage ? "bg-primary" : "bg-friend-message")}>{message}</div>
            </div>
        </>
    )
}

function Chat() {
    const [chatText, setChatText] = useState<string>('');
    const [messages, setMessages] = useState<IMessage[]>([])
    const { logout, loginUser } = useAuth();
    const { userSelected, setUserOnline } = useUsers()
    const [loadingMessage, setLoadingMessage] = useState<boolean>(false)
    const navigate = useNavigate();
    const logoutHandle = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const getMessageHistory = async () => {
        try {
            setLoadingMessage(true)
            if (loginUser?.id && userSelected?.id) {
                const result = await getMessageHistoryRequest(loginUser.id, userSelected.id);
                setMessages(result.data)
            }
        } catch (error) {
            console.log(error)
        }
        setLoadingMessage(false)
    }

    const chatSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (userSelected) {
            if(chatText.trim() === ""){
                toast.info("Please enter message!")
                return
            }
            const message = {
                receiver: {
                    id: userSelected.id,
                    username: userSelected.username
                },
                message: chatText.trim()
            }
            socketIO.emit("message:send", message,)
        }
        setChatText("")

    }


    const handleMessageReceive = (message: IMessage) => {
        if (message.sender.id === loginUser?.id || message.receiver.id === loginUser?.id) {
            setMessages((prevMessages) => [...prevMessages, message]);
        }
    };

    useEffect(() => {
        socketIO.on("error", (error) => {
            console.log(error);
        })
        socketIO.on("message:receive", (message: any) => {
            handleMessageReceive(message.data)
        })
        socketIO.on("usersOnline", (data) => {
            setUserOnline(data.data)
        })
    }, [])

    useEffect(() => {
        getMessageHistory();
    }, [userSelected])

    useEffect(() => {
        const endOfMessages = document.getElementById('end-of-messages');
        if (endOfMessages) {
            endOfMessages.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);
    return (
        <>
            <Tooltip id="logout-icon" />
            <div className="h-full flex flex-col">
                {/* user who chat with u */}
                <div className="border-b-2 border-black-opacity-3 select-none py-5 px-5 flex justify-between max-md:py-3">
                    <span className="text-white text-xl font-bold">{userSelected?.username}</span>
                    <div data-tooltip-id="logout-icon" data-tooltip-content="Logout" className="cursor-pointer" onClick={logoutHandle}><CiLogout className="size-6" color="white" /></div>

                </div>
                {/* chat field */}
                {userSelected && loginUser ? <div className="flex-1 pl-2 pr-3 py-2 overflow-y-auto">
                    {loadingMessage ? <div className="h-full flex justify-center items-center"><AiOutlineLoading3Quarters className="animate-spin size-7" color="white" /></div> : <div className="flex flex-col gap-1">
                        {messages.map((message, index) => {
                            const isMyMessage = message.sender.id === loginUser?.id
                            const isUserSelected = message.sender.id === userSelected.id || message.receiver.id === userSelected.id 
                            if (isUserSelected) {
                                return (
                                    <Message isMyMessage={isMyMessage} message={message.message} key={index} />
                                )
                            }
                            return
                        })}
                        <div id="end-of-messages" />
                    </div>}
                </div> : <div className="flex-1" />}
                {/* chat enter field */}
                <div className="border-t-2 border-black-opacity-3 py-5 px-5">
                    <form onSubmit={chatSubmit} className="flex gap-4 items-center">
                        <input disabled={userSelected ? false : true} type="text" value={chatText} onChange={(e) => { setChatText(e.target.value) }} className="w-full rounded bg-white px-3 py-2.5" placeholder="Enter your chat" />
                        <button><IoMdSend className="size-9 cursor-pointer" color="#0FD0C0" /></button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Chat;