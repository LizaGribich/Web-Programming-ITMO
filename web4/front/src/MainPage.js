import React, {useEffect, useState} from 'react';
import {Button} from 'react-toolbox/lib/button';
import DataTable from './DataTable';
import Input from "react-toolbox/lib/input";
import Area from "./Area";
import AlertMessage from "./AlertMessage";
import './css/MainPage.css';

const MainPage = ({token, onLogout}) => {

    const [x, setX] = useState(localStorage.getItem('x') || '');
    const [y, setY] = useState(localStorage.getItem('y') || '');
    const [r, setR] = useState(localStorage.getItem('r') || '');
    const [errorMessage, setErrorMessage] = useState('');

    const [data, setData] = useState([]); // Состояние для хранения данных таблицы

    useEffect(() => {
        localStorage.setItem('x', x);
    }, [x]);

    useEffect(() => {
        localStorage.setItem('y', y);
    }, [y]);

    useEffect(() => {
        localStorage.setItem('r', r);
    }, [r]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('./web4/api/hit/get', {
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
        const response = await fetch('./web4/api/hit/do', {
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
        const validationError = validateInput(x.toString(), y.toString(), r.toString());
        if (validationError) {
            console.error(validationError);
            showError(validationError);
            return;
        }
        const hitData = {x, y, r};
        const response = await fetch('./web4/api/hit/do', {
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
        const response = await fetch('./web4/api/hit/clear', {
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


        <div className="main-page-container">
            <div className="left-column">
                <Area data={data} currentR={r} handleAreaSubmit={handleAreaSubmit} showError={showError}/>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="x">X</label>
                        <Input className="input-field" type="text" value={x} onChange={(value) => setX(value)}/>
                        <label htmlFor="y">Y</label>
                        <Input className="input-field" type="text" value={y} onChange={(value) => setY(value)}/>
                        <label htmlFor="r">R</label>
                        <Input className="input-field" type="text" value={r} onChange={(value) => setR(value)}/>
                        <AlertMessage message={errorMessage}/>
                        <Button className="button" label="Отправить" type="submit"/>
                    </form>
                </div>
                <div className="button-container">
                    <Button className="button" label="Очистить данные" onClick={handleClearData}/>
                    <Button className="button" label="Выйти" onClick={onLogout}/>
                </div>
            </div>
            <div className="left-column">
                <DataTable data={data}/>
            </div>
        </div>
    );
};

export default MainPage;
