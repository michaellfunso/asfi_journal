import { EndPoint } from "../constants.js"

const email = document.getElementById("resetEmail")
const resetPass = document.getElementById("resetPass")




resetPass.addEventListener("submit", function(e){
    e.preventDefault()
    if(email != ""){
    const FormDataInput = {
        receiverEmail: email.value,
        subject: "Password Reset Request",
        message: "Your Password Reset Token is:"
    }

fetch(`${EndPoint}/sendMail.php`, {
    method : "POST",
    body: JSON.stringify(FormDataInput),
    headers:{
        'Content-tyoe' : 'application/JSON'
    } 
}).then(res => res.json())
.then(data =>{
    if(data){
        if(data.status === "error"){
            alert(data.message)
        }else if(data.status == "InternalError"){
            console.log(data.message)
        }else{
            alert(data.message)
            const RESET_STATUS = 200
            window.location.href = `./../forms/newPassword.html?returnURL=./login&0auth=${data.email}&auth=${RESET_STATUS}`
        }
    }else{
        alert("An Error Occurred")
    }
})

}else[
    alert("Email Cannot Be Empty")
]
})