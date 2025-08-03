import { useContext, useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import axios from 'axios';
import { format } from "date-fns"
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from "../provider/AuthContext";

const Home = () => {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);

    const fetchPosts = () => {
        axios.get("https://mini-linkedin-server.vercel.app/api/posts")
            .then(response => setPosts(response.data))
            .catch(error => console.error("Error fetching posts:", error));
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const content = e.target.postArea.value;

        axios.post("https://mini-linkedin-server.vercel.app/api/posts", {
            author: user?.displayName,
            email: user?.email,
            content,
            likesCount: 0,
            timeStamp: format(new Date(), 'Pp')
        })
            .then((response) => {
                if (response.data.insertedId) {
                    toast.success('Post Added Successfully.');
                    fetchPosts();
                    e.target.reset();
                }
            })
            .catch(error => console.error("Error posting:", error));
    };

    return (
        <div className="bg-[#F1F5F9] min-h-screen">
            <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-5 space-y-3 mt-16">
                    <textarea
                        required
                        name="postArea"
                        placeholder="Start a post.."
                        className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    ></textarea>
                    <button
                        className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                        Post
                    </button>
                </form>

                <div className="text-slate-800 text-lg font-semibold flex items-center">
                    <div className="flex-grow border-t border-slate-300"></div>
                    <span className="px-4">Posts</span>
                    <div className="flex-grow border-t border-slate-300"></div>
                </div>

                <div className="space-y-4">
                    {posts.map(post => (
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

export default Home;
