// X

let inputX = document.getElementById('j_idt6:xValue');
inputX.addEventListener('input', function() {
    localStorage.setItem('inputX', inputX.value);
});

function restoreX() {
    let savedX = localStorage.getItem('inputX');
    if (savedX) {
        document.getElementById('j_idt6:xValue').value = savedX;
    }
}

// Y
let inputY = document.getElementById('j_idt6:yValue');
inputY.addEventListener('input', function() {
    localStorage.setItem('inputY', inputY.value);
});

function restoreY() {
    let savedY = localStorage.getItem('inputY');
    if (savedY) {
        inputY.value = savedY;
    }
}

// R
let inputR = document.getElementById('j_idt6:rValue');
inputR.addEventListener('input', function() {
    localStorage.setItem('inputR', inputR.value);
});
function restoreR() {
    let savedR = localStorage.getItem('inputR');
    if (savedR) {
        document.getElementById('j_idt6:rValue').value = savedR;
    }
}

function restore() {
    restoreX();
    restoreY();
    restoreR();
}

window.addEventListener('load', restore);

