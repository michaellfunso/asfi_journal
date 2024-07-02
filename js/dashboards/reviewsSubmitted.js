import { parentDirectoryName, submissionsEndpoint } from "../constants.js";
import { GetCookie } from "../setCookie.js";
import { GetAccountData } from "./accountData.js";

const user = GetCookie("user")

const accouuntType = await GetAccountData(user)
const isReviewer = accouuntType.is_reviewer
const reviewActions = document.querySelectorAll(".reviewAction")
const ReviewForms = document.querySelectorAll(".actionForm")
const ArticleId = document.querySelectorAll('input[name="a/"]')

for(let i=0; i<reviewActions.length; i++){
    const currentForm = ReviewForms[i]
    const currentAction = reviewActions[i]
    const currentId = ArticleId[i]
    
    currentAction.addEventListener("change", function(){
        if(currentAction.value === "view_review"){
        window.location.href = `${parentDirectoryName}/dashboard/reviewerdash/viewReview?s=${currentId.value}`
        }
        if(currentAction.value === "contact_journal"){
        window.location.href = "mailto:submissions@asfirj.org"
        }
    })
}
// reviewActions.forEach(action =>{


// })
