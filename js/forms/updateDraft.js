import { EndPoint, GetParameters, submissionsEndpoint } from "../constants.js";
import { GetAccountData } from "../dashboards/accountData.js";
import { GetCookie } from "../setCookie.js";
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
                if (ArticleStatus === "saved_for_later" || ArticleStatus === "Saved" || ArticleStatus === "Drafted") {

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

                    body.setAttribute("id", "formNotSubmitted")

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

                        // body.removeAttribute("id")


                        fetch(`${submissionsEndpoint}/draft/`, {
                            method: 'POST',
                            body: formData
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log(data); // Log server response
                                if (data.status === "success") {
                                    alert("Manuscript Updated Successfully")
                                    window.location.href = "/dashboard/authordash/manuscripts"
                                } else if (data.status === "error") {
                                    alert(data.message)
                                    body.setAttribute("id", "formNotSubmitted")
                                } else {
                                    alert("Internal Server Error")
                                    body.setAttribute("id", "formNotSubmitted")
                                }

                            })
                            .catch(error => {
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

}

const nextButton = article_typeMain.querySelector(".submit-next")
nextButton.removeAttribute("disabled")
article_type_nav.setAttribute("onclick", "NavigationNext('article-type', 'article_type_nav','upload_manuscript_nav',0)")





