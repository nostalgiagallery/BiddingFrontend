import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  EyeIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { Audio } from "react-loader-spinner";
import Navbar from "../navbar/Navbar";
import {
  Registerstatus,
  UpdateRegisterAsync,
  fetchallregistersAsync,
  selectedallregisters,
} from "../register/registerSlice";
import UserModal from "./UserModal";

const RegisterDashboard = () => {
  const dispatch = useDispatch();
  const status = useSelector(Registerstatus);
  const [searchTerm, setSearchTerm] = useState("");
  const registers = useSelector(selectedallregisters);
  const [EditableOrderId, setEditableOrderId] = useState(-1);
  const [openModal, setopenModal] = useState(null);

  const filteredRegisters = registers?.filter((register) => {
    const productName = register?.product.name.toLowerCase();
    const registerName = register?.name.toLowerCase();
    const basePrice = register?.product?.baseprice?.toString().toLowerCase();
    const search = searchTerm.toLowerCase();

    return (
      productName.includes(search) ||
      registerName.includes(search) ||
      basePrice.includes(search)
    );
  });

  const handleEdit = (register) => {
    if (EditableOrderId === register.id) {
      setEditableOrderId(-1);
    } else {
      setEditableOrderId(register.id);
    }
  };

  const handleUpdate = (e, register) => {
    const UpdatedOrder = {
      ...register,
      id: register.id,
      product: register?.product?.id,
      user: register?.user?.id,
      refundstatus: e.target.value,
    };
    dispatch(UpdateRegisterAsync(UpdatedOrder));
    setEditableOrderId(-1);
  };

  useEffect(() => {
    dispatch(fetchallregistersAsync());
  }, [dispatch]);

  return (
    <Navbar>
      {status === "loading" ? (
        <div className="flex items-center justify-center h-screen bg-[#1D2430]">
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
        <div className="relative w-full h-screen overflow-x-auto bg-[#1D2430]">
          <input
            type="text"
            placeholder="Search by product name or user name or basePrice"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="m-5 border-1 border-indigo-500 p-2 rounded-md text-black focus:outline-none focus:ring focus:border-indigo-500 w-2/3 md:w-1/2 text-sm md:text-lg font-semibold"
          />
          <div className="relative bg-[#1D2430] flex items-center justify-center  font-sans overflow-hidden">
            <div className="relative w-full">
              <div className=" shadow-md rounded my-6">
                <table className=" w-full table-auto">
                  <thead>
                    <tr className="bg-[#4969a2] text-gray-200 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Registration#</th>
                      <th className=" py-3 px-6 text-left -mt-4">Product</th>
                      <th className="py-3 px-6 text-center">Token Price </th>
                      <th className="py-3 px-6 text-center">Bid winner</th>
                      <th className="py-3 px-6 text-center">Date Of Auction</th>
                      <th className="py-3 px-6 text-center">Status</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light bg-[#344056] m-3">
                    {filteredRegisters.map((register) => {
                      return (
                        <tr className="border-b border-gray-200 ">
                          <td className="py-2 px-2 whitespace-nowrap">
                            <div className="mr-5">
                              <h1 className=" text-gray-200 font-bold leading-none ">
                                #{register?.id}
                              </h1>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-left">
                            <div className="flex items-center py-2  p-1 my-1 rounded-lg">
                              <div className="mr-2">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-400">
                                  <img
                                    src={register?.product?.imagesrc}
                                    alt={register?.product?.name}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>
                              </div>
                              <span>
                                <h1 className="text-gray-200 font-bold text-md text-lg">
                                  {register?.product?.name}
                                </h1>

                                <h1 className="text-gray-300 font-bold text-md font-serif text-lg">
                                  <span className="bg-white-300 font-serif text-lg">
                                    Base Price:
                                  </span>
                                  ₹ {register?.product?.baseprice}
                                </h1>
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-center">
                            <div className="font-abhaya-libre text-white  font-extrabold leading-none font-serif text-3xl">
                              ₹ {register?.product?.baseprice * 0.3}
                            </div>
                          </td>
                          <td className="py-3 px-6 text-center">
                            <div
                              className={`font-abhaya-libre font-extrabold leading-none font-serif text-xl ${
                                register.bidwinner
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {register?.bidwinner ? "Winner" : "No"}
                            </div>
                          </td>
                          <td className="py-3 px-6 text-center">
                            <div className="font-abhaya-libre text-red-400  font-extrabold leading-none  text-xl">
                              <span>{register?.product?.Date}</span> <br />
                              <span>{register?.product?.Time}</span>
                            </div>
                          </td>
                          <td className="w-1/6 py-3 px-6 text-center">
                            {register.id === EditableOrderId ? (
                              <select
                                value={register.refundstatus}
                                className=" py-2 px-6 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-300 text-left"
                                onChange={(e) => handleUpdate(e, register)}
                              >
                                <option value="pending">pending</option>
                                <option value="Refunded">Refunded</option>
                                <option value="No Refund Needed-winner">
                                  No Refund Needed-winner
                                </option>
                              </select>
                            ) : (
                              <span
                                className={`py-1 px-3 rounded-full text-xs ${
                                  register.refundstatus === "pending"
                                    ? "bg-purple-200 text-purple-600"
                                    : register.refundstatus === "pending"
                                    ? "bg-orange-200 text-orange-600"
                                    : register.refundstatus === "Refunded"
                                    ? "bg-green-200 text-green-600"
                                    : register.refundstatus ===
                                      "No Refund Needed-winner"
                                    ? "bg-red-200 text-red-600"
                                    : ""
                                }`}
                              >
                                {register.refundstatus}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-6 text-center">
                            <div className="flex item-center justify-center">
                              <div className="w-4 mr-6 transform text-gray-200 hover:text-purple-500 hover:scale-110">
                                <UserModal
                                  title={`Email: ${register.email}`}
                                  message={`Name:  ${register.name}`}
                                  profilePic={`${register.profilePic}`}
                                  cancelOption="Cancel"
                                  showModal={openModal === register.id}
                                  cancelAction={(e) => setopenModal(null)}
                                />
                                <EyeIcon
                                  className="w-6 h-6"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setopenModal(register?.id);
                                  }}
                                />
                              </div>
                              <div className="w-4 mr-6 transform text-gray-200  hover:text-purple-500 hover:scale-110">
                                <PencilIcon
                                  className="w-6 h-6"
                                  onClick={() => {
                                    handleEdit(register);
                                  }}
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </Navbar>
  );
};

export default RegisterDashboard;
