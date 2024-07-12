import { parentDirectoryName, submissionsEndpoint } from "../constants.js";
import { GetCookie, SetCookies } from "../setCookie.js";

const resetPassCode = document.getElementById("resetPassCode")
const resetCode = document.getElementById("resetCode")

const StoredResetEmail = GetCookie("resetEmailSent")

if(!StoredResetEmail){
    window.location.href = `${parentDirectoryName}/portal/resetPassword`
}else{

    resetPassCode.addEventListener("submit", function(e){
        e.preventDefault();
        
        const formData = {
            email:StoredResetEmail,
            token:resetCode.value
        }
        fetch(`${submissionsEndpoint}/backend/accounts/verifyResetToken.php`, {
            method:"POST",
            body:JSON.stringify(formData),
            headers:{
                "Content-type" : "application/JSON"
            }
        }).then(res=>res.json())
        .then(data=>{
            if(data.success){
                alert(data.success)
                SetCookies("token", data.resetTokenVerify)
                window.location.href = `${parentDirectoryName}/portal/resetNewPassword/`
            }else{
                alert(data.error)
            }
        })
    })

}