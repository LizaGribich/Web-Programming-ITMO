import {checkR, getR, showMessage} from './validation.js';


const SVG_SIZE = 350;
const SVG_CENTER = SVG_SIZE / 2;

document.getElementById('interactiveArea').addEventListener('click', function (event) {
    if (!checkR()) {
        let errorMessageElement = document.getElementById('errorMessage');
        showMessage(errorMessageElement, 'Значение R вне допустимого диапазона');
        return;
    }
    let R = getR();
    const SCALE_COEFFICIENT = 2 * R / (SVG_SIZE - 20);
    let x = (event.offsetX - SVG_CENTER) * SCALE_COEFFICIENT;
    let y = (SVG_CENTER - event.offsetY) * SCALE_COEFFICIENT;

    if (y > 3) y = 3;
    if (y < -3) y = -3;

    document.getElementById('j_idt6:xValue').value = x;
    document.getElementById('j_idt6:yValue').value = y;
    document.getElementById('j_idt6:rValue').value = R;

    let slider = PF('xSlider');
    slider.setValue(x);

    sendHit();
});

function changeRValuesSVG() {
    if (!checkR()) {
        console.log("null");
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

    circle.setAttribute("r", 3);
    circle.setAttribute("fill", isHit ? "green" : "red");
    svg.appendChild(circle);
}

function removeAllPointsFromSVG() {
    let svg = document.getElementById('interactiveArea');

    let circles = svg.querySelectorAll('circle');
    circles.forEach(circle => {
        svg.removeChild(circle);
    });
}
export function plotPointsFromTable() {
    removeAllPointsFromSVG();
    let rows = document.querySelectorAll('#hitsTable_data tr[data-ri]');

    rows.forEach(row => {
        let cells = row.children;
        let x = parseFloat(cells[0].textContent);
        let y = parseFloat(cells[1].textContent);
        let r = parseFloat(cells[2].textContent);
        let result = cells[3].textContent.trim().toLowerCase() === 'true';
        addPointToSVG(x, y, result);
    });
}

export function sliderMoveR() {
    changeRValuesSVG();
    plotPointsFromTable();
}


window.addEventListener('load', function () {
    changeRValuesSVG();
    plotPointsFromTable();
    console.log("load")
});

document.addEventListener('DOMContentLoaded', function () {
    let rValueElement = document.getElementById('j_idt6:rValue');
    rValueElement.addEventListener('change', function() {
            changeRValuesSVG();
            plotPointsFromTable();
        });
});

