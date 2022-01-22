import throttle from 'lodash.throttle';
const refs = {
    form: document.querySelector(".feedback-form"),
}

let data = {
    email: "",
    message: "",
}

const STORAGE_KEY = "feedback-form-state";

refs.form.addEventListener("submit", onFormSubmit);
refs.form.addEventListener("input", throttle(onFormInput, 500));

fillingTextarea();

function onFormInput(event) {
    data.message = refs.form.elements.message.value;
    data.email = refs.form.elements.email.value;

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

    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    event.target.reset();
    localStorage.removeItem(STORAGE_KEY);    
}

function fillingTextarea() {
    const savedMsg = localStorage.getItem(STORAGE_KEY);
   
    if (savedMsg) {
        refs.form.elements.message.value = JSON.parse(savedMsg).message; 
        refs.form.elements.email.value = JSON.parse(savedMsg).email;
    }
}