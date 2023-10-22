import { addToTable } from './table.js';
import BigNumber from 'bignumber.js';

function checkX() {
    return !!document.querySelector('input[name="X"]:checked');
}

function getX() {
    let radioButton = document.querySelector('input[name="X"]:checked');
    return parseFloat(radioButton.value);
}



function checkY() {
    const minValue = new BigNumber("-3");
    const maxValue = new BigNumber("3");
    let inputValue = document.getElementById("inputY").value;
    let numericValue = new BigNumber(inputValue);
    return !(numericValue.isNaN() || numericValue.lte(minValue) || numericValue.gte(maxValue));
}
function getY() {
    let inputValue = document.getElementById("inputY").value;
    return new BigNumber(inputValue);
}

export function checkR() {
    return !!document.querySelector('input[name="R"]:checked');
}

export function getR() {
    let radioButton = document.querySelector('input[name="R"]:checked');
    return parseFloat(radioButton.value);
}

export function showMessage(messageArea, message) {
    messageArea.textContent = message;
    messageArea.style.display = "block";
    setTimeout(function () {
        messageArea.style.display = "none"
    }, 3000);
}

export function sendHit(x,y,R) {
    fetch(`/web2/ControllerServlet?x=${x}&y=${y}&R=${R}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка: ' + response.status);
            }
            return response.text();
        })
        .then(data => {
            addToTable(data);
            window.location.href = "/web2/result.jsp";
        })
        .catch(error => {
            console.error('Произошла ошибка:', error);
        });
}

let button = document.getElementById("checkButton");
button.addEventListener("click", function () {
    let error = document.getElementById("errorMessage");
    if (!checkX()) {
        showMessage(error, "Выберите значение X");
    } else if (!checkY()) {
        showMessage(error, "Введите значение Y в (-3;3)");
    } else if (!checkR()) {
        showMessage(error, "Выберите значение R");
    }else {
        error.style.display = "none"
        let x = getX();
        let y = getY();
        let R = getR();
        sendHit(x,y,R);
    }
});
