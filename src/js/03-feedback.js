import throttle from 'lodash.throttle';

const formRef = document.querySelector(".feedback-form");

let data = {
    email: "",
    message: ""
}

const STORAGE_KEY = "feedback-form-state";

formRef.addEventListener("submit", onFormSubmit);
formRef.addEventListener("input", throttle(onFormInput, 500));

fillingTextarea();

function onFormInput(event) {
    if (event.target.name === "email") { data.email = event.target.value; }
    if (event.target.name === "message") { data.message = event.target.value; }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function onFormSubmit(event) {
    event.preventDefault();

    if (!data.message || !data.email) {
        alert("Все поля должны быть заполнены");
        return;
    }

    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    event.target.reset();
    localStorage.removeItem(STORAGE_KEY);
    data.email = "";
    data.message = "";
}

function fillingTextarea() {
    const savedMsg = JSON.parse(localStorage.getItem(STORAGE_KEY));
   
    if (savedMsg) {
        formRef.elements.message.value = savedMsg.message; 
        formRef.elements.email.value = savedMsg.email;
        data.message = savedMsg.message;
        data.email = savedMsg.email;
    }
}