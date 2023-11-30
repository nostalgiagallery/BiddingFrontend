import React, { useEffect, useRef, useState } from "react";
import ContinuousRippleEffect from "./RippleEffect";
import Message from "./Message";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductByIdAsync,
  selectStatus,
  selectedProduct,
} from "../../product/productSlice";
import {
  Registerstatus,
  fetchtopBiddersAsync,
  findRegisterAsync,
  selectedTopBidders,
  selectedregister,
} from "../../register/registerSlice";
import { selectLoggedinUser } from "../../auth/authSlice";
import socketIO from "socket.io-client";
import { useAlert } from "react-alert";
import { Audio } from "react-loader-spinner";

let socket;
const ENDPOINT = "http://localhost:8080/";

export default function Bid() {
  const params = useParams();
  const product = useSelector(selectedProduct);
  const dispatch = useDispatch();
  const topRegisters = useSelector(selectedTopBidders);
  const Registersstatus = useSelector(Registerstatus);
  const ProductStatus = useSelector(selectStatus);
  const register = useSelector(selectedregister);
  const user = useSelector(selectLoggedinUser);
  const alert = useAlert();
  const [TopBidders, setTopBidders] = useState(topRegisters);

  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);
  const [productid, setProductId] = useState(product?.id);
  const [bidAmount, setBidamount] = useState(null);
  const [error, setError] = useState(false);
  const [minBidPrice, setminBidPrice] = useState(product?.baseprice);

  const send = () => {
    if (bidAmount <= minBidPrice) {
      setError(true);
      alert.error("add a bid amount more than  " + minBidPrice);
    } else {
      setError(false);
      socket.emit("message", {
        message: bidAmount,
        id,
        userdetails: register,
        productId: productid,
      });
      setBidamount(null);
    }
  };

  useEffect(() => {
    if (TopBidders && TopBidders[0]?.bidamount) {
      setminBidPrice(TopBidders[0]?.bidamount);
    } else {
      setminBidPrice(product?.baseprice);
    }
  }, [TopBidders, product]);

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      setId(socket.id);
    });

    socket.emit("joined", {
      user,
      productId: productid,
    });

    socket.on("sendmessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("topBidders", (data) => {
      // Assuming the server sends an array of top bidders in 'data.topBidders'
      setTopBidders(data.topBidders);
    });

    return () => {
      socket.emit("disconnected");
      socket.off();
    };
  }, [productid]);

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params?.id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchtopBiddersAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(findRegisterAsync({ userId: user?.id, productId: product?.id }));
  }, [dispatch]);

  const [timeRemaining, setTimeRemaining] = useState("");

  const calculateTimeRemaining = () => {
    const now = new Date();
    const endTime = new Date(`${product?.Date}T${product?.Time}`);
    endTime.setHours(endTime.getHours() + 1);

    if (now >= endTime) {
      setTimeRemaining("Bid Ended");
    } else {
      const timeDiff = endTime - now;

      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setTimeRemaining(`${hours}:${minutes}:${seconds}`);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      calculateTimeRemaining();
    }, 1000);

    return () => clearInterval(interval);
  }, [product]);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const bidchangerHandler = (e) => {
    let value = e.target.value;
    setBidamount(value);
  };

  return (
    <>
      <div className="relative overflow-y-scroll p-1 md:p-4 bg-[hsl(218,25%,15%)] ">
        {Registersstatus === "loading" && ProductStatus === "loading" ? (
          <div className="flex items-center justify-center h-screen bg-transparent">
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
            <div className=" flex justify-center">
              {timeRemaining && (
                <div className="agbalumo text-4xl text-red-600 p-3">
                  Bid will end in: {timeRemaining}
                </div>
              )}
              {timeRemaining && (
                <div className="agbalumo text-4xl text-red-600 p-3">
                  Min Bid Amount: {minBidPrice}
                </div>
              )}
            </div>
            <div className="flex flex-wrap  h-screen justify-between md:p-10 ">
              <div className="w-full md:w-4/6 h-full bg-[#272f3d] rounded-lg">
                <div className="h-1/3 flex justify-center items-center ">
                  <ContinuousRippleEffect>
                    <div className="flex flex-col">
                      <span className="agbalumo text-xl text-yellow-300">
                        {TopBidders && TopBidders[0]?.bidamount}
                      </span>
                      {TopBidders && TopBidders.length !== 0 ? (
                        <h2 className="agbalumo text-xl text-gray-300">
                          higest bid
                        </h2>
                      ) : (
                        <h2 className="agbalumo text-xl text-gray-300">
                          No Bid Yet
                        </h2>
                      )}
                    </div>
                  </ContinuousRippleEffect>
                  <ContinuousRippleEffect>
                    <img
                      src={product?.imagepng}
                      className="w-20 h-20 z-10"
                      alt="Dance Shoes"
                    />
                  </ContinuousRippleEffect>
                  <ContinuousRippleEffect>
                    <div className="flex flex-col">
                      <span className="agbalumo text-xl text-yellow-300">
                        {TopBidders && TopBidders.length !== 0 && (
                          <>Mr {TopBidders[0]?.name}</>
                        )}
                      </span>
                      {TopBidders && TopBidders.length !== 0 ? (
                        <h2 className="agbalumo text-xl text-gray-300">
                          higest bidder
                        </h2>
                      ) : (
                        <h2 className="agbalumo text-xl text-gray-300">
                          No Bid Yet
                        </h2>
                      )}
                    </div>
                  </ContinuousRippleEffect>
                </div>
                <div className="h-2/3 flex flex-col justify-center items-center p-2">
                  <div
                    ref={messagesContainerRef}
                    className="w-full overflow-y-scroll h-full bg-[#303948] rounded-xl mt-1"
                  >
                    {messages.map((item, index) => (
                      <Message
                        key={index}
                        user={item.id === id ? "" : item.user}
                        message={item.message}
                        classs={item.id === id ? "right" : "left"}
                      />
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                  {timeRemaining === "Bid Ended" ? (
                    <h2 className="agbalumo text-4xl p-1  text-red-500">
                      Bid Ended
                    </h2>
                  ) : (
                    <div className="w-full flex p-2 gap-2">
                      {register?.paymentstatus === "success" && (
                        <>
                          <input
                            className="agbalumo mt-1 h-12 w-5/6 bg-[#303948] rounded-lg focus:outline-none focus:border-2 focus:border-indigo-500 text-lg text-gray-300 p-1"
                            id="bid"
                            type="number"
                            onChange={bidchangerHandler}
                          />

                          <button
                            onClick={send}
                            className="agbalumo button w-1/6 bg-[#303948] rounded-lg mt-1 hover:bg-[#4969a2] text-gray-300"
                          >
                            Bid
                          </button>
                          {error && (
                            <p className="text-red-400  text-md">
                              Please enter a value greater than {minBidPrice}.
                            </p>
                          )}
                        </>
                      )}
                      {register?.paymentstatus !== "success" && (
                        <Link className="agbalumo button w-3/6 bg-[#303948] rounded-lg mt-1 hover:bg-yellow-400 text-gray-300 p-2">
                          Register Now
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full md:w-2/6 h-full px-5">
                {TopBidders && TopBidders.length !== 0 ? (
                  <ul>
                    {TopBidders.map((person) => (
                      <li
                        key={person.email}
                        className="flex justify-between gap-x-6  py-5 bg-[#303948] p-3 m-1 rounded-lg"
                      >
                        <div className="flex min-w-0 gap-x-4">
                          <img
                            className="h-12 w-12 flex-none rounded-full bg-gray-50"
                            src={person.profilePic}
                            alt={person.name}
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-200">
                              {person.name}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-300">
                              {person.email}
                            </p>
                          </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-500">
                            {person.profession}
                          </p>
                          <p className="text-sm leading-6 text-yellow-400">
                            {person?.bidamount}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="agbalumo text-xl text-gray-300">No Bid Yet</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
