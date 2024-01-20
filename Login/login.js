const loginUsername = document.getElementById("username");
const loginPassword = document.getElementById("password");
const submit = document.getElementById("submit");


submit.addEventListener("click", (e) => {
    getFormValue();
});

loginPassword.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || (username === "rajnigam" && password === "Udit@123")) {
        getFormValue();
    };
});

function getFormValue() {
    let username = loginUsername.value;
    let password = loginPassword.value;
    if (username === "rajnigam" && password === "Udit@123") {
        localStorage.setItem("loginStatus", "Logged In")
        console.log("loginUsername :", username);
        console.log("loginPassword :", password);
        window.location.href = "/Main/index.html";
    } else {
        alert("INVALID: Username Or Password");
    }
    loginUsername.value = "";
    loginPassword.value = "";
};


// if (localStorage.loginStatus === "Logged In") {
//     console.log("logged in:");
//     window.location.href = "/Main/index.html";
// } else if(localStorage.loginStatus === "Logged Out"){
//     console.log("logged out");
//     window.location.href = "/login.html";
// }