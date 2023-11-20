import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16  md:pb-20 lg:pb-28   bg-[#1D2430] h-screen md:h-full">
        <div className=" ">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded  bg-[#1D2430] px-6 py-10  sm:p-[60px] bg-opacity-10">
                <h3 className="mb-3 text-center text-2xl font-bold text-white sm:text-3xl">
                  Reset account password
                </h3>
                <p className="mb-11 text-center text-base font-medium text-gray-400">
                  Enter a new password
                </p>

                <form
                  noValidate
                  className="space-y-6"
                  onSubmit={handleSubmit((data) => {
                    console.log(data);
                  })}
                >
                  <div className="mb-8">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm text-lg  text-gray-300"
                    >
                      Your Password
                    </label>
                    <input
                      id="password"
                      {...register("password", {
                        required: " password field is required",
                        pattern: {
                          value:
                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                          message: `- at least 8 characters \n 
                            - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number \n
                            - Can contain special characters`,
                        },
                      })}
                      type="password"
                      placeholder="Enter your Password"
                      className="border-stroke w-full rounded-sm border px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary border-transparent bg-[#2C303B] focus:border-indigo-500 focus:shadow-none"
                    />
                    {errors.password && (
                      <p className="text-red-500">{errors?.password.message}</p>
                    )}
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm text-lg  text-gray-300"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="ConfirmPassword"
                      {...register("ConfirmPassword", {
                        required: "ConfirmPassword field is required",
                        validate: (value, formValues) =>
                          value === formValues.password ||
                          "password not matching",
                      })}
                      type="text"
                      placeholder="Enter your Password"
                      className="border-stroke w-full rounded-sm border px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary border-transparent bg-[#2C303B] focus:border-indigo-500 focus:shadow-none text-white"
                    />
                  </div>

                  <div className="mb-6">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-sm bg-blue-600	 px-9 py-4  text-white duration-300 hover:bg-blue-500"
                    >
                      Continue
                    </button>
                  </div>
                </form>

                <div className="flex justify-between w-full">
                  <p className="text-gray-300">Don't have an account?</p>
                  <Link to="/signup" className="text-md  text-indigo-400 ">
                    signup?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-[-1]  w-full h-full">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
