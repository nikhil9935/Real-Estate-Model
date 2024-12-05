import React, { useState } from "react";
import { Form, Input, InputNumber } from './AntdComponents';
import { UserOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined } from './AntdComponents';
import ButtonAtom from "./Buttons";

const LoginFields = ({ type, prefix, label, name, rules, placeholder, ...rest }) => {
  const InputComponent = type === 'number' ? InputNumber : Input;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const getPrefixIcon = () => {
    switch (prefix) {
      case 'user':
        return <UserOutlined />;
      case 'lock':
        return <LockOutlined />;
      default:
        return null;
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <Form.Item label={label} name={name} rules={rules}>
      <InputComponent
        prefix={getPrefixIcon()}
        placeholder={placeholder}
        type={type === "password" ? (isPasswordVisible ? "text" : "password") : type}
        {...rest}
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
    </Form.Item>
  );
};

export default LoginFields;
