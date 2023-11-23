import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

const user = {
  email: "jsahu5425@gmail.com",
};

const product = {
  name: "jsahu5425@gmail.com",
  baseprice: 50000,
};

const registerUser = {
  email: "",
  name: "",
  mobile: "",
  altmobile: "",
  aadhaara: "",
  pan: "",
  profession: "",
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const params = useParams();

  return (
    <>
      <section className="relative z-10 overflow-y-scroll pb-16  md:pb-20 lg:pb-28   bg-[#1D2430] h-screen md:h-full">
        <div className="w-full px-4 ">
          <div className="mx-auto max-w-2/3 rounded  bg-[#1D2430] px-6 py-10  sm:p-[60px] bg-opacity-10">
            <h3 className="mb-3 text-center text-2xl font-bold text-white sm:text-3xl">
              Register for {product.name} #{params.id}
            </h3>
            <form
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log(data);
              })}
              className="text-white"
            >
              <div className="mb-8">
                <label
                  htmlFor="email"
                  className="mb-3 block text-lg  text-gray-300"
                >
                  Your Email
                </label>
                <input
                  id="email"
                  {...register("email", {
                    required: "Email field is required",
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "Email is not valid",
                    },
                  })}
                  type="email"
                  placeholder="Enter your Email"
                  className="border-stroke w-full rounded-sm border px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary border-transparent bg-[#2C303B] focus:border-indigo-500 focus:shadow-none "
                  value={user.email}
                />
                {errors.email && (
                  <p className="text-red-500">{errors?.email.message}</p>
                )}
              </div>

              <div className="mb-8">
                <label
                  htmlFor="name"
                  className="mb-3 block text-sm text-lg  text-gray-300"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  {...register("name", {
                    required: " name field is required",
                  })}
                  type="text"
                  placeholder="Enter your Name"
                  defaultValue={user?.name}
                  className="border-stroke w-full rounded-sm border px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary border-transparent bg-[#2C303B] focus:border-indigo-500 focus:shadow-none"
                />
                {errors.name && (
                  <p className="text-red-500">{errors?.name.message}</p>
                )}
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-1">
                <div className="mb-8 w-full md:w-1/2">
                  <label
                    htmlFor="mobile"
                    className="mb-3 block text-sm text-lg  text-gray-300"
                  >
                    Mobile
                  </label>
                  <input
                    id="mobile"
                    {...register("mobile", {
                      required: "mobile field is required",
                      pattern: {
                        value: /^\d{10}$/,
                        message: "Please enter a valid 10-digit mobile number",
                      },
                    })}
                    type="tel"
                    placeholder="Enter your Mobile"
                    defaultValue={registerUser?.mobile}
                    className="border-stroke w-full rounded-sm border px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary border-transparent bg-[#2C303B] focus:border-indigo-500 focus:shadow-none"
                  />
                  {errors.mobile && (
                    <p className="text-red-500">{errors?.mobile.message}</p>
                  )}
                </div>

                <div className="mb-8 w-full md:w-1/2">
                  <label
                    htmlFor="altmobile"
                    className="mb-3 block text-sm text-lg  text-gray-300"
                  >
                    Alternate Mobile
                  </label>
                  <input
                    id="altmobile"
                    {...register("altmobile", {
                      required: "Alternate field is required",
                      pattern: {
                        value: /^\d{10}$/,
                        message: "Please enter a valid 10-digit mobile number",
                      },
                    })}
                    type="tel"
                    defaultValue={registerUser?.altmobile}
                    placeholder="Enter your  Alternate Mobile number"
                    className="border-stroke w-full rounded-sm border px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary border-transparent bg-[#2C303B] focus:border-indigo-500 focus:shadow-none"
                  />
                  {errors.altmobile && (
                    <p className="text-red-500">{errors?.altmobile.message}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-1">
                <div className="mb-8 w-full md:w-1/2">
                  <label
                    htmlFor="aadhaara"
                    className="mb-3 block text-sm text-lg  text-gray-300"
                  >
                    Aadhaara no
                  </label>
                  <input
                    id="aadhaara"
                    {...register("aadhaara", {
                      required: " Aadhaara field is required",
                      pattern: {
                        value: /^\d{12}$/,
                        message: "Please enter a valid 12-digit Aadhaar number",
                      },
                    })}
                    type="text"
                    defaultValue={registerUser?.aadhaara}
                    placeholder="Enter your Aadhaara"
                    className="border-stroke w-full rounded-sm border px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary border-transparent bg-[#2C303B] focus:border-indigo-500 focus:shadow-none"
                  />
                  {errors.aadhaara && (
                    <p className="text-red-500">{errors?.aadhaara.message}</p>
                  )}
                </div>

                <div className="mb-8 w-full md:w-1/2">
                  <label
                    htmlFor="pan"
                    className="mb-3 block text-sm text-lg  text-gray-300"
                  >
                    PanCard Number
                  </label>
                  <input
                    id="pan"
                    {...register("pan", {
                      required: "PanCard field is required",
                      pattern: {
                        value: /^[A-Z]{5}\d{4}[A-Z]$/,
                        message: "Please enter a valid PAN card number",
                      },
                    })}
                    defaultValue={registerUser?.pan}
                    type="text"
                    placeholder="Enter your PAN Card Number"
                    className="border-stroke w-full rounded-sm border px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary border-transparent bg-[#2C303B] focus:border-indigo-500 focus:shadow-none"
                  />
                  {errors.pan && (
                    <p className="text-red-500">{errors?.pan.message}</p>
                  )}
                </div>
              </div>
              <div className="mb-8">
                <label
                  htmlFor="profession"
                  className="mb-3 block text-lg text-gray-300"
                >
                  Your profession
                </label>
                <select
                  id="profession"
                  {...register("profession", {
                    required: "Profession field is required",
                  })}
                  defaultValue={registerUser?.profession}
                  className="border-stroke w-full rounded-sm border px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary border-transparent bg-[#2C303B] focus:border-indigo-500 focus:shadow-none text-white"
                >
                  <option value="">Select your profession</option>
                  <option value="Engineer">Engineer</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Designer">Designer</option>
                  <option value="Developer">Developer</option>
                  <option value="Artist">Artist</option>
                  <option value="Writer">Writer</option>
                  <option value="Chef">Chef</option>
                  <option value="Entrepreneur">Entrepreneur</option>
                  <option value="Other">Other</option>
                </select>
                {errors.profession && (
                  <p className="text-red-500">{errors?.profession.message}</p>
                )}
              </div>

              <div className="mb-8 w-1/2">
                <button className="flex w-full items-center justify-center bg-[#2d3139] 	 px-9 py-4  text-white duration-300  rounded-lg text-xl">
                  Token Price: ₹
                  <span>{Math.round(product?.baseprice * 0.3)}</span>
                </button>
              </div>

              <div className="mb-6">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-sm bg-blue-600	 px-9 py-4  text-white duration-300 hover:bg-blue-500"
                >
                  Proceed
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 inline-block ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </form>
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
}
