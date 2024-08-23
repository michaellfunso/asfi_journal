import { submissionsEndpoint } from "../constants.js";
import { formatTimestamp } from "../formatDate.js";
import { GetCookie } from "../setCookie.js";

const user = GetCookie("user")
const ArticlesContainer = document.getElementById("manuscriptsContainer")

if(user){
    fetch(`${submissionsEndpoint}/backend/accounts/manuscriptsCoAuthored.php`, {
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
                articlesList.forEach(article => {
                    // fetch(`${submissionsEndpoint}/backend/accounts/getArticleInfo.php`, {
                    //     method:"POST",
                    //     body:JSON.stringify({id:article.article_id}),
                    //     headers:{
                    //         "Content-type" : "application/JSON"
                    //     }
                    // }).then(res => res.json())
                    // .then(data =>{
                    //     if(data){
                            const ArticlesInfo =article
                            let StatusMain = ""
                            if(ArticlesInfo.status === "returned_for_revision"){
                          
                                          StatusMain = "Returned For Revision"
                            }else if(ArticlesInfo.status === "submitted_for_review" || ArticlesInfo.status === "review_submitted" || ArticlesInfo.status === "revision_submitted"){
                             
                                StatusMain = "Under Review"
                             
                            }else if(ArticlesInfo.status === "submitted" ){
                       
                                StatusMain = "Submitted"
                            }
                            
                                ArticlesContainer.innerHTML += `         <tr id="queue_0" name="queue_0" role="row" class="odd">
                         
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
                                          <a role="link" tabindex="0" href="../content?a=${ArticlesInfo.revision_id}" hidefocus="true" style="outline: none;">  
                                              View submission
                                          </a>    
                                         
                                     </td>
                         
                                     <td data-label="ID">${ArticlesInfo.revision_id}
                                     
                                     </td>
                                                           
                                     <td data-label="title" style="white-space:pre-wrap">${ArticlesInfo.title}<br>
                                    
                              </td>
                                     <td>${ArticlesInfo.corresponding_authors_email}</td>
                 
                                     <td class="whitespace-nowrap" data-label="submitted">${formatTimestamp(ArticlesInfo.date_submitted)}
                                     </td>
                                </tr>`
                    //     }
                    // })
           
                });
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