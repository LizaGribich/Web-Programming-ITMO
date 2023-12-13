import React, {useEffect, useState} from 'react';
import {Button} from 'react-toolbox/lib/button';
import DataTable from './DataTable';
import Input from "react-toolbox/lib/input";
import Area from "./Area";
import AlertMessage from "./AlertMessage";

const MainPage = ({token, onLogout}) => {

    const [x, setX] = useState('');
    const [y, setY] = useState('');
    const [r, setR] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [data, setData] = useState([]); // Состояние для хранения данных таблицы


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8080/web4/api/hit/get', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setData(data);
            } else {
                console.error('Ошибка при загрузке данных');
            }
        };

        fetchData();
    }, [token]); // Зависимость от token гарантирует, что запрос будет выполнен заново при его изменении

    const validateInput = (x, y, r) => {
        if (x.trim() === '' || y.trim() === '' || r.trim() === '') {
            return 'Все поля должны быть заполнены';
        }
        if (isNaN(x) || isNaN(y) || isNaN(r)) {
            return 'X, Y и R должны быть числами.';
        }
        if (x < -3 || x > 3) {
            return 'X должен быть в диапазоне от -3 до 3';
        } else if (y < -5 || y > 3) {
            return 'Y должен быть в диапазоне от -5 до 3';
        } else if (r < 0 || r > 3) {
            return 'R должен быть в диапазоне от 0 до 3';
        }

        return '';
    }

    const showError = (newMessage) => {
        setErrorMessage(''); // Сначала очистить сообщение
        setTimeout(() => {
            setErrorMessage(newMessage); // Затем установить новое сообщение
        }, 10); // Маленькая задержка, чтобы гарантировать, что React обновит состояние
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationError = validateInput(x, y, r);
        if (validationError) {
            console.error(validationError);
            showError(validationError);

            return;
        }
        const hitData = {x, y, r};
        const response = await fetch('http://localhost:8080/web4/api/hit/do', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify(hitData),
        });
        if (response.ok) {
            const newData = await response.json();
            setData(prevData => [newData, ...prevData]);
            console.log("Данные успешно отправлены");
        } else {
            console.error("Ошибка");
        }
    };

    const handleAreaSubmit = async (x, y, R) => {
        console.log(`Отправка точки с координатами: x=${x}, y=${y}, r=${R}`);
        const validationError = validateInput(x.toString(), y.toString(), r.toString());
        if (validationError) {
            console.error(validationError);
            showError(validationError);
            return;
        }
        const hitData = {x, y, r};
        const response = await fetch('http://localhost:8080/web4/api/hit/do', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify(hitData),
        });
        if (response.ok) {
            const newData = await response.json();
            setData(prevData => [newData, ...prevData]);
            console.log("Данные успешно отправлены");
        } else {
            console.error("Ошибка");
        }
    };


    const handleClearData = async () => {
        const response = await fetch('http://localhost:8080/web4/api/hit/clear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        });
        if (response.ok) {
            console.log("Данные успешно очищены");
            setData([]);
        } else {
            console.error("Ошибка при очистке данных");
        }
    };


    return (
        <div>
            <h1>Основная страница</h1>
            <Area data={data} currentR={r} handleAreaSubmit={handleAreaSubmit} showError={showError}/>
            <form onSubmit={handleSubmit}>
                <Input type="text" label="X" value={x} onChange={(value) => setX(value)}/>
                <Input type="text" label="Y" value={y} onChange={(value) => setY(value)}/>
                <Input type="text" label="R" value={r} onChange={(value) => setR(value)}/>
                <AlertMessage message={errorMessage} />
                <Button label="Отправить" type="submit"/>
            </form>
            <Button label="Очистить данные" onClick={handleClearData} />
            <Button label="Выйти" onClick={onLogout}/>
            <DataTable data={data}/>
        </div>
    );
};

export default MainPage;
