const form = document.getElementById("guestbook-form");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const linkedin = document.getElementById("linkedin");
const met = document.getElementById("met");
const other = document.getElementById("other");
const mailingList = document.getElementById("mailing-list");
const emailFormats = document.querySelector(".field-radio");

emailFormats.style.display = "none";
other.parentElement.style.display = "none";

mailingList.onclick = function () {
    emailFormats.style.display = mailingList.checked ? "block" : "none";
};

met.onchange = function () {
    if(met.value === "other") {
        other.parentElement.style.display = "block";
    } else {
        other.parentElement.style.display = "none";
    }
};

function clearErrors() {
    let errors = document.getElementsByClassName("error");
    for(let i=0; i<errors.length; i++) {
        errors[i].style.display = "none";
    }
}

form.onsubmit = (event) => {
    let valid = true;
    clearErrors();

    if(!firstName.value.trim()) {
        document.getElementById("err-fname").style.display = "block";
        valid = false;
    }
    if(!lastName.value.trim()) {
        document.getElementById("err-lname").style.display = "block";
        valid = false;
    }

    const emailVal = email.value.trim();
    if(mailingList.checked && emailVal === "" && (!emailVal.includes("@") || !emailVal.includes("."))) {
        document.getElementById("err-email").style.display = "block";
        valid = false;
    }

    const linkedinVal = linkedin.value.trim();
    if(linkedinVal && !linkedinVal.startsWith("https://linkedin.com/in/")) {
        document.getElementById("err-linkedin").style.display = "block";
        valid = false;
    }

    if(met.value === "none") {
        document.getElementById("err-met").style.display = "block";
        valid = false;
    }

    if(met.value === "other" && other.value.trim() === "") {
        document.getElementById("err-othermet").style.display = "block";
        valid = false;
    }

    return valid;
};
