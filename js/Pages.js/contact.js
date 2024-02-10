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

/* Following code from https://blog.hubspot.com/website/accessible-drop-down-menus and chat chatgpt*/

const menuItems = document.querySelectorAll("li.sub-menu-start");
Array.prototype.forEach.call(menuItems, function (el, i) {
    const link = el.querySelector("a");
    const subMenu = el.querySelector(".sub-menu");
    const subMenuLinks = subMenu.querySelectorAll("a");

    link.addEventListener("click", function (event) {
        if (el.classList.contains("open")) {
            closeSubMenu(el, link, subMenu);
        } else {
            openSubMenu(el, link, subMenu);
        }

        event.preventDefault();
    });

    link.addEventListener("keydown", function (event) {
        if (event.key === "Tab" && !event.shiftKey) {
            openSubMenu(el, link, subMenu);
            event.preventDefault();
        } else if (event.key === "Enter" || event.key === " ") {
            if (el.classList.contains("open")) {
                closeSubMenu(el, link, subMenu);
            } else {
                openSubMenu(el, link, subMenu);
            }

            event.preventDefault();
        }
    });

    subMenuLinks.forEach(function (subLink) {
        subLink.addEventListener("keydown", function (event) {
            if (event.key === "Tab" && !event.shiftKey) {
                // Tab key, move focus to the next submenu item
                if (subLink === subMenuLinks[subMenuLinks.length - 1]) {
                    closeSubMenu(el, link, subMenu);
                }
            } else if (event.key === "Tab" && event.shiftKey) {
                // Shift + Tab, move focus to the previous submenu item
                if (subLink === subMenuLinks[0]) {
                    closeSubMenu(el, link, subMenu);
                }
            }
        });
    });

    function openSubMenu(item, itemLink, submenu) {
        item.classList.add("open");
        itemLink.setAttribute("aria-expanded", "true");
        submenu.setAttribute("aria-hidden", "false");
        subMenuLinks[0].focus();
    }

    function closeSubMenu(item, itemLink, submenu) {
        item.classList.remove("open");
        itemLink.setAttribute("aria-expanded", "false");
        submenu.setAttribute("aria-hidden", "true");
    }
});