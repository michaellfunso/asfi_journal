import { submissionsEndpoint } from "../constants.js";
import { GetCookie, hoursToKeep, SetCookies } from "../setCookie.js";

let authorEmailsAdded
authorEmailsAdded = []

  // Get the modal
  var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.querySelector('.add-author-btn');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
const emptyForm = ` 
`

// Function to close the modal
function closeModal() {
    modal.style.display = "none";
  }
// Function to open the modal
const authorForm = document.getElementById("authorForm")
function openEmptyModal(email){
    modal.style.display = "block";
    authorForm.innerHTML = ` <h3 style="text-align: center;">
 Create details for this author
 </h3>
 <div class="authorname">
        <div style="margin-right: 10px;">
          <label for="prefix">Prefix:</label>
          <select name="authors_prefix[]" id="addAuthorPrefix" class="form-control">
            <option value="">Select</option>
            <option value="Prof">Prof.</option>
            <option value="Dr">Dr.</option>
            <option value="Mr">Mr.</option>
            <option value="Mrs">Mrs.</option>
            <option value="Miss">Miss</option>
          </select>

        </div>

        <div style="margin-right: 10px;">
          <label for="">First Name:</label>
          <input type="text" id="add-author-fname" class="form-control hd" placeholder="First Name..." name="authors_first_name[]" >
        </div>
          <!-- <div style="display: flex;"> -->
        <div style="margin-right: 10px;">
                <label for="">MiddleName:</label>
                <input type="text" id="add-author-mname" class="form-control" placeholder="Middle name" name="authors_other_name[]" >
                <!-- </div> -->
        </div>
        <div style="margin-right: 10px;">
            <label for="">Last Name:</label>
            <input type="text" id="add-author-lname" class="form-control hd" placeholder="Last Name..." name="authors_last_name[]" >
        </div>
      </div>  
      
      <div class="authorinfo">
        <div style="margin-right: 10px;">
            <label for="">ORCID ID”:</label>
            <input type="text" id="add-author-orcid" class="form-control hd" placeholder="ORCID ID..." name="authors_orcid[]">
        </div>
    

        <div style="margin-right: 10px;">
          <label for="">Affiliation(s):</label>
          <div class="modalAff">
            <input type="text" id="add-author-aff" class="form-control" placeholder="Affiliation..." name="affiliation[]" style="margin-right: 5px;">
            <input type="text" id="add-author-aff-city" class="form-control" placeholder="City..." name="affiliation_city[]" style="margin-right: 5px;">
            <input type="text" id="add-author-aff-country" class="form-control" placeholder="Country..." name="affiliation_country[]" style="margin-right: 5px;">
          </div>
        </div>

        <div style="margin-right: 10px; width:">
          <label for="">Email:</label>
          <input type="email" id="add-author-email" class="form-control" placeholder="Email..." name="email[]" readonly value="${email}">
        </div>
      </div>
      <div class="modalbtn"><button type="button" id="addAuthormodal" class="addAuthormodal">Add Author</button></div>
      `
      getCreateAuthor()
}
function openModal(prefix, firstname, lastname, othername, orcid, email, affiliation, affiliationCountry, affiliationCity) {
  modal.style.display = "block";
  authorForm.innerHTML = `   <div class="authorname">
        <div style="margin-right: 10px;">
          <label for="prefix">Prefix:</label>
          <select name="authors_prefix[]" id="addAuthorPrefix" class="form-control">
            <option value="${prefix}">${prefix}</option>
            <option value="Prof">Prof.</option>
            <option value="Dr">Dr.</option>
            <option value="Mr">Mr.</option>
            <option value="Mrs">Mrs.</option>
            <option value="Miss">Miss</option>
          </select>

        </div>

        <div style="margin-right: 10px;">
          <label for="">First Name:</label>
          <input type="text" id="add-author-fname" class="form-control hd" placeholder="First Name..." name="authors_first_name[]" value="${firstname}">
        </div>
          <!-- <div style="display: flex;"> -->
        <div style="margin-right: 10px;">
                <label for="">MiddleName:</label>
                <input type="text" id="add-author-mname" class="form-control" placeholder="Middle name" name="authors_other_name[]" value="${othername}" >
                <!-- </div> -->
        </div>
        <div style="margin-right: 10px;">
            <label for="">Last Name:</label>
            <input type="text" id="add-author-lname" class="form-control hd" placeholder="Last Name..." name="authors_last_name[]" value="${lastname}">
        </div>
      </div>  
      
      <div class="authorinfo">
        <div style="margin-right: 10px;">
            <label for="">ORCID ID”:</label>
            <input type="text" id="add-author-orcid" class="form-control hd" placeholder="ORCID ID..." name="authors_orcid[]" value="${orcid}">
        </div>
    

        <div style="margin-right: 10px;">
          <label for="">Affiliation(s):</label>
          <div class="modalAff">
            <input type="text" id="add-author-aff" class="form-control" placeholder="Affiliation..." name="affiliation[]" style="margin-right: 5px;" value="${affiliation}">
            <input type="text" id="add-author-aff-city" class="form-control" placeholder="City..." name="affiliation_city[]" style="margin-right: 5px;" value="${affiliationCity}">
            <input type="text" id="add-author-aff-country" class="form-control" placeholder="Country..." name="affiliation_country[]" style="margin-right: 5px;" value="${affiliationCountry}">
          </div>
        </div>

        <div style="margin-right: 10px;">
          <label for="">Email:</label>
          <input type="email" id="add-author-email" class="form-control" placeholder="Email..." name="email[]" value="${email}">
        </div>
      </div>
      <div class="modalbtn"><button type="button"id="addAuthormodal" class="addAuthormodal">Add Author</button></div>
      `
      getCreateAuthor()
}


