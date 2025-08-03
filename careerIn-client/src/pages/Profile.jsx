import { FaUser } from "react-icons/fa";
import PostCard from "../components/PostCard";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState([]);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        axios.get(`https://mini-linkedin-server.vercel.app/api/users/${user?.email}`)
            .then(response => setUserInfo(response.data))
            .catch(error => toast.error("Error fetching user:", error));
    }, [user?.email]);

    useEffect(() => {
        axios.get(`https://mini-linkedin-server.vercel.app/api/posts/${user?.email}`)
            .then(response => setUserPosts(response.data))
            .catch(error => toast.error("Error fetching posts:", error));
    }, [user?.email]);

    return (
        <div className="bg-[#F1F5F9] min-h-screen">
            <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-5 mt-16">
                    <div className="flex items-center justify-center bg-indigo-600 text-white w-16 h-16 rounded-full text-2xl">
                        <FaUser />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-800">{userInfo?.name}</div>
                        <div className="text-sm text-gray-500">{userInfo?.email}</div>
                        {userInfo?.bio && (
                            <div className="mt-2 text-gray-600">{userInfo.bio}</div>
                        )}
                    </div>
                </div>

                {/* Divider */}
                <div className="text-slate-800 text-lg font-semibold flex items-center">
                    <div className="flex-grow border-t border-slate-300"></div>
                    <span className="px-4">Recent Posts</span>
                    <div className="flex-grow border-t border-slate-300"></div>
                </div>

                {/* User's Posts */}
                <div className="space-y-4">
                    {userPosts.map(post => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
            </div>

            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#111827',
                        color: '#fff',
                    },
                }}
            />
        </div>
    );
};

export default Profile;
