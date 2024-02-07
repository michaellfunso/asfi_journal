// Import Contatn Variables from the constants file 
import {EndPoint} from "./constants.js"


const RegisterForm = document.getElementById("registerForm")

RegisterForm.addEventListener("submit", function(e){
    e.preventDefault()
    const RegData = {
        username:username.value,
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value,
        accountType: accountType.value,
        password:password.value
    }

    fetch(`${EndPoint}/register.php`, {
        method: "POST",
        body: JSON.stringify(RegData),
        headers:{
            "Content-type" : "applicaiton/JSON"
        }
    }).then(res => res.json())
    .then(data =>{
        if(data.status === "success"){
            alert(data.message)
            window.location.href = "./login.html"
        }else{
        alert(data.message)
        }
    })
})