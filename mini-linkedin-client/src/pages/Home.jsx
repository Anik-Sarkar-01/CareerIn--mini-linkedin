import { useContext, useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import axios from 'axios';
import { format } from "date-fns"
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from "../provider/AuthContext";

const Home = () => {
    const {user} = useContext(AuthContext);

    console.log(user);
    const [posts, setPosts] = useState([]);

    const fetchPosts = () => {
        axios.get("http://localhost:3000/api/posts")
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
            });
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const content = e.target.postArea.value;

        axios.post("http://localhost:3000/api/posts", {
            author: user?.displayName,
            email: user?.email,
            content,
            timeStamp: format(new Date(), 'Pp')
        })
            .then((response) => {
                if (response.data.insertedId) {
                    toast.success('Post Added Successfully.');
                    fetchPosts(); 
                    e.target.reset();
                }
            })
            .catch(error => {
                console.error("Error posting:", error);
            });
    };


    return (
        <div className="bg-base-200 min-h-screen">
            <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
                <form onSubmit={handleSubmit} className="card bg-base-100 shadow-md p-4">
                    <textarea required name="postArea" placeholder="Start a post" className="textarea textarea-bordered w-full mb-3"></textarea>
                    <button className="btn btn-primary w-full">Post</button>
                </form>

                <div className="divider text-lg font-semibold">Posts</div>

                <div className="space-y-4">
                    {posts.map(post => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
            </div>
            <Toaster
                position="top-center"
                toastOptions={{
                    className: '',
                    duration: 3000,
                    removeDelay: 1000,
                    style: {
                        background: '#191E24',
                        color: '#fff',
                    },
                }}
            />

        </div>
    );
};

export default Home;
