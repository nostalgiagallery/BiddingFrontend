import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  checkAuthAsync,
  selectLoggedinUser,
  selectauthLoading,
} from "../authSlice";
import { Audio } from "react-loader-spinner";
import { useAlert } from "react-alert";

const Protected = ({ children }) => {
  const Status = useSelector(selectauthLoading);
  const user = useSelector(selectLoggedinUser);
  const alert = useAlert();

  
  if (Status) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#1D2430]">
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

  if (!user && !Status) {
    return <Navigate to="/">{alert.error("You need to log in!")}</Navigate>;
  }

  return children;
};

export default Protected;
