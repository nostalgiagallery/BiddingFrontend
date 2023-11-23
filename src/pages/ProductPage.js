import React from "react";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";
import ProductList from "../features/product/components/ProductList";

const ProductPage = () => {
  return (
    <>
      <Navbar>
        <ProductList />
      </Navbar>
      <Footer />
    </>
  );
};

export default ProductPage;
