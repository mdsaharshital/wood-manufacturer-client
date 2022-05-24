import React, { useEffect, useState } from "react";
import SocialLogin from "./SocialLogin";
import {
  useAuthState,
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import SentionTitle from "./../../components/SentionTitle";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Loading from "../shared/Loading";
import { fetcher } from "../../hooks/fetcher";
import useToken from "../../hooks/useToken";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [getUser] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const [signInWithEmailAndPassword, , loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    await signInWithEmailAndPassword(data.email, data.password);
    const { data: accessToken } = await fetcher.post("login", getUser?.email);
    localStorage.setItem("accessToken", accessToken);
    console.log(accessToken);
  };
  const handlePassReset = () => {
    if (email) {
      sendPasswordResetEmail(email);
      toast.success("Reset password send to your email address");
    } else {
      toast.error("Please, provide your email address");
    }
  };

  const [token] = useToken(getUser);
  // navigate
  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, getUser, from, navigate]);

  if (loading || sending) {
    return <Loading />;
  }
  return (
    <div className="py-5">
      <SentionTitle>Sign In</SentionTitle>
      <div className="full-form w-full md:w-1/2 p-4 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              name="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is Required",
                },
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: "Provide a valid email",
                },
              })}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
            {errors.email?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.email.message}
              </span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="label-text-alt text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              name="password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is Required",
                },
                minLength: {
                  value: 6,
                  message: "Password must be atleast 6 character or longer",
                },
              })}
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
            {errors.password?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.password.message}
              </span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="label-text-alt text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary text-white rounded-none mb-3 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Log in
          </button>
          <p>
            <small>
              New here?{" "}
              <Link to="/signup" className="text-primary cursor-pointer">
                {" "}
                Sign Up now
              </Link>
            </small>
          </p>
          <p>
            <small>
              Forgot password?{" "}
              <span
                onClick={handlePassReset}
                className="text-primary cursor-pointer"
              >
                {" "}
                Click here
              </span>
            </small>
          </p>
          {error && (
            <p>
              <small className="text-danger">{error?.message}</small>
            </p>
          )}
        </form>
        <SocialLogin />
      </div>
    </div>
  );
};

export default SignIn;
