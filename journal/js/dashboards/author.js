import { EndPoint } from "../constants.js";
import { GetCookie } from "../setCookie.js";
import { GetUserInfo } from "../queries/getUserInfo.js";

const username = GetCookie("username_logged")
const profilePicture = GetCookie("profileImage")
const email = GetCookie("email")
const fullname = `${GetCookie("firstname")} ${GetCookie("lastname")}`
const AcctCookie = GetCookie("accountType")
const nameContainer = document.getElementById("nameContainer")

async function userFunction(){
const userData = JSON.parse(await GetUserInfo(username))

const AccountType = userData.accountType
console.log("Author")

if(AccountType != "author_account" || !AccountType){
    alert("Access Denied")
     window.location.href = `./../login.html`
}else{
    console.log("Author Login")
}
}

if(username && email){
    userFunction()
    nameContainer.innerHTML += `<span>${fullname}</span>`;
}else{
    window.location.href = `./../login.html`
}

