import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Basic Tee",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    videoLink:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    videoPoster:
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ebf67c121285927.60d78237c4bbd.jpg",
    imagetwo:
      "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
    baseprice: 50000,
    color: "Black",
    Date: "2023-11-22",
    Time: "16:59",
    bidExpired: false,
    soldamount: "",
    category: "entertainment",
    description:
      "Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.",
    celebrity: {
      id: 1,
      name: "carry minati",
      wikipedia: "https://en.wikipedia.org/wiki/CarryMinati",
      role: "youtuber",
      avatar:
        "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
];

const ProductDetails = () => {
  const [timeLeft, setTimeLeft] = useState({});

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
            [product.id]: "Participate now",
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
  }, []);

  return (
    <section className="max-w-full relative py-10  bg-[#1D2430]">
      {products.map((product) => {
        return (
          <div className="flex flex-wrap  " key={product.id}>
            <div className="w-full  lg:w-1/2 ">
              <div className="relative">
                <video
                  controls
                  className="w-full h-1/2 p-2"
                  poster={product.videoPoster}
                >
                  <source src={product.videoLink} type="video/mp4" />
                </video>
              </div>
              <div className="flex mt-2 p-2 gap-1">
                <div className="w-1/2 h-60">
                  <img
                    src={product.imageSrc}
                    alt={product.imageSrc}
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
                    {product.celebrity.name}
                  </p>
                  <p className="text-red-300">{product.celebrity.role}</p>
                </div>
              </Link>
              <p className="agbalumo leading-relaxed mt-2 md:text-xl max-h-40 md:max-h-96 overflow-y-scroll p-3 rounded-lg text-gray-300 hover:bg-[#212937]">
                {product.description}
              </p>

              <div className="flex mt-5 justify-evenly">
                <div>
                  <p className="text-indigo-500 mt-2 md:text-xl ">
                    Min Bid Price: ₹{product.baseprice}
                    <span className="block ml-1 text-red-500 ">
                      (Can't bid less than this){" "}
                    </span>
                  </p>
                  <Link className="relative" to={`/Product-register/${product.id}`}>
                  <button className="mt-1 bg-indigo-500 text-white  py-2 px-4 rounded">
                    Register to bid
                  </button>
                  </Link>
                </div>
                <div>
                  <p className="mt-2 md:text-xl text-yellow-500">
                    Token Price: ₹{Math.round(product.baseprice * 0.3)}
                    <span className="block ml-1 text-red-500">
                      (for Participate in the bid){" "}
                    </span>
                  </p>
                  {product.bidExpired ? null : (
                    <Link to="/">
                      <button
                        className={`${
                          timeLeft[product.id] === "Participate now"
                            ? "mt-1 bg-yellow-500 text-white  py-2 px-4 rounded"
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
        );
      })}
    </section>
  );
};

export default ProductDetails;
