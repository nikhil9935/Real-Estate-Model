// LoginCard.js
import React from 'react';
import { Card, Typography } from './AntdComponents';
import LoginFormMolecule from './LoginForm';
import ButtonAtom from './Buttons';

const { Text } = Typography;

const LoginCard = ({ onFinish, onFinishFailed, navigate }) => {
  return (
    <Card
      title="Login"
      style={{
        borderRadius: 10,
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        backgroundColor: '#e6f7ff',
        width: 400,
        margin: 'auto',
        marginTop: 200,
      }}
    >
      <LoginFormMolecule onFinish={onFinish} onFinishFailed={onFinishFailed} />

      <Text style={{ textAlign: 'center', marginTop: 16, padding: 90 }}>
        New User <ButtonAtom type="link" onClick={() => navigate('/')}>Sign Up</ButtonAtom>
      </Text>

      <br></br> <br></br>
    </Card>
  );
};

export default LoginCard;
