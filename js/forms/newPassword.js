import { EndPoint } from "../constants.js";

// Get the URL string
const urlString = window.location.href;

// Create a URL object
const url = new URL(urlString);

// Get the search parameters from the URL
const searchParams = new URLSearchParams(url.search);

// Get the value of the "man" parameter
const searchParameter = searchParams.get("0auth");
const returnUrl = searchParams.get("returnURL")
const RESET_STATUS_AUTH = searchParams.get("auth")
const password1 = document.getElementById("password1")
const password2 = document.getElementById("password2")
const newpasswordForm = document.getElementById("newPasswordForm")


if(RESET_STATUS_AUTH != 200){
    alert("Access Denied")
    window.location.href = "../../forms/passwwordResetForm.html"
}else{
    fetch(`${EndPoint}/newPassword.php?encEmail=${searchParameter}`, {
        method:"GET",
    }).then(res => res.json())
    .then(data =>{
        if(data.status === "userFound"){
            newpasswordForm.addEventListener("submit", function(e) {
                e.preventDefault()
                if(!password1.value || !password2.value){
                    alert("Passwords Cannot be empty")
                }
                if(password1.value != password2.value){
                    alert("Passwords do not match")
                }
                if(password1.value && password2.value && password1 != ""){
                    const passwords = {
                        pass: password1.value,
                        validator: searchParameter,
                    }
                    fetch(`${EndPoint}/newPassword.php`, {
                        method:"POST",
                        body: JSON.stringify(passwords),
                        headers:{
                            'Content-type' : 'application/JSON'
                        }
                    }).then(res => res.json())
                    .then(data =>{
                        if(data.status === "passwordResetSuccessful"){
                            alert(data.message)
                            window.location.href = `${returnUrl}.html`
                        }else{
                            alert(data.message)
                        }
                    })
                }
            })
        }else{
            alert("Unathorized Access")
            window.location.href = "./../forms/login.html"
        }
    })
}

