import { useState } from './Hooks';
import { Form } from './AntdComponents';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from './AntdComponents';
import LoginFields from './LoginFields';
import ButtonAtoms from './Buttons';

const LoginForm = ({ onFinish, onFinishFailed }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >

      <Form.Item
        label="Username"
        name="username"
        data-testid="Username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <LoginFields prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>


      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <LoginFields
          prefix={<LockOutlined />}
          placeholder="Password"
          type={showPassword ? 'text' : 'password'}
          suffix={
            <span
              style={{ cursor: 'pointer' }}
              onClick={handleTogglePassword}
            >
              {showPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
            </span>
          }
        />
      </Form.Item>


      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <ButtonAtoms type="primary" htmlType="submit">
          Submit
        </ButtonAtoms>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
