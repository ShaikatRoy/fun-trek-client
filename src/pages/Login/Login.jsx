import { useState } from 'react';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../providers/AuthProvider';

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit = (data) => {
    console.log(data);

    signIn(data.email, data.password).then((result) => {
      const user = result.user;
      console.log(user);
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <Helmet>
        <title>Fun Trek | Login</title>
      </Helmet>
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl mt-40">
        <div
          className="hidden bg-cover lg:block lg:w-1/2"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1527769929977-c341ee9f2033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80')",
          }}
        ></div>

        <form
          className="w-full px-6 py-8 md:px-8 lg:w-1/2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
            Welcome back!
          </p>

          <Link
            href="#"
            className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <div className="px-4 py-2">
              <svg className="w-6 h-6" viewBox="0 0 40 40">
                {/* Google icon path */}
              </svg>
            </div>

            <span className="w-5/6 px-4 py-3 font-bold text-center">
              Sign in with Google
            </span>
          </Link>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

            <Link
              href="#"
              className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              or login with email
            </Link>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>

          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="LoggingEmailAddress"
            >
              Email Address
            </label>
            <input
              id="LoggingEmailAddress"
              {...register('email')}
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="email"
            />
          </div>

          <div className="mt-4">
            <div className="flex justify-between">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="loggingPassword"
              >
                Password
              </label>
              <Link
                href="#"
                className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
              >
                Forget Password?
              </Link>
            </div>

            <div className="relative">
              <input
                id="loggingPassword"
                {...register('password')}
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type={passwordVisible ? 'text' : 'password'}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-700 dark:text-gray-300"
              >
                {passwordVisible ? <RiEyeOffLine /> : <RiEyeLine />}
              </button>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Sign In
            </button>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

            <Link
              to="/signUp"
              className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              or sign up
            </Link>

            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
