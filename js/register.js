// Import Contatn Variables from the constants file 
import {EndPoint} from "./constants.js"


const RegisterForm = document.getElementById("registerForm")


RegisterForm.addEventListener("submit", function(e){
    e.preventDefault()
    let Review
    var reviews = document.getElementsByName('options');
    
    // Loop through each radio button
    for (var i = 0; i < reviews.length; i++) {
        // Check if the radio button is checked
        if (reviews[i].checked) {
            // If the radio button is checked, log its value
            Review = reviews[i].value;
            // return;
        }
    }
    const RegData = {
        username:username.value,
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value,
        accountType: accountType.value,
        password:password.value,
        prefix:prefix.value,
        review: Review,
    }

    fetch(`${EndPoint}/register.php`, {
        method: "POST",
        body: JSON.stringify(RegData),
        headers:{
            "Content-type" : "applicaiton/JSON"
        }
    }).then(res => res.json())
    .then(data =>{
        if(data.status === "success"){
            alert(data.message)
            window.location.href = "./login.html"
        }else{
        alert(data.message)
        }
    })
})