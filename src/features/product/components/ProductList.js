import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAllProductsAsync,
  selectAllProducts,
  selectStatus,
} from "../productSlice";
import { Audio } from "react-loader-spinner";
import calculateTimeRemaining from "../../../app/common";

export default function ProductList() {
  const [showDetails, setShowDetails] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});
  const [bidTimeStatus, setbidTimeStatus] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectStatus);

  const filteredProducts = products?.filter((product) => {
    return (
      (product?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product?.celebrity.celebrityname
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) &&
      product?.deleted === false
    );
  });

  useEffect(() => {
    const countdowns = products.map((product) => {
      const intervalId = setInterval(() => {
        const now = new Date().getTime();
        const eventDateTime = new Date(`${product.Date}T${product.Time}`);
        const distance = eventDateTime - now;

        if (distance < 0) {
          clearInterval(intervalId);
          setTimeLeft((prevTimeLeft) => ({
            ...prevTimeLeft,
            [product.id]: "Bid Now",
          }));
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          setTimeLeft((prevTimeLeft) => ({
            ...prevTimeLeft,
            [product.id]: `${days}d ${hours}hr ${minutes}min ${seconds}sec`,
          }));
        }
      }, 1000);

      return () => clearInterval(intervalId);
    });

    return () => {
      countdowns.forEach((countdown) => clearInterval(countdown));
    };
  }, [products]);

  useEffect(() => {
    const countdowns = products.map((product) => {
      calculateTimeRemaining(product, (timeLeft) => {
        setbidTimeStatus((prevTimeLeft) => ({
          ...prevTimeLeft,
          [product.id]: timeLeft,
        }));
      });
    });

    return () => {
      countdowns.forEach((interval) => clearInterval(interval));
    };
  }, [products]);

  const toggleDetails = (event, id) => {
    event.preventDefault();
    setShowDetails((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, []);

  return (
    <div className="bg-[#1D2430]  relative ">
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
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-300 mb-6">
            Choose Your Favorite Star's{" "}
            <span className="text-indigo-500">Product</span>
          </h2>
          <input
            type="text"
            placeholder="Search by product name or celebrity name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="m-5 border-1 border-indigo-500 p-2 rounded-md text-black focus:outline-none focus:ring focus:border-indigo-500 w-2/3 md:w-1/2 text-sm md:text-lg font-semibold"
          />
          {filteredProducts.length === 0 && (
            <h1 className="w-full text-4xl  text-gray-300 mx-auto mt-8">
              No products found..
            </h1>
          )}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
            {filteredProducts.length !== 0 &&
              filteredProducts.map((product) => (
                <Link
                  to={`/Product-details/${product.id}`}
                  key={product.id}
                  className="relative bg-[#313844] rounded-lg overflow-hidden border-1 border-indigo-500 "
                  onMouseEnter={() =>
                    window.innerWidth >= 768 && setShowDetails(product.id)
                  }
                  onMouseLeave={() =>
                    window.innerWidth >= 768 && setShowDetails(null)
                  }
                >
                  {/* Product image */}
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-md lg:aspect-none hover:bg-[#434b58] lg:h-80">
                    <img
                      src={product.imagesrc}
                      alt={product.imagesrc}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  {/* Additional product title */}
                  <div className="flex justify-between gap-1 p-2 text-gray-300 text-center py-2 ">
                    <h3 className="text-lg truncate w-1/2">{product.name}</h3>
                    {product.bidExpired && (
                      <h3 className="text-red-500 text-xl">Sold</h3>
                    )}
                    {product.bidExpired ? null : (
                      <Link
                        to={
                          timeLeft[product.id] === "Bid Now"
                            ? `/bid-page/${product.id}`
                            : `/Product-details/${product.id}`
                        }
                        className={` text-lg ${
                          timeLeft[product.id] === "Bid Now"
                            ? " bg-yellow-400 agbalumo hover:bg-yellow-300 text-gray-200 rounded-lg  px-4 py-2 "
                            : "text-red-500"
                        }`}
                      >
                        {timeLeft[product.id]}
                      </Link>
                    )}
                  </div>

                  <div className="relative md:hidden flex justify-between gap-1 p-2 text-gray-300 text-center py-2 ">
                    <button
                      onClick={(event) => toggleDetails(event, product.id)}
                      className="relative agbalumo mt-2 bg-indigo-500 hover:bg-indigo-400  py-2 px-4 rounded"
                    >
                      Details
                    </button>
                  </div>

                  {bidTimeStatus[product.id] !== "Bid Ended" && (
                    <div className="flex  justify-between items-center p-4 bg-gray-300 rounded-b-lg shadow-md">
                      <div className="flex items-center">
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
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          />
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
                      <div className="flex items-center">
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
                          <p className="w-1/2 text-lg font-bold text-red-800">
                            {timeLeft[product.id] === "Bid Now"
                              ? bidTimeStatus[product.id]
                              : product.Time}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Product details */}
                  <div
                    className={`${
                      showDetails === product.id ? "top-0" : "-top-full"
                    } absolute left-0 w-full h-full transition-all duration-1000 ease-in-out rounded-lg`}
                    style={{
                      transformOrigin: "top",
                      backgroundImage:
                        "linear-gradient(to bottom right, #6366f1,#6366f1, #434b58)",
                    }}
                  >
                    {/* Details content */}
                    <div
                      className="relative flex justify-evenly p-4 border-2 rounded-b-lg"
                      style={{
                        transformOrigin: "top",
                        backgroundImage:
                          "linear-gradient(to bottom right,#434b58,#6366f1,#6366f1)",
                      }}
                    >
                      <img
                        src={product.celebrity.avatar}
                        alt=""
                        className="h-12 w-12 rounded-full bg-gray-50"
                      />
                      <div className="text-lg leading-6">
                        <p className="agbalumo text-gray-300">
                          <span className="absolute inset-0" />
                          {product.celebrity.celebrityname}
                        </p>
                        <p className="text-gray-300">
                          {product.celebrity.role}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <div className="m-4">
                        <h1 className="agbalumo text-2xl text-gray-200">
                          <span>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {product.name}
                          </span>
                        </h1>
                        <p className="agbalumo mt-2 text-xl text-gray-200">
                          Min Bid Price: ₹{product.baseprice}
                        </p>
                        <p className="agbalumo mt-2 text-xl text-gray-200">
                          Token Price: ₹
                          <span className="text-black">
                            {Math.round(product.baseprice * 0.3)}{" "}
                          </span>
                          {/* 30% of base price */}
                        </p>
                        <Link
                          className="relative"
                          to={`/Product-register/${product.id}`}
                        >
                          {!product.bidExpired && (
                            <button className="agbalumo mt-5 bg-yellow-400 text-black  py-2 px-4 rounded">
                              Register to bid
                            </button>
                          )}
                        </Link>
                        {product.bidExpired && (
                          <h1 className=" mt-2 text-xl font-extrabold tracking-tight leading-none text-gray-300">
                            Bid Winner:
                            <span className="text-red-500  text-ellipsis">
                              🎉 {product?.bidwinner}
                            </span>
                          </h1>
                        )}

                        {product.bidExpired && (
                          <h1 className="mt-1  text-xl font-extrabold tracking-tight leading-none text-gray-300">
                            Sold Amount:
                            <span className="text-black text-ellipsis">
                              {product?.soldamount}
                            </span>
                          </h1>
                        )}
                      </div>
                    </div>
                    <div className="relative md:hidden flex justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={25}
                        height={25}
                        onClick={(event) => toggleDetails(event, product.id)}
                      >
                        <path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59 5.59-5.59z" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
