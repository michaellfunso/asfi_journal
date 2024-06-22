import { submissionsEndpoint } from "../constants.js"

const prefix  = document.getElementById("prefix")
const registerForm = document.getElementById("registerForm")
const firstname = document.getElementById("first_name")
const lastname = document.getElementById("last_name")
const othername = document.getElementById("other_name")
const email = document.getElementById("email");
const affiliation = document.getElementById("affiliation")
const affiliation_country = document.getElementById("affiliation_country")
const affiliation_city = document.getElementById("affiliation_city")
const password = document.getElementById("password")

const password2 = document.getElementById("password2")

const message_container = document.getElementById("message_container")
const body = document.querySelector("body")
body.setAttribute("id", "formNotSubmitted")
password.addEventListener("keyup", function(){
    if(!password.value){
        message_container.innerHTML =`<div class="alert-danger">Password Can not be empty</div>`
    }else if(password.value != password2.value){
        message_container.innerHTML =`<div class="alert-danger">Passwords do not match</div>`
    }else{
        message_container.innerHTML = ``
    }
})
password2.addEventListener("keyup", function(){
    if(!password.value){
        message_container.innerHTML =`<div class="alert-danger">Password Can not be empty</div>`
    }else if(password.value != password2.value){
        message_container.innerHTML =`<div class="alert-danger">Passwords do not match</div>`
    }else{
        message_container.innerHTML = ``
    }
})

registerForm.addEventListener("submit", function(e){
    e.preventDefault();
const availableForReview = document.querySelector('input[name="review"]:checked');

    console.log(availableForReview.value)
    if(!password.value){
        message_container.innerHTML =`<div class="alert-danger">Password Can not be empty</div>`
    }else if(password.value != password2.value){
        message_container.innerHTML =`<div class="alert-danger">Passwords do not match</div>`
    }else if(password.value && password.value == password2.value && email.value){
        const formData = {
            prefix:prefix.value,
            firstname:firstname.value,
            lastname:lastname.value,
            othername: othername.value,
            email: email.value,
            affiliations: affiliation.value,
            affiliations_country: affiliation_country.value,
            affiliations_city:affiliation_city.value,
            password: password.value,
            availableForReview: availableForReview.value
        }
body.removeAttribute("id")


        fetch(`${submissionsEndpoint}/backend/accounts/signup.php`, {
            method:"POST",
            body:JSON.stringify(formData),
            headers:{
                "Content-type" : "application/JSON"
            }
        }).then(res=>res.json())
        .then(data=>{
            if(data){
            if(data.status === "error"){
                message_container.innerHTML =`<div class="alert-danger">${data.message}</div>`
                body.setAttribute("id", "formNotSubmitted")

            }else if(data.status === "success"){
                message_container.innerHTML =`<div class="alert-success">${data.message}</div>`
                // window.location.href = "/portal/verify"
body.setAttribute("id", "formNotSubmitted")
                
            }else{
                console.log(data.message)
body.setAttribute("id", "formNotSubmitted")

            }
        }else{
            message_container.innerHTML =`<div class="alert-danger">Internal Server Error</div>`
        
        }
        })

    }
    
})