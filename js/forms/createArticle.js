import { EndPoint } from "../constants.js";

const uploadForm = document.getElementById("uploadArticle");
const inputFields = document.querySelectorAll("input")
const submitButton = document.getElementById("submitButton")
const body = document.querySelector("body")


uploadForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(uploadForm);
    body.removeAttribute("id")
    fetch(`${EndPoint}/temporaryManuscriptUpload.php`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log server response
        if(data.status === "success"){
            alert("Upload Successful")
            window.location.href = "../issues.html"
        }else if(data.status === "error"){
            alert(data.message)
            body.setAttribute("id", "formNotSubmitted")
        }else{
            alert("Internal Server Error")
            body.setAttribute("id", "formNotSubmitted")
        }

    })
    .catch(error => {
        console.error('Error:', error);
    });
});

