
import { Link } from 'react-router';

const AppsNotFound = () => {
    return (
        <div className="min-h-screen flex justify-center items-center text-center">
            <div className='space-y-5'>
                <div>
                    
                </div>
                <div>
                    <h1 className='text-3xl text-black md:text-5xl font-semibold'>Oops, page not found!</h1>
                </div>
                <div>
                    <p className='text-gray-500'>The page you are looking for is not available.</p>
                </div>
                <div className="w-fit mx-auto">
                    <Link to={'/'}><button className='btn w-45 p-6 border-0 bg-green-700 rounded-lg hover:bg-green-600 transition shadow-md font-semibold text-white text-lg'>Go Back!</button></Link>
                </div>
            </div>
        </div>
    );
};

export default AppsNotFound;