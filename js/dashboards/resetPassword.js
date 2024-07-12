import { parentDirectoryName, submissionsEndpoint } from "../constants.js";
import { hoursToKeep, SetCookies } from "../setCookie.js";

const resetEmail = document.getElementById("resetEmail")
const resetPassForm = document.getElementById("resetPassForm")
    resetPassForm.addEventListener("submit", function(e){
        e.preventDefault();
        const formData = {
            email: resetEmail.value
        }
        fetch(`${submissionsEndpoint}/backend/accounts/forgotPassword.php`,{
            method:"POST",
            body:JSON.stringify(formData),
            headers:{
                "Content-type": "application/JSON"
            }
        }).then(res=>res.json())
        .then(data=>{
            if(data.success){
                alert("An Email has been sent to your email address with the Reset Token")
                SetCookies("resetEmailSent",data.userEmail, hoursToKeep)
                window.location.href = `${parentDirectoryName}/portal/resetCode`
            }else{
                alert(data.error)
            }
        })
    })