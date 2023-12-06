import React, { useEffect, useRef, useState } from "react";
import ContinuousRippleEffect from "./RippleEffect";
import Message from "./Message";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  EditProductAsync,
  fetchProductByIdAsync,
  selectStatus,
  selectedProduct,
} from "../../product/productSlice";
import {
  Registerstatus,
  UpdateRegisterAsync,
  fetchallmessagesAsync,
  fetchtopBiddersAsync,
  findRegisterAsync,
  selectedTopBidders,
  selectedallmessages,
  selectedregister,
} from "../../register/registerSlice";
import { selectLoggedinUser } from "../../auth/authSlice";
import socketIO from "socket.io-client";
import { useAlert } from "react-alert";
import { Audio } from "react-loader-spinner";
import Celebration from "./Celebration ";

let socket;
const ENDPOINT = "https://biddingapp-5c495b9e8cc1.herokuapp.com/";

export default function Bid() {
  const params = useParams();
  const product = useSelector(selectedProduct);
  const dispatch = useDispatch();
  const topRegisters = useSelector(selectedTopBidders);
  const Registersstatus = useSelector(Registerstatus);
  const ProductStatus = useSelector(selectStatus);
  const register = useSelector(selectedregister);
  const allmessages = useSelector(selectedallmessages);
  const user = useSelector(selectLoggedinUser);
  const alert = useAlert();
  const [TopBidders, setTopBidders] = useState(topRegisters);

  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);
  const [bidAmount, setBidamount] = useState(null);
  const [error, setError] = useState(false);
  const [minBidPrice, setminBidPrice] = useState(product?.baseprice);
  const [maxBidPrice, setmaxBidPrice] = useState(product?.baseprice + 10000000);

  const send = () => {
    if (bidAmount > maxBidPrice) {
      alert.error("add a bid amount less than  " + maxBidPrice);
    } else if (bidAmount <= minBidPrice) {
      setError(true);
      alert.error("add a bid amount more than  " + minBidPrice);
    } else {
      setError(false);
      socket.emit("message", {
        message: bidAmount,
        id,
        userdetails: register,
        productId: params?.id,
      });
      alert.success("bid Successfully Placed of amount" + bidAmount);
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
      productId: params?.id,
    });

    socket.on("welcome", (data) => {
      setTopBidders(data.topBidders);
    });

    socket.on("sendmessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("topBidders", (data) => {
      setTopBidders(data.topBidders);
    });

    return () => {
      socket.emit("disconnected");
      socket.off();
    };
  }, [params?.id]);

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params?.id));
  }, [dispatch, params?.id]);

  useEffect(() => {
    dispatch(fetchtopBiddersAsync(params?.id));
    dispatch(fetchallmessagesAsync(params?.id));
  }, [dispatch, params?.id]);

  useEffect(() => {
    dispatch(findRegisterAsync({ userId: user?.id, productId: params?.id }));
  }, [dispatch, user, params?.id]);

  useEffect(() => {
    setTopBidders(topRegisters);
    setMessages(allmessages);
  }, [topRegisters, allmessages]);

  const [timeRemaining, setTimeRemaining] = useState("");

  const calculateTimeRemaining = () => {
    const now = new Date();
    const endTime = new Date(`${product?.Date}T${product?.Time}`);
    endTime.setMinutes(endTime.getMinutes() + (product?.duration || 30));

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
    const regex = /^\d*$/;
    if (regex.test(value)) {
      setBidamount(value);
    } else {
      alert.error("add only number");
    }
  };

  useEffect(() => {
    if (product?.bidExpired) {
    } else {
      if (timeRemaining === "Bid Ended") {
        if (TopBidders[0]?.name) {
          dispatch(
            EditProductAsync({
              ...product,
              id: params.id,
              bidExpired: true,
              bidwinner: TopBidders[0]?.name,
              soldamount: TopBidders[0]?.bidamount,
            })
          );
          if (TopBidders[0]?.name === register?.name) {
            dispatch(
              UpdateRegisterAsync({
                ...register,
                id: register.id,
                bidwinner: true,
                product:register.id
              })
            );
          }
        }
      }
    }
  }, [timeRemaining, product, TopBidders]);

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
            {timeRemaining === "Bid Ended" && (
              <Celebration
                name={TopBidders[0]?.name}
                url={TopBidders[0]?.profilePic}
              ></Celebration>
            )}

            <div className=" flex flex-col md:flex-row justify-center">
              {timeRemaining && (
                <div className="agbalumo text-4xl text-red-600 p-3">
                  {timeRemaining === "Bid Ended" ? (
                    <span></span>
                  ) : (
                    <span>Bid will end in:</span>
                  )}
                  {timeRemaining}
                </div>
              )}
              {timeRemaining && (
                <div className="agbalumo text-4xl text-indigo-500 p-3">
                  {timeRemaining === "Bid Ended" ? (
                    <span className="text-gray-300">Sold Amount: </span>
                  ) : (
                    <span>Min Bid Amount: </span>
                  )}
                  {minBidPrice}
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
                          <> {TopBidders[0]?.name}</>
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
                    <>
                      {register?.paymentstatus === "success" && (
                        <>
                          <div className="w-full flex p-2 gap-2">
                            <input
                              className="agbalumo mt-1 h-12 w-5/6 bg-[#303948] rounded-lg focus:outline-none focus:border-2 focus:border-indigo-500 text-lg text-gray-300 p-2"
                              id="bid"
                              type="number"
                              onChange={bidchangerHandler}
                              placeholder="add only number...."
                            />

                            <button
                              onClick={send}
                              className="agbalumo button w-1/6 bg-[#303948] rounded-lg mt-1 hover:bg-[#4969a2] text-gray-300"
                            >
                              Bid
                            </button>
                          </div>
                          <div className="w-full flex p-2 gap-2">
                            {error && (
                              <p className="text-red-400  text-md">
                                Please enter a value greater than {minBidPrice}.
                              </p>
                            )}
                          </div>
                        </>
                      )}
                      {register?.paymentstatus !== "success" && (
                        <Link
                          to={`/Product-register/${product?.id}`}
                          className="relative w-full agbalumo button  bg-[#303948] rounded-lg mt-1  text-gray-300 p-2"
                        >
                          Register Now
                        </Link>
                      )}
                    </>
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
