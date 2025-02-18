import ToastProvider from "../common/toast/toast-provider";
import useSocket from "../hook/useSocket";
import { AuthProvider } from "../provider/auth.provider";
import { UserProvider } from "../provider/user.provider";
import AppRoutes from "../routes/routes";


export function App() {
  useSocket();
  return (
    <>
      <AuthProvider>
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </AuthProvider>
      <ToastProvider />
    </>
  );
}

export default App;
