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
const radioButtonsR = document.querySelectorAll('input[type="radio"]');
radioButtonsR.forEach((radio) => {
    radio.addEventListener("change", saveR);
});

function saveR() {
    radioButtons.forEach((radio) => {
        if (radio.checked) {
            localStorage.setItem("inputR", radio.value);
        }
    });
}

function restoreR() {
    const savedR = localStorage.getItem("inputR");
    if (savedR) {
        radioButtons.forEach((radio) => {
            if (radio.value === savedR) {
                radio.checked = true;
            }
        });
    }
}



function restore() {
    restoreX();
    restoreY();
    restoreR();
}

window.addEventListener("load", restore);