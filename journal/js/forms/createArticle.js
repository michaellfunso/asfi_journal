import { EndPoint } from "../constants.js";

const uploadForm = document.getElementById("uploadArticle");

uploadForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(uploadForm);

    fetch(`${EndPoint}/temporaryManuscriptUpload.php`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log server response
        if(data.status === "success"){
            alert("Upload Successful")
            window.location.href = "./issues.html"
        }else if(data.status === "error"){
            alert(data.message)
        }else{
            alert("Internal Server Error")
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

