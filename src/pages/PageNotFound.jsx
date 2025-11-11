
import { Link } from 'react-router';
import MyContainer from '../components/MyContainer';

const PageNotFound = () => {
    return (
        <div className="h-screen flex justify-center items-center text-center py-10">
            <MyContainer>
                <div className='space-y-5 text-center'>
                <h2 className='text-[200px] text-green-700'>404</h2>
                <div>
                    <h1 className='text-3xl text-green-700 md:text-5xl font-semibold'>Oops, page not found!</h1>
                </div>
                <div>
                    <p className='text-gray-500'>The page you’re looking for doesn’t exist or has been moved.</p>
                </div>
                <div className="w-fit mx-auto">
                    <Link to={'/'}><button className='btn w-45 p-6 border-0 bg-green-700 hover:bg-green-600 font-semibold text-white text-[17px]'>Back to Home!</button></Link>
                </div>
            </div>
            </MyContainer>
        </div>
    );
};

export default PageNotFound;