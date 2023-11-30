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
                <p className="agbalumo leading-relaxed mt-2 md:text-xl max-h-40 md:max-h-96 overflow-y-scroll p-3 rounded-lg text-gray-300 hover:bg-[#212937]">
                  {product.description}
                </p>

                <div className="flex mt-5 justify-evenly">
                  <div className="flex flex-col justify-evenly">
                    <p className="text-indigo-500 mt-2 md:text-xl ">
                      Min Bid Price: ₹{product.baseprice}
                      <span className="block ml-1 text-red-500 ">
                        (Can't bid less than this){" "}
                      </span>
                    </p>
                    <Link
                      className="relative"
                      to={`/Product-register/${product.id}`}
                    >
                      <button className="mt-1 bg-indigo-500 text-white  py-2 px-4 rounded">
                        Register to bid
                      </button>
                    </Link>
                  </div>
                  <div className="flex flex-col justify-evenly">
                    <p className="text-yellow-500 mt-2 md:text-xl">
                      Token Price: ₹{Math.round(product.baseprice * 0.3)}
                      <span className="block ml-1 text-red-500">
                        (for Participate in the bid){" "}
                      </span>
                    </p>
                    {product.bidExpired ? null : (
                      <Link to={`/bid-page/${product.id}`}>
                        <button
                          className={`${
                            timeLeft[product.id] === "Participate now"
                              ? "mt-1 bg-yellow-500 text-white  py-2 px-4 rounded "
                              : "text-red-500 text-2xl md:text-4xl"
                          }`}
                        >
                          {timeLeft[product.id]}
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
