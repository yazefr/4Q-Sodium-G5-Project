function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999; path=/';
}

function showRegisterForm() {
    document.getElementById("user-forms").style.display = "block";
    document.getElementById("form-title").innerText = "User  Registration";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

function showLoginForm() {
    document.getElementById("user-forms").style.display = "block";
    document.getElementById("form-title").innerText = "User  Login";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

function hideUser Forms() {
    document.getElementById("user-forms").style.display = "none";
}

function registerUser () {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        setCookie("username", username, 7);
        alert("User  registered successfully!");
        hideUser Forms();
    } else {
        alert("Please enter both username and password.");
    }
}

function loginUser () {
    const username = getCookie("username");
    const inputUsername = document.getElementById("username").value;
    const inputPassword = document.getElementById("password").value;

    if (inputUsername === username) {
        alert("Welcome back, " + username + "!");
        hideUser Forms();
    } else {
        alert("Invalid username or password.");
    }
}