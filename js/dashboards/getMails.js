// import { GetParameters, parentDirectoryName, submissionsEndpoint } from "../constants.js"
// import { formatTimestamp } from "../formatDate.js"
// import { GetCookie } from "../setCookie.js"

import { GetParameters, parentDirectoryName, submissionsEndpoint } from "../constants.js"
import { GetCookie } from "../setCookie.js"
import { GetEmailContent } from "./getMailContent.js"

// import { GetEmailContent } from "./getEmails.js"
const emailListContainer = document.getElementById("emailListContainer")
const user = GetCookie("user")
if(user){

function showEmailContent(emailId) {
   
    const emailContentContainer = document.getElementById("email-content");
    emailContentContainer.innerHTML = ``
    GetEmailContent(emailId)

}
// Get Emails Related to the user 
fetch(`${submissionsEndpoint}/backend/accounts/emailList.php?u_id=${user}`, {

}).then(res=>res.json())
.then(data=>{
    if(data){
        if(data.emails){
            const EmailList = data.emails 
            EmailList.forEach(email =>{
                emailListContainer.innerHTML += `
                <div class="email-item" data-id=${email.id} >
                      <div class="email-subject">${email.subject}</div>
                      <div class="email-recipient">${email.recipient}</div>
                    </div>`
            })
        }else{
            emailListContainer.innerHTML = `<b>No Email Has been sent to you yet</b>`
        }
    }

    // Initial content display (optional)
      const Emailitems = document.querySelectorAll(".email-item")
    Emailitems.forEach(item=>{
        item.addEventListener("click", function(){
            showEmailContent(item.getAttribute("data-id"))
        })
    })
 
})


}else{
    window.location.href = `${parentDirectoryName}/Dashboard`
}
