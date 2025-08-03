import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
    const {user, logout} = useContext(AuthContext);

    const handleLogout = () => {
        logout()
        .then(() => {
            toast.success("Logout Successful")
        })
        .catch((error) => {
            toast.error(error.code || "Error Occurred")
        })
    }

    return (
        <div className="navbar bg-base-100 shadow-sm px-6">
            <div className="flex-1">
                <Link to={"/"} className="text-2xl font-bold text-primary">LinkedIn</Link>
            </div>
            <div className="flex gap-3">
                 <Link className="btn btn-outline btn-primary" to={"/profile"}>Profile</Link> 
                 {user && <button onClick={handleLogout} className="btn btn-outline btn-primary">Logout</button> }
            </div>
        </div>
    );
};

export default Navbar;
