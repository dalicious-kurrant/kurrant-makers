import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import Login from '../../component/Login/Login';
import LoginHeader from '../../component/Login/LoginHeader';

const LoginPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) navigate('/product');
  }, [navigate, token]);
  return (
    <Container>
      <Wrap>
        <LoginHeader />
        <Login />
      </Wrap>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f8f8fb;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 360px;
  height: 500px;
`;
