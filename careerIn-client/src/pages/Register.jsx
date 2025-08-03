import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthForm from "../components/AuthForm";
import { AuthContext } from "../provider/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import Lottie from "lottie-react";
import registerLottie from "../assets/lottie/Registration.json";
import flyingPlaneLottie from "../assets/lottie/FlyingPlane.json";

const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isRedirecting, setIsRedirecting] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        setIsRedirecting(true);

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const name = form.name.value;
        const bio = form.bio.value;

        createUser(email, password)
            .then((res) => {
                if (res.user) {
                    updateUserProfile(name)
                        .then(() => {
                            const user = { name, email, bio };
                            axios.post("https://mini-linkedin-server.vercel.app/api/users", user)
                                .then((response) => {
                                    if (response.data.insertedId) {
                                        toast.success("Registered Successfully!");
                                        form.reset();
                                        setIsRedirecting(false);
                                        navigate("/");
                                    } else {
                                        toast.error(response.data.message || "Registration Failed");
                                        setIsRedirecting(false);
                                    }
                                })
                                .catch((err) => {
                                    toast.error(err.response?.data?.message || "Failed to save user data");
                                    setIsRedirecting(false);
                                });
                        })
                        .catch(() => setIsRedirecting(false));
                } else {
                    setIsRedirecting(false);
                }
            })
            .catch((error) => {
                toast.error(error?.message || "Registration failed");
                setIsRedirecting(false);
            });
    };

    return (
        <div
            className="flex flex-col justify-center items-center min-h-screen bg-[#F9FAFB] pt-16"
        >
            <h1
                className="text-center text-2xl p-3 border-b-4 mb-5 border-b-[#4F46E5] font-bold text-indigo-600"
            >
                Please Register Here..
            </h1>
            {!isRedirecting ? (
                <div
                    className="flex justify-center items-center gap-5 pt-10 p-6 rounded shadow"
                >
                    <Lottie className="w-md hidden lg:block" animationData={registerLottie} loop={true} />
                    <AuthForm
                        title="Register"
                        onSubmit={handleRegister}
                        buttonText="Register"
                        buttonStyle={{
                            backgroundColor: "#4F46E5", // Indigo-600 button bg
                            color: "white",
                            borderRadius: "0.375rem"
                        }}
                        buttonHoverStyle={{
                            backgroundColor: "#4338CA" // Indigo-700 hover
                        }}
                        textPrimary="#111827"
                        textSecondary="#6B7280"
                        borderColor="#E5E7EB"
                    />
                </div>
            ) : (
                <div
                    className="text-center p-4 text-lg font-semibold"
                    style={{ color: "#4F46E5" }}
                >
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

export default Register;
