import { ENDPOINT, GetParameters, parentDirectoryName } from "./constants.js";

const currentLocationURL = window.location.href

const email = GetParameters(currentLocationURL).get("email")
const verificationToken = GetParameters(currentLocationURL).get("verify")


const Data = {
    email: email,
    verification: verificationToken
}
fetch(`${ENDPOINT}/verifyEmail.php`, {
    method: "POST",
    body: JSON.stringify(Data),
    headers: {
        "Content-type" : "applcation/JSON"
    }
}).then(res => res.json())
.then(data => {
    if(data.status === "success"){
        console.log(data.message)
        window.location.href = `${parentDirectoryName}/user/authorization.html`
    }else{
        console.log(data.message)
    }
})