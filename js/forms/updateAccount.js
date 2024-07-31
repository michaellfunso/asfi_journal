import { parentDirectoryName, submissionsEndpoint } from "../constants.js"
import { GetAccountData } from "../dashboards/accountData.js";
import { GetCookie } from "../setCookie.js"


const user = GetCookie("user");

if(user){
const accountData  = await GetAccountData(user);

const userId = document.getElementById("userId")
userId.value = user

const prefix  = document.getElementById("prefix")
const registerForm = document.getElementById("registerForm")
const firstname = document.getElementById("first_name")
const lastname = document.getElementById("last_name")
const othername = document.getElementById("other_name")
const email = document.getElementById("email");
const affiliation = document.getElementById("affiliation")
const affiliation_country = document.getElementById("affiliation_country")
const affiliation_city = document.getElementById("affiliation_city")
const disciplineMain = document.querySelector(".discipline")
const discipline = document.querySelector('#discipline')
const orcid = document.getElementById("orcid");
const asfi_membership_id = document.getElementById("asfi_membership_id")
const availableForReview = document.querySelectorAll('input[name="is_available_for_review"]');


if(discipline){
discipline.addEventListener("change", function(){
    if(discipline.value == "other" || discipline.value == "Other"){
        discipline.removeAttribute("name")
        disciplineContainer.innerHTML = `<input class='form-control discipline' name="discipline" placeholder="Specify Your discipline" required/>`
    }else{
        if(discipline.hasAttribute("name")){

        }else{
            discipline.setAttribute("name", "discipline")
        }
        disciplineContainer.innerHTML = ""
    }
})
}

if(accountData){
    prefix.value = accountData.prefix
    firstname.value = accountData.firstname
    lastname.value = accountData.lastname
    othername.value = accountData.othername
    affiliation.value = accountData.affiliations
    affiliation_country.value = accountData.affiliation_country
    affiliation_city.value = accountData.affiliation_city
    discipline.value = accountData.discipline
    email.value = accountData.email 
    orcid.value = accountData.orcid_id
    asfi_membership_id.value = accountData.asfi_membership_id
  
    availableForReview.forEach(radio =>{

        if(radio.value === accountData.is_available_for_review){
            radio.checked = true
        }
    })
}else{
    alert("account Does not exist")
}

const message_container = document.getElementById("message_container")
const body = document.querySelector("body")
body.setAttribute("id", "formNotSubmitted")



registerForm.addEventListener("submit", function(e){
    e.preventDefault();
  body.removeAttribute("id");

    const myNewData = new FormData(registerForm);
    fetch(`${submissionsEndpoint}/backend/accounts/updateAccount.php`, {
        method:"POST",
        body: myNewData,
    }).then(res=>res.json())
    .then(data=>{
        
     alert(data.message)
body.setAttribute("id", "formNotSubmitted")

    })
})

}else{
    window.location.href = `${parentDirectoryName}/portal/login`
}
