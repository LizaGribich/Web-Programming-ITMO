import React from 'react';
import { Button } from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import AlertMessage from "./AlertMessage";

const LoginPage = ({onLogin }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');

    const showError = (newMessage) => {
        setErrorMessage(''); // Сначала очистить сообщение
        setTimeout(() => {
            setErrorMessage(newMessage); // Затем установить новое сообщение
        }, 10); // Маленькая задержка, чтобы гарантировать, что React обновит состояние
    };

    const handleLogin = async () => {
        const response = await fetch('http://localhost:8080/web4/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const token_ = await response.text();
            onLogin(true, token_);
            console.log(token_);
        } else {
            onLogin(false);
            showError('Неверный логин или пароль');
        }
    };

    const handleRegister = async () => {
        const response = await fetch('http://localhost:8080/web4/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const token = await response.text();
            onLogin(true, token);
        } else {
            onLogin(false);
            showError('Такой пользователь уже зарегестрирован')
        }
    };


    return (
        <div>
            <h2>Грибич Елизавета Дмитриевна</h2>
            <h2>Группа: P3224</h2>
            <h2>Вариант: 412347</h2>
            <Input
                type="text"
                label="Username"
                value={username}
                onChange={(value) => setUsername(value)}
            />
            <Input
                type="password"
                label="Password"
                value={password}
                onChange={(value) => setPassword(value)}
            />
            <AlertMessage message={errorMessage} />
            <Button label="Войти" onClick={handleLogin} />
            <Button label="Зарегистрироваться" onClick={handleRegister} />
        </div>
    );
};

export default LoginPage;
