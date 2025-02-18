import Chat from "../components/chat";
import UserList from "../components/user-list";

function ChatPage() {
    return (
        <>
            <div className="w-full h-[100vh] flex justify-center items-center">
                <div className="rounded-2xl w-[90vw] h-[90vh] bg-black-opacity-3 flex backdrop-blur-xs max-md:flex-col">
                    <div className="w-[20%] max-md:w-full max-md:h-[30%]">
                        <UserList />
                    </div>
                    <div className="flex-1 max-md:h-[70%]">
                        <Chat />
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default ChatPage;