import { parentDirectoryName, submissionsEndpoint } from "../constants.js";
import { SetCookies, daysToKeep, hoursToKeep } from "../setCookie.js";
const loginForm = document.getElementById("loginForm")
loginForm.addEventListener("submit", function(e) {
    e.preventDefault()

    const formdata = {
        email:email.value,
        pass:pass.value
    }

    fetch(`${submissionsEndpoint}/backend/accounts/login.php`, {
        method:"POST",
        body:JSON.stringify(formdata),
        headers:{
            "Content-type" : "application/JSON"
        }
    }).then(res => res.json())
    .then(data =>{
        if(data.status === "success"){
            SetCookies("user", data.userEmail, daysToKeep)
            window.location.href = parentDirectoryName+"/dashboard"
        }else{
            alert(data.message)
            console.log(data.message)
        }
    })
}) 