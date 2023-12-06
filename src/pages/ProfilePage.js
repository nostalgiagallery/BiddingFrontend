import React, { useState } from "react";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";
import Profile from "../features/auth/components/user/Profile";
import AllRegistration from "../features/auth/components/user/AllRegistratin";

const ProfilePage = () => {
  const [showAllRegistration, setShowAllRegistration] = useState(true);

  const toggleAllRegistration = () => {
    setShowAllRegistration(!showAllRegistration);
  };

  return (
    <>
      <Navbar>
        <div className="relative bg-[#1D2430] h-full">
          <Profile />
          <button
            onClick={toggleAllRegistration}
            className="relative text-2xl text-gray-400 transition-transform duration-300 transform-gpu hover:scale-110"
          >
            {showAllRegistration ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
                />
              </svg>
            )}
          </button>
          {showAllRegistration && <AllRegistration />}
        </div>
      </Navbar>
      <Footer />
    </>
  );
};

export default ProfilePage;
