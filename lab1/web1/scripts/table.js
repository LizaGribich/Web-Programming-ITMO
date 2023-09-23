import { showMessage } from './validation.js';
import BigNumber from 'bignumber.js';
// todo do not delete all table
//done

// todo srp
//done
function fillTheTable(response) {
    let data = JSON.parse(response);
    let table = document.getElementById("result-table");
    for (let i = 0; i < data.length; i++) {
        addRow(table, data[i])
    }
}

export function addToTable(response) {
    console.log(response)
    let data = JSON.parse(response);
    let table = document.getElementById("result-table");
    let message = document.getElementById("resultMessage");

    if (data.result) {
        showMessage(message, "Попадание!");
    } else {
        showMessage(message, "Промах!");
    }
    addRow(table, data);
}

function trim(s, amount) {

    let parts = s.split('.');
    if (parts.length < 2) {
        return s; // нет десятичной части
    }
    return parts[0] + '.' + parts[1].substring(0, amount);
}

function addRow(table, data) {
    let x = data.x;
    let y = data.y;
    let R = data.R;
    let result = data.result;
    let currentTime = data.currentTime;
    let executionTime = data.executionTime * 10000;

    let newRow = table.insertRow(1);

    let cellX = newRow.insertCell(0);
    let cellY = newRow.insertCell(1);
    let cellR = newRow.insertCell(2);
    let cellResult = newRow.insertCell(3);
    let cellExecutedAt = newRow.insertCell(4);
    let cellExecutionTime = newRow.insertCell(5);

    cellX.innerHTML = x;
    cellY.innerHTML = trim(y.toString(), 5);
    cellR.innerHTML = R;
    cellResult.innerHTML = result;
    cellExecutedAt.innerHTML = currentTime;
    cellExecutionTime.innerHTML = executionTime.toFixed(3);
}


// todo window.addEventListener (event)
// done
window.addEventListener('load', function () {
    fetch("https://se.ifmo.ru/~s368051/lab1/web1/backend/send.php")

        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка: ' + response.status);
            }
            return response.text();
        })
        .then(data => {
            fillTheTable(data);
        })
        .catch(error => {
            console.error('Произошла ошибка:', error);
        });
});
