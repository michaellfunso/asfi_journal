import { EndPoint } from "./constants"
import { DeleteCookie } from "./setCookie.js"

const logout = document.getElementById("logout")

logout.addEventListener("click", function(){
    fetch(`${EndPoint}/logout.php`, {
        method:"GET"
    }).then(res =>  res.json())
    .then(data =>{
        if(data.message == "logout"){
            DeleteCookie("username_logged")
            DeleteCookie("accountType")
            DeleteCookie("email")
            DeleteCookie("firstname")
            DeleteCookie("lastname")
            DeleteCookie('profileImage')
            window.location.href = "../login.html"
        }else{
            console.log('Error While logging out')
        }
    })
})