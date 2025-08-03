import Lottie from 'lottie-react';
import paperPlane from "../assets/lottie/PaperPlane.json"
const Loading = () => {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <Lottie className="w-60" animationData={paperPlane} loop={true} />
        </div>
    );
};

export default Loading;