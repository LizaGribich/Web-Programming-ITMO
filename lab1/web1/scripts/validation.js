import { addToTable } from './table.js';
import BigNumber from 'bignumber.js';
// todo decompose on several files with srp
// done

// TODO return just one type
// done
function checkX() {
    //TODO querySelector
    //done
    return !!document.querySelector('input[name="X"]:checked');
}

function getX() {
    let radioButton = document.querySelector('input[name="X"]:checked');
    return parseFloat(radioButton.value);
}

function checkY() {
    // TODO extract const
    //done
    const minValue = new BigNumber("-3");
    const maxValue = new BigNumber("5");
    let inputValue = document.getElementById("inputY").value;
    let numericValue = new BigNumber(inputValue);
    return !(numericValue.isNaN() || numericValue.lte(minValue) || numericValue.gte(maxValue));
}
function getY() {
    let inputValue = document.getElementById("inputY").value;
    return new BigNumber(inputValue);
}

function getR() {
    let inputValue = document.getElementById("inputR").value;
    return parseFloat(inputValue);
}

export function showMessage(messageArea, message) {
    messageArea.textContent = message;
    messageArea.style.display = "block";
    setTimeout(function () {
        messageArea.style.display = "none"
    }, 3000);
}

let button = document.getElementById("checkButton");
button.addEventListener("click", function () {
    let error = document.getElementById("errorMessage");
    if (!checkX()) {
        showMessage(error, "Выберите значение X");
    } else if (!checkY()) {
        showMessage(error, "Введите значение Y в (-3;5)");
    } else {
        error.style.display = "none"
        // todo rewrite on fetch
        // done
        let x = getX();
        let y = getY();
        let R = getR();

        fetch(`https://se.ifmo.ru/~s368051/lab1/web1/backend/hit.php?x=${x}&y=${y}&R=${R}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка: ' + response.status);
                }
                return response.text();
            })
            .then(data => {
                addToTable(data);
            })
            .catch(error => {
                console.error('Произошла ошибка:', error);
            });
    }
});


