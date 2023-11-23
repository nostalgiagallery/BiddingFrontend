import { useEffect, useState } from "react";
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
  {
    id: 2,
    name: "Basic Tee",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    baseprice: 50000,
    color: "Black",
    Date: "2023-11-21",
    Time: "18:59",
    bidExpired: true,
    soldamount: "",
    category: "entertainment",
    description: "",
    celebrity: {
      id: 1,
      name: "Jitu",
      href: "https://en.wikipedia.org/wiki/CarryMinati",
      role: "youtuber",
      avatar:
        "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },

  // Add more products as needed...
];

export default function ProductList() {
  const [showDetails, setShowDetails] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.celebrity.name.toLowerCase().includes(searchTerm.toLowerCase())
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
  }, []);

  const toggleDetails = (id) => {
    if (showDetails === id) {
      setShowDetails(null);
    } else {
      setShowDetails(id);
    }
  };

  return (
    <div className="bg-[#1D2430]  relative ">
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
                onClick={() => toggleDetails(product.id)}
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
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                {/* Additional product title */}
                <div className="flex justify-between gap-1 p-2 text-gray-300 text-center py-2 ">
                  <h3 className="text-lg">{product.name}</h3>
                  {product.bidExpired ? null : (
                    <Link
                      to="/"
                      className={`text-lg ${
                        timeLeft[product.id] === "Bid Now"
                          ? " bg-yellow-400 agbalumo hover:bg-yellow-300 text-gray-200 rounded-lg  px-4 py-2 "
                          : "text-red-500"
                      }`}
                    >
                      {timeLeft[product.id]}
                    </Link>
                  )}
                </div>

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
                        {product.celebrity.name}
                      </p>
                      <p className="text-gray-300">{product.celebrity.role}</p>
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
                      <Link className="relative" to={`/Product-register/${product.id}`}>
                        <button className="agbalumo mt-5 bg-yellow-400 text-black  py-2 px-4 rounded">
                          Register to bid
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
