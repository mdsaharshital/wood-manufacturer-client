import React, { useState, useEffect } from "react";
import SocialLogin from "./SocialLogin";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import SentionTitle from "./../../components/SentionTitle";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Loading from "../shared/Loading";
import axios from "axios";

const SignUp = () => {
  const [imageURL, setImageURL] = useState("");
  const [imgLoading, setimgLoading] = useState(false);
  const [getUser] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let from = location.state?.from?.pathname || "/";

  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating] = useUpdateProfile(auth);
  const [sendEmailVerification] = useSendEmailVerification(auth);
  //
  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name, photoURL: imageURL });
    await sendEmailVerification();
    toast.success("Email verfication sent");
  };
  const handleIamgeUpload = (e) => {
    e.preventDefault();
    setimgLoading(true);
    const image = e.target.files[0];
    console.log(image);
    const formData = new FormData();
    formData.set("image", image);
    axios
      .post(
        "https://api.imgbb.com/1/upload?key=1acbd73a4a8ebea34491d15e22f67080",
        formData
      )
      .then((res) => {
        setimgLoading(false);
        console.log(res.data.data);
        setImageURL(res.data.data.display_url);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const token = localStorage.getItem("accessToken");
  // navigate
  useEffect(() => {
    if (token && getUser) {
      navigate(from, { replace: true });
    }
  }, [token, getUser, from, navigate]);

  if (loading || updating) {
    return <Loading />;
  }
  return (
    <div className="py-5">
      <SentionTitle>Sign Up</SentionTitle>
      <div className="full-form w-full md:w-1/2 p-4 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              {...register("name", {
                required: {
                  value: true,
                  message: "Name is Required",
                },
              })}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Your Name
            </label>
            {errors.name?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors?.name?.message}
              </span>
            )}
          </div>
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
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email Address
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
              type="password"
              name="password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
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
          <div className="relative z-0 w-1/2 mb-6 group">
            <div className="form-control">
              <label htmlFor="uploadImage" className="label">
                <span
                  className={
                    imgLoading
                      ? "label-text btn btn-primary  text-white loading rounded-none mt-4"
                      : "label-text btn btn-primary  text-white rounded-none mt-4"
                  }
                >
                  Upload Image
                </span>
              </label>
              <input
                required
                onChange={handleIamgeUpload}
                id="uploadImage"
                type="file"
                name="image"
                placeholder="Upload a Image"
                className="input input-bordered hidden"
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary text-white rounded-none mb-3 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign up
          </button>
          <p>
            <small>
              Already have an account?{" "}
              <Link to="/signin" className="text-primary cursor-pointer">
                {" "}
                Sign in now
              </Link>
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

export default SignUp;
