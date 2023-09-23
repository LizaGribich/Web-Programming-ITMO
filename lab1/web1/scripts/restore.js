//X
const radioButtons = document.querySelectorAll('input[type="radio"]');
radioButtons.forEach((radio) => {
    radio.addEventListener("change", saveX);
});

function saveX() {
    radioButtons.forEach((radio) => {
        if (radio.checked) {
            localStorage.setItem("inputX", radio.value);
        }
    });
}

function restoreX() {
    const savedX = localStorage.getItem("inputX");
    if (savedX) {
        radioButtons.forEach((radio) => {
            if (radio.value === savedX) {
                radio.checked = true;
            }
        });
    }
}

//Y
const inputY = document.getElementById("inputY");
inputY.addEventListener("input", function () {
    localStorage.setItem("inputY", inputY.value); // Изменили sessionStorage на localStorage
});

function restoreY() {
    const savedInputY = localStorage.getItem("inputY"); // Изменили sessionStorage на localStorage
    if (savedInputY) {
        inputY.value = savedInputY;
    }
}


//R
const inputR = document.getElementById("inputR");
inputR.addEventListener("change", function () {
    localStorage.setItem("inputR", inputR.value);
});

function restoreR() {
    const savedR = localStorage.getItem("inputR");
    if (savedR) {
        inputR.value = savedR;
    }
}

function restore() {
    restoreX();
    restoreY();
    restoreR();
}

window.addEventListener("load", restore);