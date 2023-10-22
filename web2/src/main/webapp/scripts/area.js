import {getR, sendHit, showMessage, checkR} from './validation.js';

const SVG_SIZE = 350;
const SVG_CENTER = SVG_SIZE / 2;
document.getElementById('interactiveArea').addEventListener('click', function (event) {
    if (!checkR()) {
        let error = document.getElementById("errorMessage");
        showMessage(error, "Выберите значение R");
        return;
    }
    let R = getR();
    const SCALE_COEFFICIENT = 2 * R / (SVG_SIZE - 20);
    // Преобразование координат
    let x = (event.offsetX - SVG_CENTER) * SCALE_COEFFICIENT;
    let y = (SVG_CENTER - event.offsetY) * SCALE_COEFFICIENT;

    // Ограничиваем y
    if (y > 3) y = 3;
    if (y < -3) y = -3;

    sendHit(x, y, R);
});

export function addPointToSVG(x, y, isHit) {
    let svg = document.getElementById('interactiveArea');
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    if (!checkR()) {
        return;
    }
    let R = getR();
    const SCALE_COEFFICIENT = 2 * R / (SVG_SIZE - 20);
    let xPixel = x / SCALE_COEFFICIENT + SVG_CENTER;
    let yPixel = SVG_CENTER - y / SCALE_COEFFICIENT;

    circle.setAttribute("cx", xPixel);
    circle.setAttribute("cy", yPixel);

    circle.setAttribute("r", 3); // радиус точки
    circle.setAttribute("fill", isHit ? "green" : "red"); // цвет в зависимости от результата
    svg.appendChild(circle);
}

function plotPointsFromTable() {
    removeAllPointsFromSVG();
    // Получаем все строки из таблицы (исключая заголовок)
    let rows = document.querySelectorAll('#result-table tbody tr');

    rows.forEach(row => {
        let x = parseFloat(row.cells[0].textContent);
        let y = parseFloat(row.cells[1].textContent);
        let isHit = row.cells[3].textContent === "true";

        addPointToSVG(x, y, isHit);
    });
}

function removeAllPointsFromSVG() {
    let svg = document.getElementById('interactiveArea');

    let circles = svg.querySelectorAll('circle');
    circles.forEach(circle => {
        svg.removeChild(circle);
    });
}

function changeRValuesSVG() {
    if (!checkR()) {
        return;
    }
    let rValue = getR();
    let halfR = rValue / 2;

    document.getElementById("x-negative-R").textContent = -rValue;
    document.getElementById("x-half-negative-R").textContent = -halfR;
    document.getElementById("x-half-R").textContent = halfR;
    document.getElementById("x-R").textContent = rValue;

    document.getElementById("y-negative-R").textContent = -rValue;
    document.getElementById("y-half-negative-R").textContent = -halfR;
    document.getElementById("y-half-R").textContent = halfR;
    document.getElementById("y-R").textContent = rValue;

}



window.addEventListener('load', function () {
    plotPointsFromTable();
    changeRValuesSVG();
});

window.addEventListener('load', function () {
    let radios = document.querySelectorAll('input[type="radio"][name="R"]');
    radios.forEach(function (radio) {
        radio.addEventListener('change', plotPointsFromTable);
        radio.addEventListener('change', changeRValuesSVG);
    });
});