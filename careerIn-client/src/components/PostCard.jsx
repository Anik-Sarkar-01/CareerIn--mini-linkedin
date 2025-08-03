import axios from "axios";
import { useState } from "react";
import { FaUser, FaRegThumbsUp } from "react-icons/fa";

const PostCard = ({ post }) => {
    const [totalLikes, setTotalLikes] = useState(post?.likesCount || 0);

    const handleLike = (id) => {
        axios.patch(`https://mini-linkedin-server.vercel.app/api/posts/${id}`)
            .then(response => {
                if (response.data.modifiedCount > 0) {
                    setTotalLikes(totalLikes + 1);
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-200">
            <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center justify-center bg-indigo-600 text-white w-12 h-12 rounded-full">
                    <FaUser />
                </div>
                <div>
                    <div className="font-semibold text-lg text-gray-800">{post.author}</div>
                    <div className="text-sm text-gray-500">{post.timeStamp}</div>
                </div>
            </div>

            <p className="text-gray-700 text-base leading-relaxed mb-4">{post.content}</p>

            <div className="flex space-x-6 border-t border-slate-300 pt-3 text-sm text-gray-500">
                <button
                    onClick={() => handleLike(post._id)}
                    className="flex items-center space-x-2 hover:text-indigo-600 transition-colors"
                >
                    <FaRegThumbsUp />
                    <span>Like</span>
                    <span>({totalLikes})</span>
                </button>
            </div>
        </div>
    );
};

export default PostCard;
