import { submissionsEndpoint } from "../constants.js";
import { formatTimestamp } from "../formatDate.js";
import { GetCookie } from "../setCookie.js";
const userId = GetCookie("user")
const ArticlesContainer = document.getElementById("manuscriptsContainer")


if(userId){
fetch(`${submissionsEndpoint}/backend/accounts/inReview.php`, {
    method:"POST",
    body:JSON.stringify({user:userId}),
    headers:{
        "Content-type" : "application/JSON"
    }
}).then(res => res.json())
.then(data=>{
    if(data.success){
        const articlesList = data.articles


        if(articlesList.length > 0){
            articlesList.forEach(article => {
                fetch(`${submissionsEndpoint}/backend/accounts/getArticleInfo.php`, {
                    method:"POST",
                    body:JSON.stringify({id:article.article_id}),
                    headers:{
                        "Content-type" : "application/JSON"
                    }
                }).then(res => res.json())
                .then(data =>{
                    if(data){
                        const ArticlesInfo = data.articles
                    
                            ArticlesContainer.innerHTML += `         <tr id="queue_0" name="queue_0" role="row" class="odd">
                     
                            <td data-label="status">              
                                     <div>
                                         <p>
                                             <a role="link" tabindex="0" data-title="test" id="contactJournalLnk" data-abstract="test" data-id="xik_HqzhLis2ey4NyZxowgCdfEwB7DoB64Umc9Bp7CgUjXzc" data-documentno="thoraxjnl-2020-215540.R2" data-toggle="modal" href="mailto:submissions@asfirj.org" onclick="" data-inviteemail="0" hidefocus="true" style="outline: none;"><i class="fa fa-envelope-o"></i> Contact Journal</a>
                                         </p>
                                     </div>
                                     <ul>
                                         <li>${ArticlesInfo.status}</li>
                                     </ul>
                           
                                   <br>
                                      <a role="link" tabindex="0" href="../content?a=${ArticlesInfo.article_id}" hidefocus="true" style="outline: none;">  
                                          view submission
                                      </a>    
                                     
                                 </td>
                     
                                 <td data-label="ID">${ArticlesInfo.article_id}
                                 
                                 </td>
                                                       
                                 <td data-label="title" style="white-space:pre-wrap">${ArticlesInfo.title}<br><em>Files Archived</em> <i class="fa fa-question-circle" data-content="The Journal has elected to delete the files associated with the draft revision/resubmission of this manuscript. In order to continue, you must click the &quot;create revision/resubmission&quot;" data-original-title="Files Archived" data-toggle="popover" style="font-size:small; vertical-align:middle;"></i>
                                
                          </td>

                                 <td class="whitespace-nowrap" data-label="submitted">${formatTimestamp(ArticlesInfo.date_submitted)}
                                 </td>
                            </tr>`
                    }
                })
       
            });
        }else{
            ArticlesContainer.innerHTML = `<tr>
           
            No Manuscripts In Review Yet
          
            </tr>`
        }
      
    }else{
        alert(data.error)
    }
})
}else{
    console.log("Not Logged in")
}