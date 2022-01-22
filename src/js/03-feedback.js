import throttle from 'lodash.throttle';
const refs = {
    form: document.querySelector(".feedback-form"),
    textarea: document.querySelector(".feedback-form textarea"),
}

let data = {
    email: "",
    message: "",
}

const STORAGE_KEY = "feedback-form-state";

refs.form.addEventListener("submit", onFormSubmit);
refs.textarea.addEventListener("input", throttle(onTextInput, 500));

fillingTextarea();

function onTextInput(event) {
    data.message = event.target.value;  
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function onFormSubmit(event) {
    event.preventDefault();
    data.message = refs.form.elements.message.value;
    data.email = refs.form.elements.email.value;

    if (!data.message || !data.email) {
        alert("Все поля должны быть заполнены");
        return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    event.target.reset();
    localStorage.removeItem(STORAGE_KEY);    
}

function fillingTextarea() {
    const savedMsg = localStorage.getItem(STORAGE_KEY);
   
    if (savedMsg) {
        refs.textarea.value = JSON.parse(savedMsg).message; 
    }
}