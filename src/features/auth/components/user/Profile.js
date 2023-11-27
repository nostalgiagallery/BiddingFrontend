import { UserCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { selectLoggedinUser, updateUserAsync } from "../../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

const Profile = () => {
  const user = useSelector(selectLoggedinUser);
  const [edit, setEdit] = useState(true);
  const [userName, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const alert = useAlert();
  const dispatch = useDispatch();

  const handleEditClick = () => {
    setEdit(!edit);
  };

  function uploadImage(file, setUrl) {
    const formData = new FormData();
    formData.append("file", file);

    return fetch("http://localhost:8080/uploadFile", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Upload failed:", data.error);
        } else {
          setUrl(data?.url);
        }
      })
      .catch((error) => console.error("Upload failed:", error));
  }

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (selectedFile && userName) {
      const newUser = { ...user, profilePic: selectedFile, name: userName };
      dispatch(updateUserAsync({ user: newUser, alert }));
      console.log({ user: newUser, alert });
    } else if (selectedFile === null) {
      alert.error("upload the image file");
    } else if (userName === "") {
      alert.error("Fill the name");
    } else {
      alert.error("Fill the name and upload profile pic");
    }
  };

  const inputchangeHandler = (e) => {
    const imagedata = e.target.files[0];
    if (imagedata) {
      uploadImage(imagedata, setSelectedFile);
    }
  };

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    setName(user?.name || "");
    setSelectedFile(user?.profilePic || null);
  }, []);

  return (
    <section className=" bg-[#1D2430] relative z-[1]">
      <div className=" text-gray-200 p-10 ">
        <h2 className="text-4xl font-bold tracking-tight text-gray-300 mb-6">
          Profile <span className="text-indigo-500">Section</span>
        </h2>

        <div className="grid grid-cols-1 gap-x-10 lg:grid-cols-8 p-10">
          <div className="lg:col-span-4 ">
            {user?.profilePic && (
              <img
                src={user?.profilePic}
                alt="ProfilePic"
                className="w-64 h-64 block rounded-full"
              />
            )}
            {!user?.profilePic && (
              <UserCircleIcon
                className="w-64 h-64 text-gray-300"
                aria-hidden="true"
              />
            )}
            <h1 className="text-left mt-4 text-4xl font-extrabold tracking-tight leading-none text-gray-300">
              Name:
              <span className="text-indigo-500 ml-1">
                {user?.name ? user.name : "New User"}
              </span>
            </h1>
            <h1 className="text-left mt-4 text-lg md:text-2xl font-normal  md:font-extrabold  tracking-tight leading-none text-gray-300">
              Email address:
              <span className="text-red-400 ml-1">{user?.email}</span>
            </h1>
            {user?.role === "admin" && (
              <h3 className="text-left mt-4 text-xl font-extrabold tracking-tight leading-none text-gray-200 font-serif">
                role:<span className="text-indigo-400 ml-1">{user?.role}</span>
              </h3>
            )}
          </div>
          <div className="lg:col-span-4   text-right ">
            <div className="flex justify-end -mr-3 mt-1">
              <span onClick={handleEditClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-7 h-7 text-white cursor-pointer sm:mt-5 md:mt-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </span>
            </div>

            <div>
              {edit && (
                <form onSubmit={SubmitHandler}>
                  <label
                    htmlFor="photo"
                    className="text-left block text-xl font-medium leading-6 text-gray-200  "
                  >
                    Upload Profile Picture
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    <UserCircleIcon
                      className="h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <label
                      htmlFor="fileInput"
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
                    >
                      Change
                    </label>
                    <input
                      id="fileInput"
                      type="file"
                      className="invisible w-0 h-0"
                      onChange={inputchangeHandler}
                      accept="image/*"
                    />
                  </div>
                  {selectedFile && (
                    <img
                      src={selectedFile}
                      alt="profile_image"
                      className="w-20 h-20 rounded-lg p-2"
                    />
                  )}
                  <div className=" flex flex-col text-left">
                    <label htmlFor="name" className="mt-5 font-mono">
                      Enter Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={userName}
                      className="mt-5 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={nameChangeHandler}
                    />
                  </div>
                  <div className="mt-5 text-left">
                    <button
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full "
        style={{
          backgroundImage:
            "url('https://github.com/jitujiten/ecommerceBackend/assets/120164938/6c7d5a9a-7d53-4bf9-aec8-dcd68faa5736')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>
    </section>
  );
};

export default Profile;
