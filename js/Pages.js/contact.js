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
        fieldset.innerHTML = `<p class="success-form-message">Meldingen din er mottatt, jeg prøver å svare innen 24timer :) </p>`;
    };
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorMessage = inputControl.querySelector(".form-error");

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

    if (nameValue === "") {
        setError(name, "Navn er påkrevd");
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

    if (subjectValue === "") {
        setError(subject, "Et emne er påkrevd");
        isValid = false;
    } else {
        setSuccess(subject);
    }
    if (messageValue === "") {
        setError(message, "En melding er påkrevd");
        isValid = false;
    } else if (messageValue.length < 10) {
        setError(message, "Meldingen må være på over 10 karakterer");
        isValid = false;
    } else {
        setSuccess(message);
    }

    return isValid;
};