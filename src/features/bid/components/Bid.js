import React, { useEffect, useRef, useState } from "react";
import ContinuousRippleEffect from "./RippleEffect";
import Message from "./Message";

const item = [
  {
    user: "jitu",
    id: 3,
    message: "hlo hii namaskar",
  },
];

const people = [
  {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Michael Foster",
    email: "michael.foster@example.com",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Dries Vincent",
    email: "dries.vincent@example.com",
    role: "Business Relations",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
  },
  {
    name: "Lindsay Walton",
    email: "lindsay.walton@example.com",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
    bidAmount: 54255,
  },
  {
    name: "Courtney Henry",
    email: "courtney.henry@example.com",
    role: "Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
    bidAmount: 534999,
  },
  {
    name: "Tom Cook",
    email: "tom.cook@example.com",
    role: "Director of Product",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
    bidAmount: 59000,
  },
];

const product = {
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
  Date: "2023-11-24",
  Time: "17:51",
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
};

// Add more products as needed...

export default function Bid() {
  const [messages, setMessages] = useState([
    {
      user: "jitu",
      id: 3,
      message: "hlo hii namaskar",
    },
  ]);

  const [bidderList, setBidderList] = useState(people);
  const [timeRemaining, setTimeRemaining] = useState("");

  const calculateTimeRemaining = () => {
    const now = new Date();
    const endTime = new Date(`${product.Date}T${product.Time}`);
    endTime.setHours(endTime.getHours() + 1);

    // Check if the current date is after or equal to the product's date
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
  }, []);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  const addNewMessage = () => {
    const newMessage = {
      user: "someone",
      id: Math.random(),
      message: "New message!" + Math.random(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  // useEffect(() => {
  //   const interval = setInterval(addNewMessage, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const send = () => {
    const message = document.getElementById("bid").value;

    console.log(message);

    document.getElementById("bid").value = "";
  };

  const shuffleBidderList = () => {
    const newList = [...bidderList];
    for (let i = newList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newList[i], newList[j]] = [newList[j], newList[i]];
    }
    setBidderList(newList);
  };

  return (
    <>
      <div className="relative overflow-y-scroll p-1 md:p-4 bg-[hsl(218,25%,15%)] ">
        <div className="">
          {/* <button onClick={shuffleBidderList} className="">
            Shuffle Bidder List
          </button> */}
          {timeRemaining && (
            <div className="agbalumo text-4xl text-red-600 p-3">
              Bid will end in: {timeRemaining}
            </div>
          )}
        </div>
        <div className="flex flex-wrap  h-screen justify-between md:p-10 ">
          <div className="w-full md:w-4/6 h-full bg-[#272f3d] rounded-lg">
            <div className="h-1/3 flex justify-center items-center ">
              <ContinuousRippleEffect>
                <div className="flex flex-col">
                  <span className="agbalumo text-xl text-yellow-300">
                    5000000
                  </span>

                  <h2 className="agbalumo text-xl text-gray-300">higest bid</h2>
                </div>
              </ContinuousRippleEffect>
              <ContinuousRippleEffect>
                <img
                  src="https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png"
                  className="w-20 h-20 z-10"
                  alt="Dance Shoes"
                />
              </ContinuousRippleEffect>
              <ContinuousRippleEffect>
                <div className="flex flex-col">
                  <span className="agbalumo text-xl text-yellow-300">
                    Mr Jitendra sahu
                  </span>
                  <h2 className="agbalumo text-xl text-gray-300">
                    higest bidder
                  </h2>
                </div>
              </ContinuousRippleEffect>
            </div>
            <div className="h-2/3 flex flex-col justify-center items-center p-2">
              <div
                ref={messagesContainerRef}
                className="w-full overflow-y-scroll h-full bg-[#303948] rounded-xl mt-1"
              >
                {messages.map((msg) => (
                  <Message
                    key={msg.id}
                    user={msg.id === 2 ? "" : msg.user}
                    message={msg.message}
                    classs={msg.id === 3 ? "right" : "right"}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
              {timeRemaining === "Bid Ended" ? (
                <h2 className="agbalumo text-4xl p-1  text-red-500">Bid Ended</h2>
              ) : (
                <div className="w-full flex p-2 gap-2">
                  <input
                    className="agbalumo mt-1 h-12 w-5/6 bg-[#303948] rounded-lg focus:outline-none focus:border-2 focus:border-indigo-500 text-lg text-gray-300 p-1"
                    id="bid"
                    type="number"
                  />
                  <button
                    onClick={send}
                    className="agbalumo button w-1/6 bg-[#303948] rounded-lg mt-1 hover:bg-yellow-400 text-gray-300"
                  >
                    Bid
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="w-full md:w-2/6 h-full px-5">
            <ul>
              {bidderList.map((person) => (
                <li
                  key={person.email}
                  className="flex justify-between gap-x-6  py-5 bg-[#303948] p-3 m-1 rounded-lg"
                >
                  <div className="flex min-w-0 gap-x-4">
                    <img
                      className="h-12 w-12 flex-none rounded-full bg-gray-50"
                      src={person.imageUrl}
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
                      {person.role}
                    </p>
                    <p className="text-sm leading-6 text-yellow-400">
                      {person?.bidAmount}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
