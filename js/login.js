const loginForm = document.getElementById("loginForm")
const email = document.getElementById("email")
const pass = document.getElementById("pass")

import {EndPoint} from "./constants.js"
import { hoursToKeep, SetCookies } from "./setCookie.js"

// SetCookies Format  = SetCookies(name, value, hoursToKeep) 


loginForm.addEventListener("submit", function(e){
    e.preventDefault();
    const Form = {
        email: email.value,
        pass: pass.value
    }
    fetch(`${EndPoint}/login.php`, {
        method: "POST",
        body: JSON.stringify(Form),
        headers:{
            "Content-type" : "application/JSON"
        }
    }).then(res => res.json())
    .then(data => {
        if(data.status === "success"){
            const user_data = data.user_data
            const username = user_data.username
            const email = user_data.email
            const first_name = user_data.first_name
            const last_name = user_data.last_name
            const profilePicture = user_data.profile_picture
            const account_type = user_data.acct_type

            SetCookies("username_logged", username, 1)
            SetCookies("firstname", first_name, 1)
            SetCookies("accountType", account_type, 1)
            SetCookies("lastname", last_name, 1)
            SetCookies("email", email, 1)
            SetCookies("profileImage", profilePicture, 1)

            window.location.href = './dashboard'

        }else if(data.status === "error"){
            alert(data.message)
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
})
