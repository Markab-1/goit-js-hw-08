import throttle from 'lodash.throttle';
const refs = {
    form: document.querySelector(".feedback-form"),
    textarea: document.querySelector(".feedback-form textarea"),
    email: document.querySelector(".feedback-form input"),
}

let data = {
    email: "",
    message: "",
}

const STORAGE_KEY = "feedback-form-state";

refs.form.addEventListener("submit", onFormSubmit);
refs.textarea.addEventListener("input", throttle(onTextInput, 500));
refs.email.addEventListener("input", throttle(onEmailInput, 500));

fillingTextarea();

function onTextInput(event) {
    data.message = event.target.value;  
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function onEmailInput(event) {
    data.email = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));  
}

function onFormSubmit(event) {
    event.preventDefault();
     event.target.reset();
    console.log(localStorage.getItem(STORAGE_KEY));
    localStorage.removeItem(STORAGE_KEY);    
}

function fillingTextarea() {
    const savedMsg = localStorage.getItem(STORAGE_KEY);
   
    if (savedMsg) {
        refs.textarea.value = JSON.parse(savedMsg).message;
    }
}