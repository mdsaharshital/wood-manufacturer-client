import React, { useEffect, useState } from "react";
import SentionTitle from "../../components/SentionTitle";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../firebase.init";
import { FaRegEdit } from "react-icons/fa";
import { GiConfirmed, GiCancel } from "react-icons/gi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const MyProfile = () => {
  const [user] = useAuthState(auth);
  const [isEdit, setIsEdit] = useState(false);
  const [userProfile, setuserProfile] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const handleEdit = () => {
    setIsEdit(!isEdit);
  };
  const onSubmit = (data) => {
    setIsEdit(!isEdit);
    const email = user.email;
    const name = user.displayName;
    const userProfileData = { ...data, email, name };
    console.log(userProfileData);
    fetch("https://hidden-crag-61724.herokuapp.com/userProfile", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(userProfileData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          // refetch();
          toast.success("updated successfully");
          reset();
        }
      });
  };
  //
  useEffect(() => {
    fetch(
      `https://hidden-crag-61724.herokuapp.com/userProfile/${user?.email}`,
      {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((userProfile) => {
        setuserProfile(userProfile);
      });
  }, [user, isEdit]);
  return (
    <div>
      <SentionTitle>My Profile</SentionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 m-5 justify-items-center profile-section">
        <div className="">
          <img
            src={user?.photoURL}
            className="rounded-full my-3 w-24 aspect-square mx-auto ring ring-blue ring-offset-base-100 ring-offset-2"
            alt=""
          />
          <h1 className="text-center mb-4">{user?.displayName}</h1>
          {userProfile && (
            <>
              <small className="text-left mb-4 ">
                Education: {userProfile?.education}
              </small>
              <br />
              <small className="text-center mb-4">
                Location: {userProfile?.location}
              </small>
              <br />
              <small className="text-center mb-4">
                Number: {userProfile?.phone_Number}
              </small>
              <br />
              <small className="text-center mb-4">
                LinkedIn: {userProfile?.linkedIn_profile_link}
              </small>
            </>
          )}
          <br />
        </div>
        {/* // */}
        <div className="col-span-2 w-full">
          <div className="flex justify-between">
            {" "}
            <h1>Edit information about yourself</h1>
            {isEdit ? (
              <div className="flex">
                <GiConfirmed
                  onClick={handleSubmit(onSubmit)}
                  className="text-xl mr-3"
                />
                <GiCancel className="text-xl" onClick={handleEdit} />
              </div>
            ) : (
              <FaRegEdit className="text-xl" onClick={handleEdit} />
            )}
          </div>
          <form className="w-full my-2">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="minimum_order_quantity"
                id="floating_minimum_order_quantity"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer max-w-xs"
                placeholder=" "
                required
                disabled={!isEdit}
                {...register("education")}
              />
              <label
                htmlFor="floating_minimum_order_quantity"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Education
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                name="phone"
                id="floating_company"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                disabled={!isEdit}
                {...register("phone_Number")}
              />
              <label
                htmlFor="floating_company"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone Number
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="location"
                id="floating_company"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                disabled={!isEdit}
                {...register("location")}
              />
              <label
                htmlFor="floating_company"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Location(city)
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="profile_link"
                id="floating_company"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                disabled={!isEdit}
                {...register("linkedIn_profile_link")}
              />
              <label
                htmlFor="floating_company"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                LinkedIn profile link
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
