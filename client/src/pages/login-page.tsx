import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../provider/auth.provider';
function LoginPage() {
    const navigate = useNavigate();
    const { login, loadingLogin } = useAuth();
    const [username, setUsername] = useState<string>("");
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if(username.trim() === ""){
                toast.info("Please enter username!")
                return
            }
            await login(username);
            toast.success('Login Success!')
            navigate('/chat-page');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="w-full h-[100vh] flex justify-center items-center">
                <div className="w-60 h-60 bg-black-opacity-3 flex-col flex justify-center items-center gap-3.5 rounded-2xl">
                    <h1 className="text-white text-2xl">Login</h1>
                    <input value={username} onChange={(e) => { setUsername(e.target.value) }} type="text" className="rounded bg-white p-1" placeholder="Enter your username" />
                    {loadingLogin ?
                        <div className="h-full flex justify-center items-center"><AiOutlineLoading3Quarters className="animate-spin size-7" color="white" /></div> : <button className="rounded cursor-pointer text-white bg-primary px-4 py-2 hover:opacity-80">Login</button>}
                </div>
            </div>
        </form>

    );
}

export default LoginPage;