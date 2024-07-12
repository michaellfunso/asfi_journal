import { submissionsEndpoint } from "../constants.js";

const newsLetterForm = document.getElementById("newsLetterForm")
const subscribeEmail = document.getElementById("subscribeEmail")
newsLetterForm.addEventListener("submit", function(e){
    e.preventDefault()

    const formData = new FormData(newsLetterForm);

    fetch(`${submissionsEndpoint}/backend/email/subscribeToNewsLetter/`, {
        method:"POST",
        body: JSON.stringify({email:subscribeEmail.value}),
        // headers:{
        //     "Content-type" : "application/JSON"
        // }
    }).then(res=>res.json())
    .then(data =>{
        alert(data.message)
    })
})