// Close the modal after submission (optional)
closeModal();

// Check if the email exists 
async function CheckIfEmailExists(emailToSearch){
    // const AlreadyExistingEmails = GetCookie("emailsAdded")
  
    
      if(authorEmailsAdded.find((email)=> email.email === emailToSearch)){
        console.log("Author Already Exists")
        return true
      }else{
        return false
      }
 

  }

function getCreateAuthor(){
const prefix = document.getElementById('addAuthorPrefix');
const firstName = document.getElementById('add-author-fname');
const middleName = document.getElementById('add-author-mname');
const lastName = document.getElementById('add-author-lname');
const orcid = document.getElementById('add-author-orcid');
const affiliation = document.getElementById('add-author-aff');
const affiliationCity = document.getElementById('add-author-aff-city');
const affiliationCountry = document.getElementById('add-author-aff-country');
const email = document.getElementById('add-author-email');
const addAuthormodal = document.querySelectorAll(".addAuthormodal")
addAuthormodal.forEach(button =>{


button.addEventListener("click", function(){
    // if(CheckIfEmailExists(email.value)){
    //     alert("This Author has already been added")
    // }else{
        var authorContainer = document.getElementById('author-information');
        var addAuthor = document.getElementById('addAuthor');

         // Validate all required fields before proceeding
    var prefixValue = document.getElementById('addAuthorPrefix');
    var fname = document.getElementById('add-author-fname');
    var lname = document.getElementById('add-author-lname');
    var orcidValue = document.getElementById('add-author-orcid');
    var aff = document.getElementById('add-author-aff');
    var affCity = document.getElementById('add-author-aff-city');
    var affCountry = document.getElementById('add-author-aff-country');
    var emailValue = document.getElementById('add-author-email');


    // Check if any required field is empty
    var valid = true;
    if (!prefixValue.value.trim()) {
      prefixValue.classList.add('error');
      valid = false;
    } else {
      prefixValue.classList.remove('error');
    }
    if (!fname.value.trim()) {
      fname.classList.add('error');
      valid = false;
    } else {
      fname.classList.remove('error');
    }
    if (!lname.value.trim()) {
      lname.classList.add('error');
      valid = false;
    } else {
      lname.classList.remove('error');
    }
    if (!orcidValue.value.trim()) {
      orcidValue.classList.add('error');
      valid = false;
    } else {
      orcidValue.classList.remove('error');
    }
    if (!aff.value.trim()) {
      aff.classList.add('error');
      valid = false;
    } else {
      aff.classList.remove('error');
    }
    if (!affCity.value.trim()) {
      affCity.classList.add('error');
      valid = false;
    } else {
      affCity.classList.remove('error');
    }
    if (!affCountry.value.trim()) {
      affCountry.classList.add('error');
      valid = false;
    } else {
      affCountry.classList.remove('error');
    }
    if (!emailValue.value.trim()) {
      emailValue.classList.add('error');
      valid = false;
    } else {
      emailValue.classList.remove('error');
    }

    // If all fields are filled, proceed with your modal logic
    if (valid) {
      // Create fields for the new author
      var newAuthorInputs = document.createElement('div');
      newAuthorInputs.className = 'author-container';
      newAuthorInputs.innerHTML = `
      <div style="display: flex; justify-content: space-between;"><div class="drag-handle"></div><div class="remove-author" style="width: 20px; height: 20px; color:white; font-weight:bold; background-color: red; border-radius:6px; display:flex; justify-content: center; align-items: center; text-align: center; line-height: 20px; cursor:pointer;">x</div></div>
          
          <div class="authorname" id="author-container">
            <div style="margin-right: 10px;">
                <label for="prefix">Prefix:</label>
                <select name="authors_prefix[]" class="form-control">
                    <option value="${prefix.value}">${prefix.value}</option>
                </select>
            </div>
  
  
                      <div style="margin-right: 10px;">
                                <label for="">First Name:</label>
                                <input type="text" class="form-control hd" placeholder="First Name..." name="authors_first_name[]" value="${firstName.value}" >
                                </div>
                                <!-- <div style="display: flex;"> -->
                                  <div style="margin-right: 10px;">
                                      <label for="">MiddleName:</label>
                                        <input type="text" class="form-control" placeholder="Middle name" name="authors_other_name[]" value="${middleName.value}" >
                                      <!-- </div> -->
                                  </div>
                              <div style="margin-right: 10px;">
                                  <label for="">Last Name:</label>
                                  <input type="text" class="form-control hd" placeholder="Last Name..." name="authors_last_name[]" value="${lastName.value}">
                              </div>
           </div>
                    <div class="authorinfo">
                              <div style="margin-right: 10px;">
                                  <label for="">ORCID ID”:</label>
                                  <input type="text" class="form-control hd" placeholder="ORCID ID..." name="authors_orcid[]" value="${orcid.value}">
                              </div>
  
                          <div style="margin-right: 10px;">
                              <label for="">Affiliation:</label>
                              <div style="display: flex;  width: 250px;">
                              <input type="text" class="form-control" placeholder="Affiliation..." name="affiliation[]" value="${affiliation.value}">
                              <input type="text" class="form-control" placeholder="City..." name="affiliation_city[]" value="${affiliationCity.value}">
                              <input type="text" class="form-control" placeholder="Country..." name="affiliation_country[]" value="${affiliationCountry.value}">
                              </div>
                          </div>
                  
                          <div style="margin-bottom: 12px;">
                              <label for="">Email:</label>
                              <input type="email" class="form-control" placeholder="Email..." name="email[]" value="${email.value}">
                          </div>
                        </div>
  
      `;
  
      // Append the new author inputs to the container
      addAuthor.appendChild(newAuthorInputs);
  
      // Add event listener to the "x" button
      newAuthorInputs.querySelector('.remove-author').addEventListener('click', function() {
          authorEmailsAdded.filter((email) => email.email !== email.value)
          authorEmailsAdded = authorEmailsAdded.filter((email) => email.email === email.value)
          addAuthor.removeChild(newAuthorInputs);
      });
      authorEmailsAdded.push({
          email:email.value
  })
  // }
  closeModal()
    } else {
      alert('Please fill in all fields!');
    }
  });
   
})
}


