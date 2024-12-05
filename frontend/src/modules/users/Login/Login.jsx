import React from 'react';
import { useNavigate } from '../../../components/Routers';
import axios from 'axios';
import LoginCard from '../../../components/LoginCard';
import CustomMessage from '../../../components/CustomMessage';

const LoginOrganism = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
      try {
        const response = await axios.post('/user/login', values);
        if (response.status === 200) {
          const { token } = response.data;
          localStorage.setItem('jwtToken', token);
          CustomMessage.success('Login successful');
          navigate('/view-property');
          axios.defaults.headers.common['Authorization'] = `${token}`;
        } else {
          CustomMessage.error('Login failed. Please check your credentials and try again.');
        }
      } catch (error) {
        console.error('Error during login:', error);
        CustomMessage.error('Login failed. Please try again later.');
      }

    } 

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <LoginCard onFinish={onFinish} onFinishFailed={onFinishFailed} navigate={navigate} />
  );
  }
export default LoginOrganism;

