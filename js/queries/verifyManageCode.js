import { EndPoint } from "../constants.js";
import { SetCookies, hoursToKeep } from "../setCookie.js";


const verifyCode = document.getElementById("verifyCode")

verifyCode.addEventListener("submit", function(e){
    e.preventDefault()
    const Form = {
        code:code.value
    }
    fetch(`${EndPoint}/verify.php`, {
        method:"POST",
        body:JSON.stringify(Form)
    }).then(res => res.json())
    .then(data=>{
        if(data.status === "success"){
            alert(data.message)
            SetCookies("manageData", verifyCode+new Date(), hoursToKeep)
            window.location.href = "../../manuscriptPortal/manage/"
        }else{
            alert(data.message)
        }
    })
})