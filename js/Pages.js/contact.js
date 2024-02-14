const nav = document.querySelector(".main-menu");
const hamburgerMenu = document.querySelector(".hamburger-menu");

hamburgerMenu.addEventListener("click", hamburgerMenuClick);

export function hamburgerMenuClick() {
    nav.classList.toggle("active")
}

const form = document.getElementById("form");
const fieldset = document.querySelector("fieldset");
const name = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

form.addEventListener("submit", e => {
    e.preventDefault();

    if(validateInputs()) {
        form.reset();
        fieldset.style.background = "#a1ca77";
        fieldset.innerHTML = `<p class="success-form-message">Meldingen din er mottatt, jeg prøver å svare innen 24timer :) </p><p><i>Kontaktskjema er ikke i bruk enda</i>.</p>`;
    };
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorMessage = inputControl.querySelector(".form-error");
    // inputControl.classList.add("form-error");
    // inputControl.classList.remove("success");
    errorMessage.innerText = message;
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorMessage = inputControl.querySelector(".form-error");

    errorMessage.innerText = "";
    inputControl.classList.add("success")
    inputControl.classList.remove("form-error")
}

const isEmailValid = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
    let isValid = true;
    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const subjectValue = subject.value.trim();
    const messageValue = message.value.trim();

   if (nameValue.length < 6) {
        setError(name, "Navnet må være på over 5 karakterer");
        isValid = false;
    } else {
        setSuccess(name);
    }

    if (emailValue === "") {
        setError(email, "Email er påkrevd");
        isValid = false;
    } else if (!isEmailValid(emailValue)) {
        setError(email, "Skriv inn en ekte email adresse");
        isValid = false;
    }else {
        setSuccess(email);
    }

    if (subjectValue.length < 16) {
        setError(subject, "Emnet må være på over 15 karakterer");
        isValid = false;
    } else {
        setSuccess(subject);
    }
    
    if (messageValue.length < 26) {
        setError(message, "Meldingen må være på over 25 karakterer");
        isValid = false;
    } else {
        setSuccess(message);
    }

    return isValid;
};