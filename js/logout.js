import { EndPoint } from "./constants.js"
import { DeleteCookie } from "./setCookie.js"

// const logout = document.getElementById("logout")

// logout.addEventListener("click", function(){
    fetch(`${EndPoint}/logout.php`, {
        method:"GET"
    }).then(res =>  res.json())
    .then(data =>{
        console.log(data)
        if(data.message === "logout"){
            DeleteCookie("username_logged")
            DeleteCookie("accountType")
            DeleteCookie("email")
            DeleteCookie("firstname")
            DeleteCookie("lastname")
            DeleteCookie('profileImage')
            DeleteCookie("PHPSESSID")
            window.location.href = "../login.html"
        }else{
            console.log('Error While logging out')
        }
    })
// })

