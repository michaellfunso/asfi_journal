import { EndPoint, GetParameters, parentDirectoryName, submissionsEndpoint } from "../constants.js";
import { GetAccountData } from "../dashboards/accountData.js";
import { GetCookie } from "../setCookie.js";
import { RunOrcidQuery } from "./checkField.js";
import { GetKeywords } from "./getKeywords.js";
import { GetSuggestedReviewers } from "./getSuggestedReviewers.js";
import { quill } from "./quill.js";
// Function to Add new file fields or links if the file exists 
// Teh array to contain fiels has been created in submissionHeader.js 
function fetchFile(fileName, fieldName) {
    fetch(`${submissionsEndpoint}/selectFile/?file=${encodeURIComponent(fileName)}`)
        .then(response => response.blob())
        .then(blob => {
            const file = new File([blob], fileName, { type: blob.type });
            FilesArray.push({
                [fieldName]: file,
                "file": file,
                "fieldName": fieldName
            });
        })
        .catch(error => console.error('Error fetching file:', error));
}


function AddFileField(fieldName, filename, fieldContainerId, label) {
    const fileContainer = document.getElementById(fieldContainerId)
    fileContainer.setAttribute("style", "color:black; display:flex; align-items:center; padding:10px")
    if (filename != null) {
        fileContainer.innerHTML = ` <label for="${fieldName}">${label}:  </label>
                                <a href="${submissionsEndpoint}/uploadedFiles/${filename}" style="margin-left:10px;" target=_blank > ${filename}</a> <button type="button" class="text-danger" style="margin-left:10px;"  onClick="removeFile('${fieldName}', '${fieldContainerId}', '${label}')"><i class="fa fa-trash"></i></button>`
        fetchFile(filename, fieldName)
        fileContainer.querySelector("a").setAttribute("style", "color:purple; text-decoration:underline;")
    } else {
        fileContainer.innerHTML = ` <label for="${fieldName}">${label}:</label>
                          <input type="file" class="form-control" name="${fieldName}">`
    }
}


const article_typeMain = document.getElementById("article-type")
// const prefix = document.getElementById("article_type")
const article_type_nav = document.getElementById("article_type_nav")

const upload_manuscript_nav = document.getElementById("upload_manuscript_nav")
const title_nav = document.getElementById("title_nav")
const abstract_nav = document.getElementById("abstract_nav")
const authorsContainer = document.getElementById("addAuthor")

