import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedinUser, selectStatus } from "../authSlice";
import { Audio } from "react-loader-spinner";

const ProtectedAdmin = ({ children }) => {
  const Status = useSelector(selectStatus);
  const user = useSelector(selectLoggedinUser);

  if (Status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Audio
          height={100}
          width={100}
          radius={5}
          color="#600AFF"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
          ariaLabel="loading"
        />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/"></Navigate>;
  }

  if (user && user.role !== "admin") {
    return <Navigate to="/"></Navigate>;
  }

  return children;
};

export default ProtectedAdmin;
