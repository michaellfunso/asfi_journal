import { EndPoint } from "../constants.js";
import { quill } from "./quill.js";


const uploadForm = document.getElementById("registerForm")
const body = document.querySelector("body")
body.setAttribute("id", "formNotSubmitted")
const disciplineContainer = document.getElementById("disciplineContainer")
// Get the dropdown and the container where the input field will be added
const discipline = document.querySelector('#discipline')
if(discipline){
discipline.addEventListener("change", function(){
    console.log(discipline.value)
    if(discipline.value == "other" || discipline.value == "Other"){
        console.log("VAlue")
        discipline.removeAttribute("name")
        disciplineContainer.innerHTML = `<input class='form-control' name="discipline" placeholder="Specify Your discipline" required/>`
    }else{
        if(discipline.hasAttribute("name")){

        }else{
            discipline.setAttribute("name", "discipline")
        }
        disciplineContainer.innerHTML = ""
    }
})
}

uploadForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(uploadForm);
    formData.append('bio', JSON.stringify(quill.getContents().ops));



    body.removeAttribute("id")
    // formData.append('article_content', JSON.stringify(quill.getContents().ops));
    // console.log(JSON.stringify(quill.getContents().ops))

    fetch(`${EndPoint}/addEditor.php`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            alert("Upload Successful")
            // window.location.href = "../supplements.html#supplements"
        }else if(data.error){
            alert(data.error)
            body.setAttribute("id", "formNotSubmitted")
        }else{
            alert(data.status)
            body.setAttribute("id", "formNotSubmitted")
        }

    })
    .catch(error => {
        console.error('Error:', error);
    });
});

