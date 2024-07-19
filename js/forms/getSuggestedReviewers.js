import { submissionsEndpoint } from "../constants.js";

async function GetSuggestedReviewers(articleId){
    return fetch(`${submissionsEndpoint}/backend/accounts/getSuggestedReviewers.php`, {
        method:"POST",
        body:JSON.stringify({article_id:articleId})
    }).then(res=>res.json())
    .then(data=>{
        if(data){
            if(data.success){
                return data.suggestedReviewers
            }else{
                return []
            }
        }else{
            return []
        }
    })
}


export {
    GetSuggestedReviewers
}