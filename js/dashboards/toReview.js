import { parentDirectoryName, submissionsEndpoint } from "../constants.js";
import { GetCookie } from "../setCookie.js";
import { GetAccountData } from "./accountData.js";

const user = GetCookie("user")

const accouuntType = await GetAccountData(user)
const isReviewer = accouuntType.is_reviewer
const submissionsContainer = document.getElementById("submissionsContainer")
if(user && isReviewer === "yes"){
    fetch(`${submissionsEndpoint}/backend/reviewers/toReview.php`, {
        method: "POST",
        body: JSON.stringify({encrypted:user}),
        headers:{
            "Content-type" : "application/JSON"
        }
    }).then(res => res.json())
    .then(data=>{
        if(data.status === "success"){
            const submissionsToReview = data.submissionsToReview
            if(submissionsToReview.length > 0){
                submissionsToReview.forEach(submission => {
                    const articleType = submission.article_type 
                    const Title = submission.title 
                    const Status = submission.status
                    const ArticleId = submission.article_id
                    submissionsContainer.innerHTML += `<tr id="queue_0" name="queue_0" role="row" class="odd">         
                <td data-label="status">              
                         
                         <form action="" onsubmit="return false" class="actionForm">
                             <select name="do" id="" class="form-control reviewAction">
                                 <option value="review">View</option>
                                 <option value="score">Review & Score</option>
                             </select>
                         </form>  
                         
                     </td>
         
                     <td data-label="ID">
                         29-May-2024
                     
                     </td>
                                           
                     <td data-label="title" style="white-space:pre-wrap">${articleType}
              </td>
                     <td class="whitespace-nowrap" data-label="submitted">
                         <span>${ArticleId}</span><br><br>
                         ${Title}
                     </td>
                     <td data-label="decisioned" class="whitespace-nowrap">${Status}</td>
                </tr>`
                });
            }else{
                submissionsContainer.innerHTML = "<tr><td>No submissions to review</td></tr>"
            }
        }else{
            console.error("Internal Server Error")
        }
    })
}else{
    window.location.href = parentDirectoryName+"/portal/login"
}