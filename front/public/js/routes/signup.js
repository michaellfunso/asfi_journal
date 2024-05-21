import { ENDPOINT, getURL, parentDirectoryName } from "./constants.js";
import { SendEmail } from "./email.js";
import { DeleteCookie, GetCookie, SetCookies, hoursToKeep } from "./setCookies.js";

const userData = GetCookie("userData")

const RegistrationForm = document.getElementById("signupForm")
const RegistrationForm2 = document.getElementById("signupForm2")

const email = document.getElementById("email")
const first_name = document.getElementById("firstname")
const country = document.getElementById("country")
const state = document.getElementById("state")
const password = document.getElementById("password_confirmation")


// redirect ther user if USERDATA exists
const CurrentPage = getURL()

if(CurrentPage == "/raysonfx/user/user-data.html" || CurrentPage == "/user/user-data.html"){
    if(userData){
        console.log('USER DATA AVAILABLE')
    }else{
        window.location.href = `${parentDirectoryName}/user/register.html`
    }
}else if(CurrentPage == "/raysonfx/user/register.html" || CurrentPage == "/user/register.html"){
    if(userData){
        window.location.href = `${parentDirectoryName}/user/user-data.html`
    }else{
        console.log('USER DATA NOT AVAILABLE')
    }
}


if(RegistrationForm){
    RegistrationForm.addEventListener("submit", function(e){
        e.preventDefault()
        SubmitFirstREG()
    })


    function SubmitFirstREG(){
        const FirstRegData ={
            email: email.value,
            username: username.value,
            country: country.value,
            phonenumber: mobile.value,
            password: password.value,
        }
        InitializeSignup(FirstRegData)
    }
    
    
    
    function InitializeSignup(FirstRegData){
        SetCookies("userData", JSON.stringify(FirstRegData), hoursToKeep)
        window.location.href = `${parentDirectoryName}/user/user-data.html`
    }
}




if(RegistrationForm2){
    RegistrationForm2.addEventListener("submit", function(e){
        e.preventDefault()
        VerifySecondLevelSubmission()
    })
}

async function VerifySecondLevelSubmission(){
    if(userData){
        const exisitingUserData = JSON.parse(userData)

        const userEmail = exisitingUserData.email
 
        if(userEmail != ""){
            const user = {
                username: exisitingUserData.username,
                country: exisitingUserData.country,
                phonenumber: exisitingUserData.phonenumber,
                email: exisitingUserData.email,
                password: exisitingUserData.password,
                first_name: first_name.value,
                last_name: lastname.value,
                state:  state.value,
                address: address.value,
                city: city.value,
                zipCode: zip.value,
            }
        
            SetCookies("userData", JSON.stringify(user), hoursToKeep)
            
            const newUserData = GetCookie("userData")
    
            REGISTER(newUserData)
            
        }
    }
}



// Final function to register the user 
function REGISTER(user){
    fetch(`${ENDPOINT}/signup.php`, {
        method:"POST",
        body: user,
        headers: {
            "Content-type" : "application/JSON"
        }
    }).then(res => res.json())
    .then(data => {
        if(data.status === "success"){
            // window.location.href = "WE SENT EMAIL VERIFICATION PAGE"
            console.log(data.message)
            window.location.href = `${parentDirectoryName}/user/verify-email/`
        }else{
            alert(data.message)
            console.log(data.message)
        }
    })
}



