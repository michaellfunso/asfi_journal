import { parentDirectoryName, submissionsEndpoint } from "../constants.js"
import { DeleteCookie, GetCookie } from "../setCookie.js"

const resetNewPass = document.getElementById("resetNewPass")
const resetNewPassword1 = document.getElementById("resetNewPassword1")
const resetNewPassword2 = document.getElementById("resetNewPassword2")


const resetToken =  GetCookie("token")
const emailToken = GetCookie("resetEmailSent")

if(resetToken && emailToken){
    resetNewPass.addEventListener("submit", function(e){
        e.preventDefault()
        if(resetNewPassword1.value != resetNewPassword2.value){
            alert("Passwords Do Not Match")
        }else{
            const formData = {
                email: emailToken,
                resetToken: resetToken,
                password: resetNewPassword1.value
            }
            fetch(`${submissionsEndpoint}/backend/accounts/newPassword.php`, {
                method:"POST",
                body:JSON.stringify(formData)
            }).then(res=>res.json())
            .then(data=>{
                if(data.success){
                alert(data.success)
                window.location.href = `${parentDirectoryName}/portal/login`
                DeleteCookie("resetEmailSent")
                DeleteCookie("token")

                }else{
                    alert(data.error)
                }
            })
        }
        
    })
}else{
 window.location.href = `${parentDirectoryName}/portal/login`
}
