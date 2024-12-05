import React, { useState } from "react";
import { Input } from "./AntdComponents";
import { EyeOutlined, EyeInvisibleOutlined } from "./AntdComponents";
import ButtonAtom from "./Buttons";

const SignUpFields = ({ prefix, placeholder, fieldProps, help, validateStatus, type }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <Input
      prefix={prefix}
      placeholder={placeholder}
      type={type === "password" ? (isPasswordVisible ? "text" : "password") : type}
      {...fieldProps}
      help={help}
      validateStatus={validateStatus}
      suffix={
        type === "password" && (
          <ButtonAtom
            type="text"
            icon={isPasswordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            onClick={togglePasswordVisibility}
          />
        )
      }
    />
  );
};

export default SignUpFields;
