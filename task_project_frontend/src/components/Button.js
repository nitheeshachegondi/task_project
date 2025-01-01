import React from "react";

const Button = ({ onClick, children, type = "button", ...props }) => {
  return (
    <button type={type} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
