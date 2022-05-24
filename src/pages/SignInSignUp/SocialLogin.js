import React, { useEffect } from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "./../shared/Loading";
import axios from "axios";
import { fetcher } from "./../../hooks/fetcher";

const SocialLogin = () => {
  const [signInWithGoogle, user, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [getUser] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const handleSignIn = async () => {
    await signInWithGoogle();
    const { data } = await fetcher.post("login", getUser?.email);
    localStorage.setItem("accessToken", data);
    console.log(data);
  };
  let from = location.state?.from?.pathname || "/";
  //
  // useEffect(() => {
  //   if (user) {
  //     navigate(from, { replace: true });
  //   }
  // }, [user, from, navigate]);
  if (googleLoading) return <Loading />;
  return (
    <div class="flex flex-col w-full border-opacity-50">
      <div class="divider">OR</div>
      <button
        onClick={handleSignIn}
        className="btn btn-primary text-white w-3/4 mx-auto rounded-none"
      >
        Sign in with Google
      </button>
      {googleError && (
        <small className="my-2 text-error">{googleError?.message}</small>
      )}
    </div>
  );
};

export default SocialLogin;
