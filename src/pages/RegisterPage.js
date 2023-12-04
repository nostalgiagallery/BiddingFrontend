import React from "react";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";
import Register from "../features/register/components/Register";

const RegisterPage = () => {
  return (
    <>
      <Navbar>
        <Register/>
      </Navbar>
      <Footer />
    </>
  );
};

export default RegisterPage;
