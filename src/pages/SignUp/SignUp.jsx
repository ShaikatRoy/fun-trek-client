import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { register, handleSubmit, reset, formState: { errors }, getValues } = useForm();
  const { createUser,  updateUserProfile } = useContext(AuthContext);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const onSubmit = data => {
    const { password, confirmPassword } = data;
    
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    
    setPasswordError("");

    console.log(data);
    createUser(data.email, data.password)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
        updateUserProfile(data.name, data.photoURL)
        .then(() => {
            console.log('user profile info updated')
            reset();
            Swal.fire({
                icon: 'success',
                title: 'User created Successfully.',
                showConfirmButton: false,
                timer: 1500
              });
              navigate('/');
        })
        .catch(error => console.log(error))
      });
  };

  return (
    <>
      <Helmet>
        <title>Fun Trek | Sign Up</title>
      </Helmet>
      <section className="bg-white dark:bg-gray-900 rounded-2xl">
        <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
            <div className="flex items-center justify-center mt-6">
              <a href="#" className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white">
                sign up
              </a>
            </div>

            <div className="form-control mt-8">
              <input
                type="text"
                {...register("name", { required: true })}
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Username"
              />
              {errors.name && <span className="text-red-500">Name is required</span>}
            </div>

            <div className="form-control mt-8">
              <input
                type="text"
                {...register("photoURL", { required: true })}
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Photo URL"
              />
              {errors.photoURL && <span className="text-red-500">Photo URL is required</span>}
            </div>

            <div className="form-control mt-6">
              <input
                type="email"
                {...register("email", { required: true })}
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Email address"
              />
              {errors.email && <span className="text-red-500">Email is required</span>}
            </div>

            <div className="form-control mt-4">
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                })}
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Password"
              />
              {errors.password?.type === 'required' && <span className="text-red-500">Password is required</span>}
              {errors.password?.type === 'minLength' && <span className="text-red-500">Password must be at least 6 characters</span>}
              {errors.password?.type === 'maxLength' && <span className="text-red-500">Password must be less than 20 characters</span>}
              {errors.password?.type === 'pattern' && <span className="text-red-500">Password must have one lowercase, one uppercase, one number, and one special character</span>}
            </div>

            <div className="form-control mt-4">
              <input
                type="password"
                {...register("confirmPassword", {
                  required: true,
                  validate: value => value === getValues().password || "Passwords do not match"
                })}
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword?.type === 'required' && <span className="text-red-500">confirm password</span>}
              {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
              {passwordError && <span className="text-red-500">{passwordError}</span>}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Sign Up
              </button>

              <div className="mt-6 text-center">
                <a href="/login" className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                  Already have an account?
                </a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
