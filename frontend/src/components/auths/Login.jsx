'use client';

import { Button, Input, VStack, Flex, Text } from '@chakra-ui/react';
import { Field } from './components/ui/field';
import { PasswordInput } from './components/ui/password-input';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

const Login = () => {
    const [isSignInMode, setIsSignInMode] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        const urlPath = isSignInMode ? 'signup' : 'login';
        setIsSignInMode(false);
        const loginUser = {
            username: data.username,
            password: data.password,
        };
        // fetch version
        let response = await fetch(`http://localhost:3000/${urlPath}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginUser),
            credentials: 'include', // クッキーを含める
        });
        if (response.ok) {
            response = await response.json();
            console.log('server response: ', response);
            navigate('/userlist');
        }
    });

    // axios version
    //   const response = await axios.post(
    //     `http://localhost:3000/${urlPath}`,
    //     loginUser,
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         withCredentials: true,
    //       },
    //     }
    //   );
    //   console.log('signup server response:  ', response.data);
    // });

    function handleSignInClick() {
        setIsSignInMode(true);
    }

    return (
        <VStack>
            <Flex gap="20" mt="5">
                <form onSubmit={onSubmit}>
                    <VStack>
                        <Text>
                            {isSignInMode ? '初めての利用の方' : 'ユーザー登録がお済みの方'}
                        </Text>
                        <Field
                            label="ユーザー名"
                            invalid={!!errors.username}
                            errorText={errors.username?.message}
                        >
                            <Input
                                {...register('username', { required: 'Username is required' })}
                            />
                        </Field>
                        <Field
                            label="パスワード"
                            invalid={!!errors.password}
                            errorText={errors.password?.message}
                        >
                            <PasswordInput
                                {...register('password', { required: 'Password is required' })}
                            />
                        </Field>
                        <Button
                            variant="subtle"
                            px="8"
                            mx="4"
                            textStyle="md"
                            mt="4"
                            type="submit"
                        >
                            {isSignInMode ? '新規ユーザー登録' : 'ログインして進む'}
                        </Button>
                    </VStack>
                </form>
                {isSignInMode || (
                    <VStack>
                        <Text>初めての利用の方</Text>
                        <Text mt={9}>こちらから新規ユーザー登録へお進みください</Text>
                        <Button
                            variant="subtle"
                            px="8"
                            mx="4"
                            textStyle="md"
                            mt="24"
                            onClick={handleSignInClick}
                        >
                            新規ユーザー登録
                        </Button>
                    </VStack>
                )}
            </Flex>
        </VStack>
    );
};
export default Login;
