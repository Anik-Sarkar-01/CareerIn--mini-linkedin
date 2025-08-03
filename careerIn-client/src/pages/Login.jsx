import AuthForm from "../components/AuthForm";
import { toast, Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthContext";
import Lottie from "lottie-react";
import loginLottie from "../assets/lottie/Login.json";
import flyingPlaneLottie from "../assets/lottie/FlyingPlane.json";

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
        <div className="flex flex-col justify-center items-center min-h-screen bg-[#F9FAFB] pt-16">
            <h1 className="text-center text-2xl p-3 border-b-4 border-b-[#4F46E5] mb-5 font-bold text-indigo-600">
                Please Login to Continue..
            </h1>

            {!isRedirecting ? (
                <div className="flex justify-center items-center gap-5 p-6 rounded shadow-xl bg-white">
                    <Lottie className="w-md hidden lg:block" animationData={loginLottie} loop={true} />
                    <AuthForm
                        title="Login"
                        onSubmit={handleLogin}
                        buttonText="Login"
                    />
                </div>
            ) : (
                <div>
                    <Lottie className="w-60" animationData={flyingPlaneLottie} loop={true} />
                </div>
            )}
            <Toaster
                toastOptions={{
                    style: {
                        background: "#FFFFFF",
                        color: "#111827",
                        border: "1px solid #E5E7EB"
                    }
                }}
            />
        </div>
    );
};

export default Login;
