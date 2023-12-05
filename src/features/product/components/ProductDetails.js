import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  fetchProductByIdAsync,
  selectStatus,
  selectedProduct,
} from "../productSlice";
import { Audio } from "react-loader-spinner";

const ProductDetails = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const dispatch = useDispatch();
  const params = useParams();
  const product = useSelector(selectedProduct);
  const status = useSelector(selectStatus);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const eventDateTime = new Date(`${product?.Date}T${product?.Time}`);
      const distance = eventDateTime - now;

      if (distance < 0) {
        clearInterval(intervalId);
        setTimeLeft((prevTimeLeft) => ({
          ...prevTimeLeft,
          [product.id]: "Participate now",
        }));
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft((prevTimeLeft) => ({
          ...prevTimeLeft,
          [product?.id]: `${days}d ${hours}hr ${minutes}min ${seconds}sec`,
        }));
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [product]);

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params?.id));
  }, [dispatch]);

  return (
    <section className="max-w-full relative py-10  bg-[#1D2430]">
      {status === "loading" ? (
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
          {product && (
            <div className="flex flex-wrap  ">
              <div className="w-full  lg:w-1/2 ">
                <div className="relative">
                  <video
                    controls
                    className="w-full h-1/2 p-2"
                    poster={product.videoposter}
                  >
                    <source src={product.videolink} type="video/mp4" />
                  </video>
                </div>
                <div className="flex mt-2 p-2 gap-1">
                  <div className="w-1/2 h-60">
                    <img
                      src={product.imagesrc}
                      alt={product.imagesrc}
                      className="w-full h-full object-cover object-center  rounded-lg border-2 border-indigo-500 "
                    />
                  </div>
                  <div className="w-1/2 h-60">
                    <img
                      src={product.imagetwo}
                      alt={product.imagetwo}
                      className="w-full h-full object-cover object-center rounded-lg border-2 border-indigo-500"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2  p-10 ">
                <h1 className="agbalumo text-gray-400 text-3xl title-font font-medium mb-1">
                  {product.name}
                </h1>
                <Link
                  target="_blank"
                  to={product.celebrity.wikipedia}
                  className="relative mt-2  rounded-lg flex p-2 justify-evenly hover:bg-[#212937]"
                >
                  <img
                    src={product.celebrity.avatar}
                    alt=""
                    className="h-20 w-20 rounded-full bg-gray-50"
                  />
                  <div className="text-lg leading-6 flex flex-col">
                    <p className=" text-indigo-500">
                      <span className="absolute inset-0" />
                      {product.celebrity.celebrityname}
                    </p>
                    <p className="text-red-300">{product.celebrity.role}</p>
                  </div>
                </Link>
                <p className=" leading-relaxed mt-2 md:text-xl max-h-40 md:max-h-96 overflow-y-scroll p-3 rounded-lg text-gray-300 hover:bg-[#212937]">
                  {product.description}
                </p>

                <div className="flex justify-between items-center p-4 bg-transparent  ">
                  <div className="flex items-center shadow-lg p-3 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-indigo-600 mr-3"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {/* Custom calendar icon */}
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <div>
                      <p className="text-lg font-bold text-indigo-800">
                        {product.Date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center shadow-lg p-3 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-red-600 mr-3"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {/* Updated clearer clock icon */}
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="6" x2="12" y2="12" />
                      <line x1="12" y1="12" x2="15" y2="15" />
                    </svg>
                    <div>
                      <p className="text-lg font-bold text-red-800">
                        {product.Time}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex mt-5 justify-between">
                  <div className="flex flex-col justify-between gap-2">
                    <p className="text-lg font-bold text-indigo-400">
                      Min Bid Price: ₹{product.baseprice}
                      <span className="block ml-1 text-red-500 text-sm">
                        (Can't bid less than this){" "}
                      </span>
                    </p>
                    {!product?.bidExpired && (
                      <Link
                        className="relative"
                        to={`/Product-register/${product.id}`}
                      >
                        <button className="agbalumo mt-1 bg-indigo-400 text-white py-3 px-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                          Register to Bid
                        </button>
                      </Link>
                    )}
                  </div>
                  <div className="flex flex-col justify-between gap-2">
                    <p className="text-lg font-bold text-yellow-400 ">
                      Token Price: ₹{Math.round(product.baseprice * 0.3)}
                      <span className="block ml-1 text-sm text-red-500">
                        (for Participate in the bid){" "}
                      </span>
                    </p>
                    {product.bidExpired ? null : (
                      <Link
                        to={
                          timeLeft[product.id] === "Participate now"
                            ? `/bid-page/${product.id}`
                            : `/Product-details/${product.id}`
                        }
                      >
                        <button
                          className={`${
                            timeLeft[product.id] === "Participate now"
                              ? "agbalumo mt-1 bg-yellow-400 text-white py-3 px-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
                              : "text-red-500 text-2xl md:text-4xl"
                          }`}
                        >
                          {timeLeft[product.id]}
                        </button>
                      </Link>
                    )}
                    {product.bidExpired && (
                      <Link to={`/bid-page/${product.id}`}>
                        <button className="agbalumo mt-1 bg-yellow-400 text-white py-3 px-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                          Bid Result
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {!product && (
            <h1 className="w-full text-4xl  text-gray-300 mx-auto mt-8">
              No products found..
            </h1>
          )}
        </>
      )}
    </section>
  );
};

export default ProductDetails;
