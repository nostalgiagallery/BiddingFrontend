import React from "react";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";
import ProductDetails from "../features/product/components/ProductDetails";

const ProductDetailsPage = () => {
  return (
    <>
      <Navbar>
        <ProductDetails />
      </Navbar>
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
