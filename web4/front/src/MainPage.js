import React, {useEffect, useState} from 'react';
import {Button} from 'react-toolbox/lib/button';
import DataTable from './DataTable';
import Area from "./Area";
import './css/MainPage.css';
import InputForm from "./InputForm";

const MainPage = ({token, onLogout}) => {

    const [errorMessage, setErrorMessage] = useState('');
    const [currentR, setCurrentR] = useState(localStorage.getItem('r') || '');
    const [data, setData] = useState([]);


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
    }, [token]);

    const showError = (newMessage) => {
        setErrorMessage('');
        setTimeout(() => {
            setErrorMessage(newMessage);
        }, 10);
    };

    const sendSubmission = async (x, y, r) => {
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
            console.error("Ошибка при отправке данных");
            showError("Ошибка при отправке данных")
        }
    }

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
            showError("Ошибка при очистке данных");
        }
    };

    return (
        <div className="main-page-container">
            <div className="left-column">
                <Area data={data}
                      currentR={currentR}
                      sendSubmission={sendSubmission}
                      showError={showError}/>
                <div className="form-container">
                    <InputForm
                        errorMessage={errorMessage}
                        sendSubmission={sendSubmission}
                        showError={showError}
                        setCurrentR={setCurrentR}
                    />
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