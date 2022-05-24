import React, { useEffect } from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "./../shared/Loading";
import { fetcher } from "./../../hooks/fetcher";
import useToken from "./../../hooks/useToken";

const SocialLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";
  const [signInWithGoogle, user, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [getUser] = useAuthState(auth);
  //
  const [token] = useToken(getUser);
  // navigate
  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, getUser, from, navigate]);
  if (googleLoading) return <Loading />;
  return (
    <div class="flex flex-col w-full border-opacity-50">
      <div class="divider">OR</div>
      <button
        onClick={() => signInWithGoogle()}
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
