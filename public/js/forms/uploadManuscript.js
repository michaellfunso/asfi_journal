import { EndPoint } from "../constants.js";

const uploadForm = document.getElementById("uploadForm");

uploadForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = new FormData();
    const fileInput = document.getElementById('manuscript');
    const nameInput = document.getElementById('name');

    formData.append('manuscript', fileInput.files[0]);
    formData.append('name', nameInput.value);

    fetch(`${EndPoint}/uploadManuscript.php`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Log server response
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
