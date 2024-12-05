import React from "react";
import { Form, Button } from "./AntdComponents";

import { UserOutlined, LockOutlined } from "./AntdComponents";
import SignUpFields from "./SignUpFields";

const SignUpForm = ({ formik }) => {
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={formik.handleSubmit}
      onFinishFailed={formik.handleFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        help={formik.errors.username}
        validateStatus={formik.errors.username ? "error" : ""}
      >
        <SignUpFields prefix={<UserOutlined />} placeholder="Username" fieldProps={formik.getFieldProps("username")} />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        help={formik.errors.email}
        validateStatus={formik.errors.email ? "error" : ""}
      >
        <SignUpFields prefix={<UserOutlined />} placeholder="Email" fieldProps={formik.getFieldProps("email")} />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        help={formik.errors.password}
        validateStatus={formik.errors.password ? "error" : ""}
      >
        <SignUpFields prefix={<LockOutlined />} placeholder="Password" fieldProps={formik.getFieldProps("password")} type="password" />
      </Form.Item>
      <Form.Item
        label="Phone"
        name="phone"
        help={formik.errors.phone}
        validateStatus={formik.errors.phone ? "error" : ""}
      >
        <SignUpFields prefix={<UserOutlined />} placeholder="Phone" fieldProps={formik.getFieldProps("phone")} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUpForm;
