document.getElementById("pizza-form").onsubmit = () => {
    clearErrors();
    
    // flag variable to determine if form data is valid
    let isValid = true;

    // validate first name
    let fname = document.getElementById("fname").value.trim();

    if(!fname) {
        document.getElementById("err-fname").style.display = "block";
        isValid = false;
    }

    let lname = document.getElementById("lname").value.trim();

    if(!lname) {
        document.getElementById("err-lname").style.display = "block";
        isValid = false;
    }

    let email = document.getElementById("email").value.trim();

    if(!email || email.indexOf("@") === -1) {
        document.getElementById("err-email").style.display = "block";
        isValid = false;
    }

    // validate method (pickup or delivery)
    let methodButtons = document.getElementsByName("method");
    let count = 0;
    for(let i = 0; i<methodButtons.length; i++) {
        if(methodButtons[i].checked) {
            count++;
        }
    }

    if (count === 0) {
        document.getElementById("err-method").style.display = "block";
        isValid = false;
    }

    // validate size field
    let size = document.getElementById("size").value;    
    if(size === "none") {
        document.getElementById("err-size").style.display = "block";
        isValid = false;
    }

    return isValid;
}

function clearErrors() {
    let errors = document.getElementsByClassName("error");
    for(let i = 0; i<errors.length; i++) {
        errors[i].style.display = "none";
    }
}