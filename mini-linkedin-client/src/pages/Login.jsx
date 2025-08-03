import AuthForm from "../components/AuthForm";
import { toast, Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthContext";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isRedirecting, setIsRedirecting] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsRedirecting(true);

        const email = e.target.email.value;
        const password = e.target.password.value;

        login(email, password)
            .then((res) => {
                if (res?.user) {
                    toast.success("Login Successful.");
                    setIsRedirecting(false);
                    navigate(location?.state ? location.state : "/");
                } else {
                    setIsRedirecting(false);
                    toast.error("Login failed");
                }
            })
            .catch((error) => {
                setIsRedirecting(false);
                toast.error(error?.message || "Login failed");
            });
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-base-200">
            {!isRedirecting ? (
                <AuthForm title="Login" onSubmit={handleLogin} buttonText="Login" />
            ) : (
                <div className="text-center p-4 text-lg font-semibold">
                    Redirecting to homepage...
                </div>
            )}
            <Toaster />
        </div>
    );
};

export default Login;
