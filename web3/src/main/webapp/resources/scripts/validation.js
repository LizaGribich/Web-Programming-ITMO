import BigNumber from 'bignumber.js';

function checkX() {
    let inputValue = document.getElementById('j_idt6:xValue').value;
    return inputValue > -4 && inputValue < 4 && inputValue;
}

function getX() {
    let inputValue = document.getElementById('j_idt6:xValue');
    return parseFloat(inputValue.value);
}

function checkY() {
    const minValue = new BigNumber("-5");
    const maxValue = new BigNumber("5");
    let inputValue = document.getElementById("j_idt6:yValue").value;
    let numericValue = new BigNumber(inputValue);
    return !(numericValue.isNaN() || numericValue.lte(minValue) || numericValue.gte(maxValue));
}

function getY() {
    let inputValue = document.getElementById("j_idt6:yValue").value;
    return new BigNumber(inputValue);
}


export function checkR() {
    let inputValue = document.getElementById('j_idt6:rValue').value;
    const validValues = [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4];
    inputValue = parseFloat(inputValue);
    return inputValue && validValues.includes(inputValue);
}


export function getR() {
    let inputValue = document.getElementById('j_idt6:rValue').value;
    return parseFloat(inputValue);
}

export function showMessage(messageArea, message) {
    messageArea.textContent = message;
    messageArea.style.display = "block";
    setTimeout(function () {
        messageArea.style.display = "none"
    }, 3000);
}
export function validateForm() {
    let errorMessageElement = document.getElementById('errorMessage');
    if (!checkX()) {
        showMessage(errorMessageElement, 'Значение X вне допустимого диапазона');
        return false;
    } else if (!checkY()) {
        showMessage(errorMessageElement, 'Значение Y вне допустимого диапазона');
        return false;
    } else if (!checkR()) {
        showMessage(errorMessageElement, 'Значение R вне допустимого диапазона');
        return false;
    }
    return true;
}

