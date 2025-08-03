import { Link } from "react-router-dom";

const AuthForm = ({ title, onSubmit, buttonText }) => {
    return (
        <div className="max-w-sm mx-auto card bg-base-100 shadow-md p-6 space-y-4">
            <h2 className="text-2xl font-bold text-center">{title}</h2>
            <form onSubmit={onSubmit} className="space-y-4">
                <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" required />
                <input type="password" name="password" placeholder="Password" className="input input-bordered w-full" required />
                {title === "Register" && (
                    <>
                        <input type="text" name="name" placeholder="Full Name" className="input input-bordered w-full" required />
                        <textarea name="bio" placeholder="Short Bio" className="textarea textarea-bordered w-full"></textarea>
                    </>
                )}
                <button type="submit" className="btn btn-primary w-full">{buttonText}</button>
                {title === "Login" && (
                    <>
                        <p className="text-center">Don't have an account? <Link className="btn btn-primary" to={"/register"}>Register</Link></p>
                    </>
                )}
                {title === "Register" && (
                    <>
                        <p className="text-center">Already have an account? <Link className="btn btn-primary" to={"/login"}>Login</Link></p>
                    </>
                )}
            </form>
        </div>
    );
};

export default AuthForm;
