'use client';
import { Button, Center, Input, Text, VStack } from '@yamada-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMode, setLoginMode] = useState('login');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // sing in or lon
  const handleSignupOrLoginClick = async (e) => {
    const selectUrl =
      e.target.textContent === '新規登録' ? '/signup' : '/login';
    const loginUser = {
      username: username,
      password: password,
      email: email,
    };
    // fetch version
    let response = await fetch(`http://localhost:3000${selectUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginUser),
      credentials: 'include', // クッキーを含める
    });
    const data = await response.json();
    console.log('server response: ', data);
    if (response.ok) {
      navigate('/map');
    }
  };

  // logout
  const handleLogoutClick = async () => {
    // fetch version
    let response = await fetch(`http://localhost:3000/logout`);
    const data = await response.json();
    console.log('server response: ', data);
    if (response.ok) {
      navigate('/');
    }
  };

  // 認証済みの場合は、map画面へ遷移する
  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch('http://localhost:3000/api/auth_check', {
        credentials: 'include', // セッション情報を送信
      });
      const data = await response.json();
      if (data.authenticated) {
        navigate('/map');
      }
    };
    checkAuth();
  }, []);

  return (
    <Center h="2xl" w="md" color="white">
      <VStack>
        <Text color="gray.700">username</Text>
        <Input
          type="text"
          placeholder="your name"
          color="gray.700"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></Input>
        {loginMode === 'signup' && (
          <>
            <Text color="gray.700">e-mail</Text>
            <Input
              type="email"
              placeholder="your e-mail"
              color="gray.700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
          </>
        )}
        <Text color="gray.700">password</Text>
        <Input
          type="password"
          placeholder="your password"
          color="gray.700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        {loginMode === 'signup' ? (
          <Button onClick={handleSignupOrLoginClick}>新規登録</Button>
        ) : (
          <Button onClick={handleSignupOrLoginClick}>ログイン</Button>
        )}
        <Button onClick={handleLogoutClick}>ログアウト</Button>
      </VStack>
    </Center>
  );
};
export default Login;
