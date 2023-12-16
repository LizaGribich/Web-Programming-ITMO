import React, {useEffect, useState} from 'react';
import {Button} from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import AlertMessage from './AlertMessage';

const InputForm = ({errorMessage, sendSubmission, showError, setCurrentR}) => {

    const [x, setX] = useState(localStorage.getItem('x') || '');
    const [y, setY] = useState(localStorage.getItem('y') || '');
    const [r, setR] = useState(localStorage.getItem('r') || '');

    useEffect(() => {
        localStorage.setItem('x', x);
    }, [x]);

    useEffect(() => {
        localStorage.setItem('y', y);
    }, [y]);

    useEffect(() => {
        localStorage.setItem('r', r);
    }, [r]);

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

    const showValidationError = (validationError) => {
        if (validationError) {
            console.error(validationError);
            showError(validationError);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationError = validateInput(x, y, r);
        if (validationError) {
            showValidationError(validationError);
        } else {
            sendSubmission(x, y, r);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="x">X</label>
                <Input className="input-field" type="text" value={x} onChange={(value) => setX(value)}/>
                <label htmlFor="y">Y</label>
                <Input className="input-field" type="text" value={y} onChange={(value) => setY(value)}/>
                <label htmlFor="r">R</label>
                <Input className="input-field" type="text" value={r} onChange={(value) => {
                    setR(value);
                    setCurrentR(value);
                }}/>
                <AlertMessage message={errorMessage}/>
                <Button className="button" label="Отправить" type="submit"/>
            </form>
        </div>
    );
};

export default InputForm;
