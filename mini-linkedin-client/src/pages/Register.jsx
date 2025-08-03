import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthForm from "../components/AuthForm";
import { AuthContext } from "../provider/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isRedirecting, setIsRedirecting] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        setIsRedirecting(true); // show redirect message immediately

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
                            axios.post("http://localhost:3000/api/users", user)
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
        <div className="flex flex-col justify-center items-center min-h-screen bg-base-200">
            {!isRedirecting ? (
                <AuthForm
                    title="Register"
                    onSubmit={handleRegister}
                    buttonText="Register"
                />
            ) : (
                <div className="text-center p-4 text-lg font-semibold">
                    Redirecting to home page...
                </div>
            )}
            <Toaster></Toaster>
        </div>
    );
};

export default Register;
