import { submissionsEndpoint } from "../constants.js";

const newsLetterForm = document.getElementById("newsLetterForm")
const subscribeEmail = document.getElementById("subscribeEmail")

// Function to show the popup
function showErrorPopup(message) {
    const errorpopup = document.getElementById('errorPopup');
    errorpopup.innerHTML = `<p>${message}</p>`
    errorpopup.classList.remove('hidden');
    errorpopup.classList.add('show', 'slide-in');

    // Hide the popup after 3 seconds (adjust as needed)
    setTimeout(() => {
        errorpopup.classList.remove('show');
        errorpopup.classList.add('hidden');
    }, 8000); // 8000 milliseconds = 3 seconds
}

// Function to show the popup
function showSuccessPopup(message) {
    const successpopup = document.getElementById('successPopup');
    successpopup.innerHTML = `<p>${message}</p>`
    successpopup.classList.remove('hidden');
    successpopup.classList.add('show', 'slide-in');

    // Hide the popup after 3 seconds (adjust as needed)
    setTimeout(() => {
        successpopup.classList.remove('show');
        successpopup.classList.add('hidden');
    }, 8000); // 8000 milliseconds = 8 seconds
}

newsLetterForm.addEventListener("submit", function(e){
    e.preventDefault()

    // Show preloader when submission starts
    preloader.style.display = "block";

    const formData = new FormData(newsLetterForm);

    fetch(`${submissionsEndpoint}/backend/email/subscribeToNewsLetter/`, {
        method:"POST",
        body: JSON.stringify({email:subscribeEmail.value}),
        // headers:{
        //     "Content-type" : "application/JSON"
        // }
    }).then(res=>res.json())
    .then(data =>{
        if(data.status === "success"){
            preloader.style.display = "none";
            showSuccessPopup(data.message)
        }else{
            preloader.style.display = "none";
            showErrorPopup(data.message)
            console.log(data.message)
        }
    })
    .catch(error => {
        // Hide preloader on fetch error
        preloader.style.display = "none";
        showErrorPopup(data.message);
        console.error('Error:', error);
    });
})