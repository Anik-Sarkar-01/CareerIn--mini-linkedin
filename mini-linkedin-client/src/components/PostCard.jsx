import { FaUser } from "react-icons/fa";

const PostCard = ({ post }) => {

    console.log(post);

    return (
        <div className="card bg-base-100 shadow-md border border-gray-200 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-3">
                <div className="avatar avatar-placeholder">
                    <div className="bg-primary text-neutral-content w-12 rounded-full">
                        <span><FaUser></FaUser></span>
                    </div>
                </div>
                <div>
                    <div className="font-semibold text-lg">{post.author}</div>
                    <div className="text-sm text-gray-500">{post.timeStamp}</div>
                </div>
            </div>
            <p className="text-base leading-relaxed">{post.content}</p>
        </div>
    );
};

export default PostCard;
