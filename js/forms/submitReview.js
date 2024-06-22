import { submissionsEndpoint } from "../constants.js";


const uploadForm = document.getElementById("reviewForm");
const body = document.querySelector("body")

body.setAttribute("id", "formNotSubmitted")
const message_container = document.getElementById("message_container")


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

