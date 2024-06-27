import { EndPoint, parentDirectoryName } from "../constants.js";
import { GetAccountData } from "../dashboards/accountData.js";
import { GetCookie } from "../setCookie.js";


const Account = GetCookie("user")

if(Account){
    const accountData = await GetAccountData(Account)
    if(accountData.account_status === "verified"){
        window.location.href = parentDirectoryName+"/dashboard/authordash"
    }else{
        alert("Account Not Verified")
    }
}else{
    window.location.href = parentDirectoryName+"/portal/login"
}

