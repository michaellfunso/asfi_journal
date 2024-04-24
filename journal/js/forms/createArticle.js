import { EndPoint } from "../constants.js";

const uploadForm = document.getElementById("uploadArticle");
const inputFields = document.querySelectorAll("input")
const submitButton = document.getElementById("submitButton")

uploadForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(uploadForm);
    // inputFields.forEach(inputField => {
    //     if(inputField.value && inputField.value !== "" && inputField.vallue !== " "){
    //         inputField.setAttribute("readonly", "true")
    //     }
    // });
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
        }else{
            alert("Internal Server Error")
        }
        submitButton.removeAttribute("disabled")
        inputFields.forEach(field =>{
            field.removeAttribute("readonly")
        })

    })
    .catch(error => {
        console.error('Error:', error);
    });
});

