import { EndPoint } from "../constants.js";
import { GetCookie } from "../setCookie.js";


const AccountType = GetCookie("accountType")

// Redirect the users to specific dashboards by their account type 
if(AccountType == "user_account"){
    window.location.href = "../dashboard/userDashboard.html"
}
else if(AccountType == "author_account"){
    window.location.href = "../dashboard/authorDashboard.html"
}
else if(AccountType == "reviewer_account"){
    window.location.href = "../dashboard/reviewerDashboard.html"    
}else if(AccountType == "editor_account"){
    window.location.href = "../dashboard/editorDashboard.html"
}else{
    alert("Pleas Login")
    window.location.href = "login.html"
}
