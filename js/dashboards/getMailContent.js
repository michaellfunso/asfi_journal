// import { GetParameters, submissionsEndpoint } from "../constants.js";

import { GetParameters, submissionsEndpoint } from "../constants.js";
import { formatTimestamp } from "../formatDate.js";
import { GetCookie } from "../setCookie.js";

// import { GetCookie } from "../setCookie.js";
const user = GetCookie("user")
const contentDiv = document.getElementById('email-content');
// Get the Email Containent 
function GetEmailContent(emailID){
    fetch(`${submissionsEndpoint}/backend/editors/emailContent.php?u_id=${user}&emailId=${emailID}`,{})
    .then(res => res.json())
    .then(data =>{
        if(data.emails){
            contentDiv.innerHTML = `<div>
                <p><b>${data.emails.subject}</b></p> 
                <p>${data.emails.article_id}</p>
                <p>From: ${data.emails.sender}</p>
        
                <p>To: ${data.emails.recipient}</p>
                <p>${formatTimestamp(data.emails.date_sent)}</p>
                                  </div>`

 
         // Parse the Quill content from the JSON data]
         const quillContent = JSON.parse(data.emails.body);

         // Create a Quill instance in "read-only" mode to render the content as HTML

         function renderQuillAsHTML(divId, deltaContent) {
             // Create a Quill instance in a temporary div
             const tempDiv = document.createElement('div');
             const quill = new Quill(tempDiv, {
                 theme: 'snow',
                 modules: { toolbar: false },
                 readOnly: true,
             });

             // Set the content as Quill Delta and extract the HTML
             quill.setContents(deltaContent);

             // Get the innerHTML from the Quill editor
             const htmlContent = tempDiv.innerHTML;

             // Render the extracted HTML into the specified div
             contentDiv.innerHTML += htmlContent;
         }

         // Render the Quill content as HTML in the "content" div
         renderQuillAsHTML('content', quillContent);
        }else{
            contentDiv.innerHTML = `   <div id="email1" class="email-details">
                      <h4>Oops, Could Not Retrieve Email at this time</h4>
                      <p>Please try again...</p>
                    </div>`
        }
    })
}

export {
    GetEmailContent
}