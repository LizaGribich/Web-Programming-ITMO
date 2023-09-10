function checkX() {
    let radioButtons = document.getElementsByName("X");
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            return parseFloat(radioButtons[i].value);
        }
    }
    return false;
}

function checkY() {
    let minValue = -3;
    let maxValue = 5;
    let inputValue = document.getElementById("inputY").value;
    let numericValue = parseFloat(inputValue);
    if (isNaN(numericValue) || numericValue < minValue || numericValue > maxValue) {
        return false;
    }
    return numericValue;

}

function checkR() {
    let inputValue = document.getElementById("inputR").value;
    return parseFloat(inputValue);
}

function showMessage(messageArea, message) {
    messageArea.textContent = message;
    messageArea.style.display = "block";
    setTimeout(function () {
        messageArea.style.display = "none"
    }, 3000);

}

function addToTable(response) {
    let data = JSON.parse(response);
    let table = document.getElementById("result-table");
    let rowCount = table.rows.length;

    for (let i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }

    let message = document.getElementById("resultMessage");
    if (data[data.length - 1].result) {
        showMessage(message, "Попадание!");
    } else {
        showMessage(message, "Промах!");
    }

    for (let i = 0; i < data.length; i++) {
        let x = data[i].x;
        let y = data[i].y;
        let R = data[i].R;
        let result = data[i].result;
        let currentTime = data[i].currentTime;
        let executionTime = data[i].executionTime;

        let newRow = table.insertRow(1);

        let cellX = newRow.insertCell(0);
        let cellY = newRow.insertCell(1);
        let cellR = newRow.insertCell(2);
        let cellResult = newRow.insertCell(3);
        let cellExecutedAt = newRow.insertCell(4);
        let cellExecutionTime = newRow.insertCell(5);

        cellX.innerHTML = x;
        cellY.innerHTML = y;
        cellR.innerHTML = R;
        cellResult.innerHTML = result;
        cellExecutedAt.innerHTML = currentTime;
        cellExecutionTime.innerHTML = executionTime;
    }
}

let button = document.getElementById("checkButton");
button.addEventListener("click", function () {
    checkR();
    let error = document.getElementById("errorMessage");
    if ((!checkX() && checkX() !== 0)) {
        showMessage(error, "Выберите значение X");
    } else if ((!checkY() && checkY() !== 0)) {
        showMessage(error, "Введите значение Y от -3 до 5");
    } else {
        error.style.display = "none"

        let xhr = new XMLHttpRequest();
        let x = checkX();
        let y = checkY();
        let R = checkR();
        xhr.open("GET", "./backend/hit.php?x=" + x + "&y=" + y + "&R=" + R, true);
        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                let response = xhr.responseText;
                if (xhr.status === 200) {
                    addToTable(response);
                } else {
                    console.error('Произошла ошибка:', xhr.status);
                }
            }
        };
    }
});