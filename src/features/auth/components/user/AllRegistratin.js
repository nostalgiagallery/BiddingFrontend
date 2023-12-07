import { UserCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { selectLoggedinUser, updateUserAsync } from "../../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  findallRegisterAsync,
  selectedallregisters,
  selectedregistersStatus,
} from "../../../register/registerSlice";
import { Audio } from "react-loader-spinner";

const AllRegistration = () => {
  const user = useSelector(selectLoggedinUser);
  const dispatch = useDispatch();
  const registers = useSelector(selectedallregisters);
  const selectedregistersStatusis = useSelector(selectedregistersStatus);

  useEffect(() => {
    dispatch(findallRegisterAsync({ userId: user?.id }));
  }, [dispatch, user]);

  return (
    <section className=" bg-[#1D2430] relative z-[1]">
      <div className=" text-gray-200 p-10 ">
        <h2 className="text-4xl font-bold tracking-tight text-gray-300 mb-6">
          All <span className="text-indigo-500">Registration</span>
        </h2>
        {selectedregistersStatusis ? (
          <div className="flex p-3 m-5 justify-center h-screen bg-transparent">
            <Audio
              height={100}
              width={100}
              radius={5}
              color="#600AFF"
              wrapperClass={{}}
              wrapperStyle=""
              visible={true}
              ariaLabel="loading"
            />
          </div>
        ) : (
          <>
            {registers?.length === 0 && (
              <h2 className="text-4xl font-bold tracking-tight text-gray-300 mb-6">
                No Registration Found
              </h2>
            )}
            {registers?.map((register) => {
              return (
                <div
                  className="bg-gray-500 bg-opacity-75 grid grid-cols-1 gap-x-10 lg:grid-cols-8 p-10 rounded-lg m-1"
                  key={register?.id}
                >
                  <div className="lg:col-span-4 ">
                    <img
                      src={register?.product?.imagesrc}
                      alt={register?.product?.imagesrc}
                      className="w-64 h-64 block rounded-full"
                    />

                    <h1 className=" text-left mt-4 text-xl font-extrabold tracking-tight leading-none text-black">
                      Product Name:
                      <span className="text-indigo-800 ml-1">
                        {register?.product?.name}
                      </span>
                    </h1>

                    <h1 className=" text-left mt-4 text-xl font-extrabold tracking-tight leading-none text-black">
                      Base Price:
                      <span className="text-gray-300 ml-2">
                        ₹ {register?.product?.baseprice}
                      </span>
                    </h1>
                  </div>
                  <div className="lg:col-span-4  ">
                    <img
                      src={register?.profilePic}
                      alt="ProfilePic"
                      className="w-20 h-20 block rounded-full"
                    />
                    <h1 className=" text-left mt-4 text-sm md:text-xl font-extrabold tracking-tight leading-none text-gray-300">
                      <span className="text-gray-300 ml-1 ">
                        #{register?.id}
                      </span>
                    </h1>
                    <h1 className=" text-left mt-4  text-sm md:text-xl font-extrabold tracking-tight leading-none text-gray-300">
                      User Name:
                      <span className="text-indigo-500 ml-1">
                        {register?.name}
                      </span>
                    </h1>
                    <h1 className="text-left mt-4  text-sm md:text-xl font-extrabold tracking-tight leading-none text-gray-300">
                      User Email:
                      <span className="text-black ml-1">
                        {register?.email}
                      </span>
                    </h1>
                    <h1 className="text-left mt-4  text-sm md:text-xl font-extrabold tracking-tight leading-none text-gray-300">
                      Token Amount:
                      <span className="text-black ml-1">
                        ₹ {register?.product?.baseprice * 0.3}
                      </span>
                    </h1>
                    <h1 className="text-left mt-4  text-sm md:text-xl font-extrabold tracking-tight leading-none text-gray-300">
                      paymentstatus:
                      <span
                        className={`ml-1 ${
                          register?.paymentstatus === "success"
                            ? "text-green-500"
                            : "text-orange-400"
                        }`}
                      >
                        {register?.paymentstatus}
                      </span>
                    </h1>
                    <h1 className="text-left mt-4  text-sm md:text-xl font-extrabold tracking-tight leading-none text-gray-300">
                      Refunded:
                      <span
                        className={`ml-1 ${
                          register?.refundstatus === "success"
                            ? "text-green-500"
                            : "text-orange-400"
                        }`}
                      >
                        {register?.refundstatus}
                      </span>
                    </h1>
                    <h1 className="text-left mt-4  text-sm md:text-xl font-extrabold tracking-tight leading-none text-gray-300">
                      Bidwinner:
                      <span
                        className={`ml-1 ${
                          register?.bidwinner === true
                            ? "text-green-500"
                            : "text-red-400"
                        }`}
                      >
                        {register?.bidwinner === true ? "yes" : "No"}
                      </span>
                    </h1>
                  </div>
                </div>
              );
            })}
          </>
        )}
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

export default AllRegistration;
