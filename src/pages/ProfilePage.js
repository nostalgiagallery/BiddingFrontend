import React from "react";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";
import Profile from "../features/auth/components/user/Profile";

const ProfilePage = () => {
  return (
    <>
      <Navbar>
        <Profile />
      </Navbar>
      <Footer />
    </>
  );
};

export default ProfilePage;
