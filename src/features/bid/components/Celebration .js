import React from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const Celebration = ({ name, url }) => {
  const { width, height } = useWindowSize();
  return (
    <div >
      <Confetti width={width} height={height} recycle={true} />
      <div className="w-full  flex  flex-col justify-center items-center">
        <img
          src={url}
          alt="ProfilePic"
          className="w-64 h-64 block rounded-full"
        />
        <h1 className="text-left mt-4 text-xl md:text-4xl font-extrabold tracking-tight leading-none text-gray-300">
          Bid Winner:
          <span className="text-indigo-500 ml-1">🎉 {name}</span>
        </h1>
      </div>
    </div>
  );
};

export default Celebration;
