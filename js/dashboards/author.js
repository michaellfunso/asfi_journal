import { parentDirectoryName, submissionsEndpoint, url } from "../constants.js";
import { GetCookie } from "../setCookie.js";
import { GetAccountData } from "./accountData.js";

const email = GetCookie("user");

if(email){
const userInfo = await GetAccountData(email)
const navbarContainer = document.getElementById("navbarContainer")
const homeNavbar = `<div style="display: flex;">
                    <a href="${parentDirectoryName}/dashboard" class="nav-active"><span class=" fw-bold" style="margin-left: 20px; margin-right: 20px;"> <i class='las la-home text--danger'></i>Home </span></a>
                    <a href="./manuscripts" ><span class=" fw-bold" style="margin-left: 20px; margin-right: 20px;"> <i class='las la-pen text--danger'></i> Author </span></a>
                </div>
            </div>`
const authorNavbar = `<div style="display: flex;">
                    <a href="${parentDirectoryName}/dashboard" ><span class=" fw-bold" style="margin-left: 20px; margin-right: 20px;"> <i class='las la-home text--danger'></i>Home </span></a>
                    <a href="./manuscripts" class="nav-active"><span class=" fw-bold" style="margin-left: 20px; margin-right: 20px;"> <i class='las la-pen text--danger'></i> Author </span></a>
                </div>
            </div>`
const reviewerNavbar = `   <div style="display: flex;">
                    <a href="" class="nav-active"><span class=" fw-bold" style="margin-left: 20px; margin-right: 20px;"> <i class='las la-home text--danger'></i>Home </span></a>
                    <a href="./manuscripts" style="color: whitesmoke;"><span class=" fw-bold" style="margin-left: 20px; margin-right: 20px;"> <i class='las la-pen text--danger'></i> Author </span></a>
                    <a href="../reviewerdash" style="color: whitesmoke;"><span class=" fw-bold" style="margin-left: 20px; margin-right: 20px;"> <i class='las la-bell text--danger'></i> Review </span></a>
                    <a href="" style="color: whitesmoke;"><span class=" fw-bold" style="margin-left: 20px; margin-right: 20px;"> <i class='las la-edit text--danger'></i> Editorial Assignments </span></a>
                </div>
            </div>`
const editorNavbar = `   <div style="display: flex;">
                    <a href="" class="nav-active"><span class=" fw-bold" style="margin-left: 20px; margin-right: 20px;"> <i class='las la-home text--danger'></i>Home </span></a>
                    <a href="./manuscripts.html" style="color: whitesmoke;"><span class=" fw-bold" style="margin-left: 20px; margin-right: 20px;"> <i class='las la-pen text--danger'></i> Author </span></a>
                    <a href="../reviewerdash" style="color: whitesmoke;"><span class=" fw-bold" style="margin-left: 20px; margin-right: 20px;"> <i class='las la-bell text--danger'></i> Review </span></a>
                    <a href="" style="color: whitesmoke;"><span class=" fw-bold" style="margin-left: 20px; margin-right: 20px;"> <i class='las la-edit text--danger'></i> Editorial Assignments </span></a>
                </div>
            </div>`

const isAuthor = userInfo.account_status 
const is_reviewer = userInfo.is_reviewer 
const is_editor = userInfo.is_editor
const userfullname = `${userInfo.prefix} ${userInfo.firstname} ${userInfo.lastname} ${userInfo.othername}`

const userfullname_container = document.querySelectorAll(".user_fullnameContainer")
userfullname_container.forEach(container =>{
    container.innerText = userfullname
})
if(url.pathname === parentDirectoryName+'/dashboard/authordash'){
navbarContainer.innerHTML = homeNavbar
}
if(isAuthor === "verified" && is_reviewer != "yes" && is_editor != "yes"){
    navbarContainer.innerHTML = authorNavbar
}else if(isAuthor === "verified" && is_reviewer === "yes" && is_editor != "yes"){
    navbarContainer.innerHTML = reviewerNavbar
}else if(isAuthor === "verified" && is_editor === "yes"){
navbarContainer.innerHTML = editorNavbar
}else{
    console.log(isAuthor)
}
}else{
    window.location.href = parentDirectoryName+'/dashboard'
}