// Function to fetch author data
const searchAuthor  = document.getElementById("searchAuthor")
var searchBtn = document.querySelector('.add-author-btn');
var loader = document.querySelector('.searchloader');
var searchText = document.querySelector('.searchText');

async function fetchAuthorData() {
    var emailINSearch = document.getElementById('authorSearch').value;

    // Show loader
    searchText.style.display = "none";
    loader.style.display = "inline-block";
    searchBtn.disabled = true; // Disable button during fetch

  if(emailINSearch != "" && emailINSearch != ' '){
    if(await CheckIfEmailExists(emailINSearch)){
        alert("This Author has already been added")
         // Hide loader and enable button
         searchText.style.display = "inline-block";
         loader.style.display = "none";
         searchBtn.disabled = false;
    }else{
    fetch(`${submissionsEndpoint}/backend/editors/authorProfileForSearch.php?&encrypted=${emailINSearch}`)
      .then(response => response.json())
      .then(data => {
       if(data.status === "success"){
        const profileDetails = data.accountData;
        if (profileDetails) {
         
            // SetCookies("emailsAdded", JSON.stringify(authorEmailsAdded), hoursToKeep)
            openModal(profileDetails.prefix, profileDetails.firstname, profileDetails.lastname, profileDetails.othername, profileDetails.orcid_id, profileDetails.email, profileDetails.affiliations, profileDetails.affiliation_country, profileDetails.affiliation_city);
        } else {
            openEmptyModal(emailINSearch)
        }
    }else[
        openEmptyModal(emailINSearch)
    ]
  
     
    
      })
      .catch(error => {
        console.error('Error fetching author data:', error);
      })
      .finally(() => {
        // Hide loader and enable button
        searchText.style.display = "inline-block";
        loader.style.display = "none";
        searchBtn.disabled = false;
      });
    }
  }else{
    alert("Field should not be empty")
     // Hide loader and enable button
     searchText.style.display = "inline-block";
     loader.style.display = "none";
     searchBtn.disabled = false;
  }

  }


  searchAuthor.addEventListener("click", function() {
   
    fetchAuthorData()
})