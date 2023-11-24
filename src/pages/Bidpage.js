import React from "react";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";
import Bid from "../features/bid/components/Bid";

const Bidpage = () => {
  return (
    <>
      <Navbar>
        <Bid/>
      </Navbar>
      <Footer />
    </>
  );
};

export default Bidpage;
