import React, { useEffect } from "react";
import "./App.css";
import Homepage from "./pages/Homepage";
import Signup from "./features/auth/components/Signup";
import ForgotPassword from "./features/auth/components/ForgotPassword";
import ResetPassword from "./features/auth/components/ResetPassword";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AlertTemplate from "react-alert-template-basic";
import Login from "./features/auth/components/Login";
import Process from "./pages/Process";
import ProductPage from "./pages/ProductPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Register from "./features/register/components/Register";
import Bidpage from "./pages/Bidpage";
import { positions, Provider } from "react-alert";
import AdminProductPage from "./pages/AdminProductPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthAsync, selectLoggedinUser } from "./features/auth/authSlice";
import ProductForm from "./features/admin/Product-form";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import Logout from "./features/auth/components/Logout";
import ProfilePage from "./pages/ProfilePage";

const options = {
  timeout: 4000,
  position: positions.TOP_RIGHT,
  offset: "20px",
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/process",
      element: <Process />,
    },
    {
      path: "/Product-page",
      element: <ProductPage />,
    },
    {
      path: "/admin-product",
      element: (
        <ProtectedAdmin>
          <AdminProductPage />
        </ProtectedAdmin>
      ),
    },
    {
      path: "/product-form",
      element: (
        <ProtectedAdmin>
          <AdminProductFormPage />
        </ProtectedAdmin>
      ),
    },
    {
      path: "/product-form/edit/:id",
      element: (
        <ProtectedAdmin>
          <AdminProductFormPage />
        </ProtectedAdmin>
      ),
    },
    {
      path: "/Product-details/:id",
      element: <ProductDetailsPage />,
    },
    {
      path: "/Product-register/:id",
      element: (
        <Protected>
          <Register />
        </Protected>
      ),
    },
    {
      path: "/bid-page/:id",
      element: (
        <Protected>
          <Bidpage />
        </Protected>
      ),
    },
    {
      path: "/my-profile",
      element: (
        <Protected>
          <ProfilePage />
        </Protected>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },

    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, []);

  return (
    <div className="App">
      <Provider template={AlertTemplate} {...options}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
