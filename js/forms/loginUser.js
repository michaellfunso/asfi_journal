import { parentDirectoryName, submissionsEndpoint } from "../constants.js";
import { SetCookies, daysToKeep, hoursToKeep } from "../setCookie.js";
const loginForm = document.getElementById("loginForm")
const preloader = document.querySelector(".preloader");
loginForm.addEventListener("submit", function(e) {
    e.preventDefault()

    // Show preloader when submission starts
    preloader.style.display = "block";

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
            preloader.style.display = "none";
            alert(data.message)
            console.log(data.message)
        }
    })
    .catch(error => {
        // Hide preloader on fetch error
        preloader.style.display = "none";
        console.error('Error:', error);
    });
}) 