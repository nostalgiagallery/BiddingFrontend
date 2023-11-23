import React from "react";
import "./App.css";
import Homepage from "./pages/Homepage";
import Signup from "./features/auth/components/Signup";
import ForgotPassword from "./features/auth/components/ForgotPassword";
import ResetPassword from "./features/auth/components/ResetPassword";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/components/Login";
import Process from "./pages/Process";
import ProductPage from "./pages/ProductPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Register from "./features/register/components/Register";

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
      path: "/Product-details/:id",
      element: <ProductDetailsPage />,
    },
    {
      path: "/Product-register/:id",
      element: <Register/>,
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
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
