import { useContext, useState } from 'react';
import { FaGithub, FaRegEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../provider/AuthProvider';
import { useForm } from 'react-hook-form';
import { IoEyeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
    const { signInUserByEmail, createUserByGithub, setLoading, loading, createUserByGoogle } = useContext(AuthContext);
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [closed, setClosed] = useState(false);
    const [signInError, setSignInError] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        // console.log(data)
        const email = data.email;
        const password = data.password;
        // create user by email and pass
        signInUserByEmail(email, password)
            .then(result => {
                // console.log(result.user);
                console.log('sign in successfully');
                Swal.fire({
                    title: "Success",
                    text: "Logged in Successfully!",
                    icon: "success"
                });
                setLoading(false);
                setSignInError(null);
                reset();
                navigate('/');
            })
            .catch(error => {
                console.log(error.message);
                // setSignInError(error.message);
                setLoading(false)
                if (error.message.includes('auth/invalid-credential')) {
                    return setSignInError('Incorrect email or password');
                }
                return setSignInError('Something went wrong!');
            })
        reset
    };
    // sign in with google
    const handleGoogleSingIn = () => {
        createUserByGoogle()
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    title: "Success",
                    text: "Logged in Successfully!",
                    icon: "success"
                });
                setLoading(false);
                navigate('/')
            })
            .catch(error => {
                console.log(error);

            })
    }
    const handleGithubSingIn = () => {
        createUserByGithub()
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    title: "Success",
                    text: "Logged in Successfully!",
                    icon: "success"
                });
                setLoading(false);
                navigate('/')
            })
            .catch(error => {
                console.log(error);
            })
    }
    if (loading) {
        return <p className=" text-xl w-full flex h-screen justify-center items-center">loading...</p>
    }
    return (
        <div className='w-3/4 md:w-2/3 lg:w-1/3 mx-auto shadow-lg my-16 p-9 font-roboto '>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div className='flex flex-col gap-2'>
                    <span className='text-red-500'>{signInError && signInError}</span>
                    <label htmlFor="email">Email</label>
                    <input {...register('email', { required: true })} className='px-3 py-2 bg-gray-100' id='email' type="email" placeholder='Email' />
                    {errors.email && <span className='text-red-500'>This field is required</span>}
                </div>
                <div className='flex flex-col gap-2 relative'>
                    <label htmlFor="password">Password</label>
                    <input {...register('password', { required: true })} className='px-3 py-2 bg-gray-100' id='password' type={`${!closed ? 'password' : 'text'}`} placeholder='Password' />
                    <span onClick={() => setClosed(!closed)} className='absolute right-2 top-11'>{!closed ? <FaRegEyeSlash /> : <IoEyeOutline />}</span>
                    {errors.password && <span className='text-red-500'>This field is required</span>}
                </div>
                <input className='w-full py-2 rounded bg-[#373A40] text-white hover:bg-[#0C0C0C]' value='Log In' type="submit" />
            </form>
            <div className='w-full text-center space-y-4 mt-4'>
                <p className=''>Or</p>
                <button onClick={handleGoogleSingIn} className='flex justify-center items-center py-2 bg-gray-100 rounded w-full gap-4 hover:bg-gray-200'>
                    <span className='text-2xl'><FcGoogle /></span>
                    <span className=''>Google</span>
                </button>
                <button onClick={handleGithubSingIn} className='flex justify-center items-center py-2 bg-gray-100 rounded w-full gap-4 hover:bg-gray-200'>
                    <span className='text-2xl'><FaGithub /></span>
                    <span className=''>GitHub</span>
                </button>
            </div>
        </div>
    );
};

export default Login;