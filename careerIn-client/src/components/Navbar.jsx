import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthContext";
import toast from "react-hot-toast";
import { FaLinkedin } from "react-icons/fa";


const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout()
            .then(() => {
                toast.success("Logout Successful");
            })
            .catch((error) => {
                toast.error(error.code || "Error Occurred");
            });
    };

    return (
        <div className="navbar bg-primary shadow-sm px-6 border-gray-200 fixed max-w-5xl justify-between">
    <div>
        <Link to={"/"} className="text-2xl font-bold text-white flex items-center gap-3">
            <FaLinkedin /> CareerIn
        </Link>
    </div>
    <div>
        {user && (
            <div className="flex gap-3 flex-wrap">
                <Link
                    className="px-4 py-2 btn-sm lg:btn-lg border text-indigo-600 bg-white rounded-md hover:bg-indigo-100"
                    to={"/profile"}
                >
                    Profile
                </Link>

                <button
                    onClick={handleLogout}
                    className="px-4 py-2 btn-sm lg:btn-lg border text-indigo-600 bg-white rounded-md hover:bg-indigo-100"
                >
                    Logout
                </button>
            </div>
        )}
    </div>
</div>

    );
};

export default Navbar;
