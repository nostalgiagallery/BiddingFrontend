import React from "react";
import "./Ripple.css";

const ContinuousRippleEffect = ({ children, backgroundColor }) => {
  const rippleStyle = {
    backgroundColor: backgroundColor || "rgba(255, 255, 255, 0.3)", // Default color if not provided
  };

  return (
    <div className="relative w-full h-full pointer-events-none overflow-hidden md:overflow-visible">
      <span className="absolute inset-0 flex justify-center items-center pointer-events-none ">
        {children}
        <span
          className="absolute w-40 h-40 rounded-full animate-ripple"
          style={rippleStyle}
        ></span>
      </span>
    </div>
  );
};

export default ContinuousRippleEffect;
