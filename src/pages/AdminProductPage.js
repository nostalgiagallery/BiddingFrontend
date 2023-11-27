import React from "react";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";
import AdminProduct from "../features/admin/Adminproduct";

const AdminProductPage = () => {
  return (
    <>
      <Navbar>
        <AdminProduct/>
      </Navbar>
      <Footer />
    </>
  );
};

export default AdminProductPage;
