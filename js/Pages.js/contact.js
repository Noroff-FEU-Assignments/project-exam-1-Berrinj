const form = document.getElementById("contact-form");
const name = document.getElementById("your-name");
const email = document.getElementById("your-email");
const subject = document.getElementById("your-subject");
const message = document.getElementById("your-message");
const successMsg = document.querySelector(".success-message");


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



const formSubmissionHandler = (event) => {
    event.preventDefault();
    
    if(validateInputs()) {

    const formElement = event.target; 
    const { action, method } = formElement; 
    const body = new FormData(formElement);
console.log("Form Data:", body)

    fetch(action, {method, body})
    .then((response) => response.json())
    .then((response) => {
        console.log(response)
        if(response.status === "mail_sent") {
            successMsg.style.background = "#a1ca77";
            successMsg.innerHTML = `<p class="success-form-message">Meldingen din er mottatt, jeg prøver å svare innen 24timer :)</p>`;
            form.reset();
        } else {
            successMsg.style.background = "#ff0000";
            successMsg.innerHTML += `<p class="success-form-message">${response.message}</p>`; 
        }
    });
}
};


form.addEventListener("submit", formSubmissionHandler);

/*      https://css-tricks.com/headless-form-submission-with-the-wordpress-rest-api/        */


// const nav = document.querySelector(".main-menu");
// const hamburgerMenu = document.querySelector(".hamburger-menu");

// hamburgerMenu.addEventListener("click", hamburgerMenuClick);

// export function hamburgerMenuClick() {
//     nav.classList.toggle("active")
// }