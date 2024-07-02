import { GetParameters, parentDirectoryName, submissionsEndpoint } from "../constants.js";
import { GetAccountData } from "../dashboards/accountData.js";
import { GetCookie } from "../setCookie.js";


const uploadForm = document.getElementById("reviewForm");
const body = document.querySelector("body")

body.setAttribute("id", "formNotSubmitted")

const message_container = document.getElementById("message_container")
const id_container = document.getElementById("article_id")
const reviewebyContaier = document.getElementById("reviewed_by")

const articleId = GetParameters(window.location.href).get("a")
const user = GetCookie("user")

if(user && articleId){
   const userData = await GetAccountData(user)
   const email = userData.email

   id_container.value = articleId
   reviewebyContaier.value = email


uploadForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(uploadForm);

    body.removeAttribute("id")
    // formData.append('article_content', JSON.stringify(quill.getContents().ops));
    // console.log(JSON.stringify(quill.getContents().ops))

    fetch(`${submissionsEndpoint}/review/`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log server response
        if(data.status === "success"){
        message_container.innerHTML =`<div class="alert-success">${data.message}</div>`

            alert("Upload Successful")
            // window.location.href = "../supplements.html#supplements"
        }else if(data.status === "error"){
        message_container.innerHTML =`<div class="alert-danger">${data.message}</div>`

            body.setAttribute("id", "formNotSubmitted")
        }else{
        message_container.innerHTML =`<div class="alert-danger">Internal Server Error</div>`

            body.setAttribute("id", "formNotSubmitted")
        }

    })
    .catch(error => {
        console.error('Error:', error);
    });
});

}else{
    window.location.href = `${parentDirectoryName}/dashboard/reviewerdash`
}