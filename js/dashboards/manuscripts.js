import { submissionsEndpoint } from "../constants.js";
import { formatTimestamp } from "../formatDate.js";
import { GetCookie } from "../setCookie.js";

const user = GetCookie("user")
const ArticlesContainer = document.getElementById("manuscriptsContainer")

if(user){
    fetch(`${submissionsEndpoint}/backend/accounts/manuscripts.php`, {
        method:"POST",
        body:JSON.stringify({user:user}),
        headers:{
            "Content-type" : "application/JSON"
        }
    }).then(res => res.json())
    .then(data=>{
        if(data.error){
            console.log(data.error)
        }else{
            const articlesList = data.articles
            


            if(articlesList.length > 0){
                for(let i=0; i<articlesList.length; i++){
                // articlesList.forEach(article => {
                    // fetch(`${submissionsEndpoint}/backend/accounts/getArticleInfo.php`, {
                    //     method:"POST",
                    //     body:JSON.stringify({id:articlesList[i].revision_id}),
                    //     headers:{
                    //         "Content-type" : "application/JSON"
                    //     }
                    // }).then(res => res.json())
                    // .then(data =>{
                    //     if(data){
                            const ArticlesInfo = articlesList[i]
                            let RevisionAction = ""
                            let StatusMain = ""
                            let viewSubmission = ""
                            if(ArticlesInfo.status === "returned_for_revision"){
                                viewSubmission = `  `
                                RevisionAction = ` <br>
                                          <a role="link" tabindex="0" href="../revise?a=${ArticlesInfo.revision_id}" hidefocus="true" style="outline: none;">  
                                              Submit Revision
                                          </a> `
                                StatusMain = "Returned For Revision"

                            }else if(ArticlesInfo.status === "returned_for_correction"){
                                viewSubmission = `  `
                                RevisionAction = ` <br>
                                <a role="link" tabindex="0" href="../correct?a=${ArticlesInfo.revision_id}" hidefocus="true" style="outline: none;">  
                                    Submit Correction
                                </a> `
                                StatusMain = "Returned For Correction"
                            }else if(ArticlesInfo.status === "submitted_for_review" || ArticlesInfo.status === "review_submitted" || ArticlesInfo.status === "revision_submitted"){
                                RevisionAction = ``
                                StatusMain = "Under Review"
                                viewSubmission = ` <a role="link" tabindex="0" href="../content?a=${ArticlesInfo.revision_id}" hidefocus="true" style="outline: none;">  
                                              View submission
                                          </a> `
                            }else if(ArticlesInfo.status === "saved_for_later" || ArticlesInfo.status === "revision_saved"){
                                RevisionAction = ` <br>
                                <a role="link" tabindex="0" href="../edit?a=${ArticlesInfo.revision_id}" hidefocus="true" style="outline: none;">  
                                    Continue Submission
                                </a> `
                                viewSubmission = ``
                                StatusMain = "Manuscript Saved as Draft"
                            }else if(ArticlesInfo.status === "submitted" ){
                                RevisionAction = ``
                                viewSubmission = ` <a role="link" tabindex="0" href="../content?a=${ArticlesInfo.revision_id}" hidefocus="true" style="outline: none;">  
                                              View submission
                                          </a> `
                                StatusMain = "Submitted"
                            }else if(ArticlesInfo.status === "correction_saved"){
                                RevisionAction = ` <br>
                                <a role="link" tabindex="0" href="../edit?a=${ArticlesInfo.revision_id}" hidefocus="true" style="outline: none;">  
                                    Continue Submission
                                </a> `
                                viewSubmission = ``
                                StatusMain = "Manuscript Saved as Draft"
                            }else if(ArticlesInfo.status === "accepted"){
                                RevisionAction = `  `
                                viewSubmission = ` <a role="link" tabindex="0" href="../content?a=${ArticlesInfo.revision_id}" hidefocus="true" style="outline: none;">  
                                View submission
                            </a> `
                                StatusMain = "Accepted By Editor"
                            }else{
                                RevisionAction = ``
                                viewSubmission = ` <a role="link" tabindex="0" href="../content?a=${ArticlesInfo.revision_id}" hidefocus="true" style="outline: none;">  
                                View submission
                            </a>`
                                StatusMain = `${ArticlesInfo.status}`
                            }
                                ArticlesContainer.innerHTML += `
                                <tr id="queue_0" name="queue_0" role="row" class="odd">
                         
                                <td data-label="status">              
                                         <div>
                                             <p>
                                                 <a role="link" tabindex="0" data-title="test" id="contactJournalLnk" data-abstract="test" data-id="xik_HqzhLis2ey4NyZxowgCdfEwB7DoB64Umc9Bp7CgUjXzc" data-documentno="thoraxjnl-2020-215540.R2" data-toggle="modal" href="mailto:submissions@asfirj.org" onclick="" data-inviteemail="0" hidefocus="true" style="outline: none;"><i class="fa fa-envelope-o"></i> Contact Journal</a>
                                             </p>
                                         </div>
                                         <ul>
                                             <li>${StatusMain}</li>
                                         </ul>
                               
                                       <br>
                                         ${viewSubmission}   
                                         ${RevisionAction}
                                     </td>
                         
                                     <td data-label="ID">${ArticlesInfo.revision_id}
                                     
                                     </td>
                                                           
                                     <td data-label="title" style="white-space:pre-wrap">${ArticlesInfo.title}<br>
                                    
                              </td>

                                     <td class="whitespace-nowrap" data-label="submitted">${formatTimestamp(ArticlesInfo.date_submitted)}
                                     </td>

                                       <td class="whitespace-nowrap" data-label="submitted">${formatTimestamp(ArticlesInfo.process_start_date)}
                                     </td>
                                </tr>`
                    //     }
                    // })
           
                // });
            }
            }else{
                ArticlesContainer.innerHTML = `<tr>
               
                No Manuscripts Available yet
              
                </tr>`
            }
          
        }
    })
}else{
    console.log("Not Logged In")
}

{/* <em>Files Archived</em> <i class="fa fa-question-circle" data-content="The Journal has elected to delete the files associated with the draft revision/resubmission of this manuscript. In order to continue, you must click the &quot;create revision/resubmission&quot;" data-original-title="Files Archived" data-toggle="popover" style="font-size:small; vertical-align:middle;"></i> */}