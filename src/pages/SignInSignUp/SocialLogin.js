import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const SocialLogin = () => {
  const [signInWithGoogle, user, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  //
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
