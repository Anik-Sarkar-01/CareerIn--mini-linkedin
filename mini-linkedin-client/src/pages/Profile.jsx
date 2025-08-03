import { FaUser } from "react-icons/fa";
import PostCard from "../components/PostCard";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState([]);
    const [userPosts, setUserPosts] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/users/${user?.email}`)
            .then(response => {
                setUserInfo(response.data);
            })
            .catch(error => {
                toast.error("Error fetching user:", error);
            });
    }, [user?.email])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/posts/${user?.email}`)
            .then(response => {
                setUserPosts(response.data);
            })
            .catch(error => {
                toast.error("Error fetching posts:", error);
            });
    }, [user?.email])


    return (
        <div className="bg-base-200 min-h-screen">
            <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
                {/* Profile Card */}
                <div className="card bg-base-100 shadow-md p-6 flex items-center text-center space-x-4">
                    <div className="avatar avatar-placeholder">
                        <div className="bg-primary text-neutral-content w-12 rounded-full">
                            <span><FaUser></FaUser></span>
                        </div>
                    </div>
                    <div>
                        <div className="text-xl font-bold">{userInfo?.name}</div>
                        <div className="text-sm text-gray-500">{userInfo?.email}</div>
                        <div className="mt-2">{userInfo?.bio}</div>
                    </div>
                </div>

                {/* User's Posts */}
                <div className="divider text-lg font-semibold">Posts</div>
                <div className="space-y-4">
                    {userPosts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
            <Toaster></Toaster>
        </div>
    );
};

export default Profile;
