//set URL for backend
setURL('http://gruppe-221.developerakademie.net/smallest_backend_ever');

let users = [];
let allTasks =[];


/**
 * This function is called if board.html is onload.
 * 
 */
async function initBoard() {
    await initUsers();
    let session = sessionStorage.getItem('session');
    let email = users.filter(s => s['email'] == window.atob(session));
    if (session != null && email.length > 0 ){
        includeHTML();
    } else {
        location.href = 'index.html'; //redirect to login
    }
}


async function initLogin(){
    await initUsers();
    checkSession();
}


/**
 * Load users from backend
 * 
 */
async function initUsers() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    allTasks = JSON.parse(backend.getItem('tasks')) || [];
}


/**
 * This function checks whether you want to log in as a guest. If yes, the input fields are disabled.
 * 
 */
function loginAsGuest() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let guestCheckbox = document.getElementById('guest');

    if (!guestCheckbox.checked) {
        email.value = "";
        password.value = "";
        email.disabled = false;
        password.disabled = false;
    } else {
        email.value = users[3]['email'];
        password.value = window.btoa(users[3]['password']);
        email.disabled = true;
        password.disabled = true;
    }
}


/**
 * This function is executed when a user wants to log in.
 * If it is a guest, he will be forwarded immediately, otherwise the user data will be checked.
 * 
 * 
 */
function validateUser(event) {
    event.preventDefault(); //prevent reloading page
    let email = document.getElementById('email').value;
    let encodedPassword = window.btoa(document.getElementById('password').value);
    let guestCheckbox = document.getElementById('guest').checked;

    if (guestCheckbox) { //log-in as guest
        saveSession(email);
        location.href = 'board.html'; //redirect to board
    } else if (email && encodedPassword) {
        checkUserdata(email, encodedPassword);
    }
}


/**
 * This function checks the user data.
 * First, the email is searched for in the users array. If it is present, a comparison is carried out.
 * If the email does not exist, an error message is issued.
 * 
 * @param {string} email 
 * @param {string} encodedPassword 
 */
function checkUserdata(email, encodedPassword) {
    let searchResult = users.filter(s => s['email'] == email);

    if (searchResult.length > 0) {
        checkPasswordToUsername(searchResult, email, encodedPassword);

    } else {
        document.getElementById('invalid-data').classList.remove('d-none');
        document.getElementById('invalid-data').innerHTML = `
            Invalid username!<br>Please try again.
            `;
    }
}


/**
 * This function checks whether the entered credentials match the data in the array.
 * 
 * @param {Array} searchResult 
 * @param {string} email 
 * @param {string} encodedPassword 
 */
function checkPasswordToUsername(searchResult, email, encodedPassword) {
    let emailOfsearchResult = searchResult[0]['email'];
    let passwordOfsearchResult = searchResult[0]['password'];

    if (email == emailOfsearchResult && encodedPassword == passwordOfsearchResult) {
        saveSession(email);
        location.href = 'board.html'; //redirect to board

    } else {
        console.log(email);
        document.getElementById('invalid-data').classList.remove('d-none');
        document.getElementById('invalid-data').innerHTML = `
        Invalid login data!<br>Please try again.
        `;
    }
}


/**1
 * This function turns off the error display. 
 * 
 */
function clearAlertspan() {
    document.getElementById('invalid-data').classList.add('d-none');
}


/**
 * This function saves the current session
 * 
 * @param {string} email 
 */
function saveSession(email) {
    sessionStorage.setItem('session', window.btoa(email));
}


/**
 * This function checks if usersession is available
 * 
 */
function checkSession() {
    let session = sessionStorage.getItem('session');
    let email = users.filter(s => s['email'] == window.atob(session));
    if (session != null && email.length > 0 ){
        location.href = 'board.html'; //redirect to board
    } else {
         // user have to log in
    }
}


function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}