// Get the Article Id from the search Parameter 
const articleId = GetParameters(window.location.href).get("a");
if (articleId) {
    // Check the database if the article has been returned for revision 
    fetch(`${submissionsEndpoint}/backend/accounts/getArticleInfo.php`, {
        method: "POST",
        body: JSON.stringify({ id: articleId }),
        headers: {
            "Content-type": "application/JSON"
        }
    }).then(res => res.json())
        .then(async (data) => {
            if (data.success) {
                const Article = data.articles
                const ArticleStatus = Article.status
                if (ArticleStatus === "saved_for_later" || ArticleStatus === "Saved" || ArticleStatus === "Drafted" || ArticleStatus === "returned_for_correction") {

                    const articleType = Article.article_type
                    const abstract = Article.abstract
                    const title = Article.title
                    const articleDiscipline = Article.discipline
                    const manuscript_file = Article.manuscript_file
                    const coverLetter = Article.cover_letter_file
                    const tables = Article.tables
                    const figures = Article.figures
                    const supplementaryMaterials = Article.supplementary_material
                    const graphicAbstract = Article.graphic_abstract

                    // gEt the authors 
                    fetch(`${submissionsEndpoint}/backend/accounts/articleAuthors.php?articleID=${articleId}`, {
                        method: "GET"
                    }).then(res => res.json())
                        .then(data => {
                            if (data) {
                                const AllAuthors = data.authorsList

                                AllAuthors.forEach(author => {
                                    // Create new input fields for the new author
                                    var newAuthorInputs = document.createElement('div');
                                    newAuthorInputs.className = 'author-container';
                                    const authorsFullname = author.authors_fullname;
                                    const authorsArray = authorsFullname.split(' ');
                                    
                                    newAuthorInputs.innerHTML = `
                                    <div style="display: flex; justify-content: space-between;"><div class="drag-handle"></div><div class="remove-author" style="width: 20px; height: 20px; color:white; font-weight:bold; background-color: red; border-radius:6px; display:flex; justify-content: center; align-items: center; text-align: center; line-height: 20px; cursor:pointer;">x</div></div>
        
            <div class="authorname" id="author-container">
        <div style="margin-right: 10px;">
            <label for="prefix">Prefix:</label>
            <select name="authors_prefix[]" class="form-control">
                <option value="${authorsArray[0]}">${authorsArray[0]}</option>
                <option value="">Select an Option</option>
                <option value="Prof">Prof.</option>
                <option value="Dr">Dr.</option>
                <option value="Mr">Mr.</option>
                <option value="Mrs">Mrs.</option>
                <option value="Miss">Miss</option>
            </select>
        </div>
    
    
                                 <div style="margin-right: 10px;">
                                  <label for="">First Name:</label>
                                  <input type="text" class="form-control hd" placeholder="First Name..." name="authors_first_name[]" value="${authorsArray[1]}" >
                                  </div>
                                  <!-- <div style="display: flex;"> -->
                                    <div style="margin-right: 10px;">
                                        <label for="">MiddleName:</label>
                                          <input type="text" class="form-control" placeholder="Middle name" name="authors_other_name[]" value="${authorsArray[3]}">
                                        <!-- </div> -->
                                    </div>
                                <div style="margin-right: 10px;">
                                    <label for="">Last Name:</label>
                                    <input type="text" class="form-control hd" placeholder="Last Name..." name="authors_last_name[]" value="${authorsArray[2]}">
                                </div>
                           
                                <div style="margin-right: 10px;">
                                    <label for="">ORCID ID:</label>
                                    <input type='text' class='form-control hd orcidID' value='${author.orcid_id}' name='authors_orcid[]'>
                                </div>
    
                            <div style="margin-right: 10px;">
                                <label for="">Affiliation:</label>
                                
                                <input type="text" class="form-control" placeholder="Affiliation..." name="affiliation[]" value="${author.affiliations}">
                            </div>
                            <div style="margin-right: 10px;">
                                <label for="">Affiliation City:</label>
                                <input type="text" class="form-control" placeholder="City..." name="affiliation_city[]" value="${author.affiliation_city}">
                            </div>
                             <div style="margin-right: 10px;">
                                <label for="">Affiliation Country:</label>
                                <input type="text" class="form-control" placeholder="Country..." name="affiliation_country[]" value="${author.affiliation_country}">
                            </div>
                        </div>
                    
                            <div style="margin-bottom: 12px;">
                                <label for="">Email:</label>
                                <input type="email" class="form-control" placeholder="Email..." name="email[]" value="${author.authors_email}">
                            </div>
                            <div style="margin-bottom: 12px;">
                                <label for="">ASFI Membership ID:</label>
                                <input type="text" class="form-control" placeholder="Membership ID..." name="membershipID[]" value="${author.asfi_membership_id}">
                            </div>
                        
            
    
        `;

                                    // Append the new author inputs to the container
                                    authorsContainer.appendChild(newAuthorInputs);
                                })


                                RunOrcidQuery()

                            } else {
                                console.log("Server Error")
                            }
                        })

                    // if manuscript_file Exists, add manuscript_file to the list 
                    if (manuscript_file && manuscript_file != null) {
                        AddFileField("manuscript_file", manuscript_file, "manuscriptFileContainer", "Main Manuscript File")
                    }
                    // Add cover letter if exists 
                    if (coverLetter && coverLetter != null) {
                        AddFileField("cover_letter", coverLetter, "coverLetterContainer", "Cover Letter")
                    }
                    // Add tables to the list if the tables exist 
                    if (tables && tables != null) {
                        AddFileField("tables", tables, "tablesContainer", "Tables")
                    }
                    // Add the figures to the list if the figures exist
                    if (figures && figures != null) {
                        AddFileField("figures", figures, "figuresContainer", "Figures")
                    }
                    // Add supplementaryMaterials
                    if (supplementaryMaterials && supplementaryMaterials != null) {
                        AddFileField("supplementary_materials", supplementaryMaterials, "supplementaryMaterialContainer", "Supplementary Materials")
                    }
                    // Add graphic abstract 
                    if (graphicAbstract && graphicAbstract != null) {
                        AddFileField("graphic_abstract", graphicAbstract, "graphicAbstractContainer", "Graphic Abstract")
                    }


                    const Abstract = document.getElementById("abstract")

                    if (abstract && abstract != null && abstract != "") {
                        quill.setContents(JSON.parse(abstract))
                        const nextButton = Abstract.querySelector(".submit-next")
                        nextButton.removeAttribute("disabled")
                        abstract_nav.setAttribute("onclick", "NavigationNext('abstract', 'abstract_nav','author_information_nav', 3)")
                    }
                    const upload_manuscript = document.getElementById("upload-manuscript")

                    if (manuscript_file != null && coverLetter != null && manuscript_file && coverLetter) {
                        const nextButton = upload_manuscript.querySelector(".submit-next")
                        nextButton.removeAttribute("disabled")
                        // nextSection, currentSection, navItemId, Nextitem, prevSection, headerMessageIndex
                        upload_manuscript_nav.setAttribute("onclick", "NavigationNext('upload-manuscript', 'upload_manuscript_nav', 'title_nav',1)")

                    }
                    const Title = document.getElementById("title")
                    if (title != "" && title) {
                        const nextButton = Title.querySelector(".submit-next")
                        nextButton.removeAttribute("disabled")
                        title_nav.setAttribute("onclick", "NavigationNext('title', 'title_nav', 'abstract_nav', 2)")
                    }





                    const uploadForm = document.getElementById("uploadForm");
                    const body = document.querySelector("body")
                    const message_container = document.getElementById("message_container")
                    const user = GetCookie("user")
                    const UserData = await GetAccountData(user)

                    const disciplineContainer = document.getElementById("disciplineContainer")
                    const email = UserData.email
                    const discipline = document.querySelector('#discipline')

                    discipline.addEventListener("change", function () {

                        if (discipline.value == "other" || discipline.value == "Other") {

                            discipline.removeAttribute("name")
                            disciplineContainer.innerHTML = `<input class='form-control' name="discipline" placeholder="Specify Your discipline" required/>`
                        } else {
                            if (discipline.hasAttribute("name")) {

                            } else {
                                discipline.setAttribute("name", "discipline")
                            }
                            disciplineContainer.innerHTML = ""
                        }
                    })
                    const emailContainer = document.getElementById("loggedIn_email")
                    const loggedContainer = document.getElementById("logged_email")

                    const prefix = document.getElementById("author_information_prefix")
                    const firstname = document.getElementById("loggedIn_firstname")
                    const lastname = document.getElementById("loggedIn_lastname")
                    const othername = document.getElementById("loggedIn_othername")
                    const affiliation = document.getElementById("loggedIn_affiliation")
                    const affiliationCountry = document.getElementById("loggedIn_affiliation_country")
                    const affiliationCity = document.getElementById("loggedIn_affiliation_city")

                    const manuscriptId = document.getElementById("manuscript_id")
                    const manuscript_full_title = document.getElementById("manuscript_full_title")
                    const article_type = document.getElementById("article_type")
                    manuscriptId.value = articleId

                    // appedn data to the respsective fields 
                    discipline.value = articleDiscipline
                    manuscript_full_title.value = title
                    article_type.value = articleType

                    firstname.value = UserData.firstname
                    prefix.value = UserData.prefix
                    lastname.value = UserData.lastname
                    othername.value = UserData.othername
                    affiliation.value = UserData.affiliations
                    affiliationCountry.value = UserData.affiliation_country
                    affiliationCity.value = UserData.affiliation_city
                    emailContainer.value = email
                    loggedContainer.value = email

                    // const Get the Keywords 
                    const Keywords = await GetKeywords(articleId)
                    const KeywordsContainer = document.querySelectorAll('input[name="keyword[]"]')

                    // Update the value of the keyword fields  /
                    for(let i=0; i<Keywords.length; i++){
                        KeywordsContainer[i].value = Keywords[i].keyword
                    }

                    // Get the Suggested reviewers 
                    const SuggesteReviewers = await GetSuggestedReviewers(articleId);
                    // const suggestedReviewersContainer = document.querySelectorAll("")
                    const suggestedReviewersContainer = document.getElementById("suggestReviewer")


                    for(let i=0; i<SuggesteReviewers.length; i++){
                        suggestedReviewersContainer.innerHTML +=`        <div class="suggestHandle" style="width: 100%;">
                          <div class="drag-handle"></div>
                          <div style="margin-right: 10px;">
                            <label for="fullname">Full Name:</label>
                            <input name="suggested_reviewer_fullname[]" type="text" class="form-control" placeholder="Full Name..." id="" value="${SuggesteReviewers[i].fullname}"/>
                          </div>
                          <div style="margin-right: 10px;">
                            <label for="">Affiliation(s):</label>
                            <div style="display: flex;">
                              <input type="text" class="form-control hd" placeholder="Affiliation..." name="suggested_reviewer_affiliation[]" id="suggested_reviewer_affiliation" style="margin-right: 5px;" value="${SuggesteReviewers[i].affiliation}">
                              <input type="text" class="form-control hd" placeholder="City..." name="suggested_reviewer_city[]" id="suggested_reviewer_city" style="margin-right: 5px;" value="${SuggesteReviewers[i].affiliation_city}">
                              <input type="text" class="form-control" placeholder="Country..." name="suggested_reviewer_country[]" id="suggested_reviewer_country" style="margin-right: 5px;" value="${SuggesteReviewers[i].affiliation_country}">
                            </div>
                          </div>

                          <div style="margin-right: 10px; width: 300px;">
                            <label for="">Email:</label>
                            <input type="email" class="form-control hd" placeholder="Email..." name="suggested_reviewer_email[]" id="suggested_reviewer_email" value="${SuggesteReviewers[i].email}">
                          </div>

                        </div>
`
                    }
                    // Add other empty fields 
                    for(let i=0; i<5-SuggesteReviewers.length; i++){
                        suggestedReviewersContainer.innerHTML+=`     <div class="suggestHandle" style="width: 100%;">
                          <div class="drag-handle"></div>
                          <div style="margin-right: 10px;">
                            <label for="fullname">Full Name:</label>
                            <input name="suggested_reviewer_fullname[]" type="text" class="form-control" placeholder="Full Name..." id=""/>
                          </div>
                          <div style="margin-right: 10px;">
                            <label for="">Affiliation(s):</label>
                            <div style="display: flex;">
                              <input type="text" class="form-control hd" placeholder="Affiliation..." name="suggested_reviewer_affiliation[]" id="suggested_reviewer_affiliation" style="margin-right: 5px;">
                              <input type="text" class="form-control hd" placeholder="City..." name="suggested_reviewer_city[]" id="suggested_reviewer_city" style="margin-right: 5px;">
                              <input type="text" class="form-control" placeholder="Country..." name="suggested_reviewer_country[]" id="suggested_reviewer_country" style="margin-right: 5px;">
                            </div>
                          </div>

                          <div style="margin-right: 10px; width: 300px;">
                            <label for="">Email:</label>
                            <input type="email" class="form-control hd" placeholder="Email..." name="suggested_reviewer_email[]" id="suggested_reviewer_email">
                          </div>

                        </div>
`
                    }
                        // Function to show the popup
                        function showProgressSavedPopup() {
                            const popup = document.getElementById('progressSavedPopup');
                            popup.classList.remove('hidden');
                            popup.classList.add('show', 'slide-in');

                            // Hide the popup after 3 seconds (adjust as needed)
                            setTimeout(() => {
                                popup.classList.remove('show');
                                popup.classList.add('hidden');
                            }, 3000); // 3000 milliseconds = 3 seconds
                        }
   
                    const SubmissionSTatus = document.querySelector('input[name="review_status"]')


                    uploadForm.addEventListener("submit", function (e) {
                        e.preventDefault();

                        const formData = new FormData(uploadForm);
                        formData.append('abstract', JSON.stringify(quill.getContents().ops));

                        function appendFileToForm(file, fieldName) {
                            // const formData = new FormData(document.getElementById('fileForm'));
                            formData.append(fieldName, file);
                        }
                        FilesArray.forEach(files => {
                            appendFileToForm(files.file, files.fieldName)
                        })

                        if(SubmissionSTatus.value === "submitted"){
                            body.removeAttribute("id")
                        }else{
                            body.setAttribute("id", "formNotSubmitted")
                        } 

                        fetch(`${submissionsEndpoint}/draft/`, {
                            method: 'POST',
                            body: formData
                        })
                            .then(response => response.json())
                            .then(data => {
                                if(data){
                                console.log(data); // Log server response
                                if (data.status === "success") {
                                    if(SubmissionSTatus.value === "submitted"){
                                        alert("Manuscript Updated Successfully")
                                        window.location.href = "/dashboard/authordash/manuscripts"
                                        }else[
                                            // alert("Progress Has been saved")
                                            showProgressSavedPopup()
                                        ]
                                } else if (data.status === "error") {
                                    alert(data.message)
                                    body.setAttribute("id", "formNotSubmitted")
                                } else {
                                    alert("Internal Server Error")
                                    body.setAttribute("id", "formNotSubmitted")
                                }
                                }

                            })
                            .catch(error => {
                                alert("Internal Server Error")
                                body.setAttribute("id", "formNotSubmitted")
                                console.error('Error:', error);
                            });
                    });

                } else {
                    alert("This Manuscript Has Already been sumitted")
                    window.location.href = "/dashboard/authordash/manuscripts"
                }
            } else {
                alert(data)
            }
        })

}else{
    window.location.href = `${parentDirectoryName}/dashboard/authordash`
}

const nextButton = article_typeMain.querySelector(".submit-next")
nextButton.removeAttribute("disabled")
article_type_nav.setAttribute("onclick", "NavigationNext('article-type', 'article_type_nav','upload_manuscript_nav',0)")




