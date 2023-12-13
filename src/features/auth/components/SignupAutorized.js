import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserAsync,
  errorhandler,
  selectError,
  selectLoggedinUser,
  selectStatus,
} from "../authSlice";
import { useAlert } from "react-alert";
import { Navigate, useNavigate } from "react-router-dom";
import PageNotFound from "../../../pages/404";

const SignupAutorized = () => {
  const dispatch = useDispatch();
  const Status = useSelector(selectStatus);
  const alert = useAlert();
  const navigate = useNavigate();
  const error = useSelector(selectError);
  const user = useSelector(selectLoggedinUser);

  useEffect(() => {
    let timeoutId;
    if (error === "Email already in use") {
      timeoutId = setTimeout(() => {
        alert.info("Redirect to LogIn");
        dispatch(errorhandler());
        navigate("/login", { replace: true });
      }, 1000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, error, navigate]);

  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const email = query.get("email");
  const password = query.get("password");

  const signup = () => {
    dispatch(
      createUserAsync({
        email: email,
        password: password,
        role: "user",
      })
    );
  };

  return (
    <>
      {token && email && password ? (
        <>
          {user && <Navigate to="/" replace={true}></Navigate>}
          <section className="relative z-10 overflow-hidden pb-16  md:pb-20 lg:pb-28   bg-[#1D2430] h-screen flex flex-col justify-center items-center">
            <img
              className="h-20 w-20"
              src="https://github.com/jitujiten/DOM_all/assets/120164938/883bede5-6ea5-405e-8b9b-b8b53c1c0b0d"
              alt="Your Company"
            />
            <button
              className="flex justify-center items-center  rounded-lg bg-blue-600	 px-9 py-4  text-white duration-300 hover:bg-blue-500 "
              onClick={signup}
            >
              {Status === "loading" ? (
                <svg
                  class="animate-spin h-5 w-5  border-b-1 border-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.004 8.004 0 0112 4.535V0C5.373 0 0 5.373 0 12h4zm2 5.291h4a8.01 8.01 0 01-7.746-5.332L6 17.583z"
                  ></path>
                </svg>
              ) : (
                <span> Authorized</span>
              )}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </section>
        </>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default SignupAutorized;
