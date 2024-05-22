import { EndPoint, searchParams } from "../constants.js";
import { formatTimestamp } from "../formatDate.js";
import { quill } from "./quill.js";


// Get the modal
var modal1 = document.getElementById("editorModal1");
var modal2 = document.getElementById("editorModal2");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Function to open the modal
function openModal() {
modal1.classList.add("show"); // Add the 'show' class
}

function openModal2() {
modal2.classList.add("show");
}

// Function to close the modal
function closeModal() {
modal1.classList.remove("show"); // Remove the 'show' class
}

function closeModal2() {
modal2.classList.remove("show"); // Remove the 'show' class
}

// Close the modal when the user clicks outside of it
window.onclick = function(event) {
if (event.target == modal1) {
    closeModal();
}
if (event.target == modal2) {
    closeModal2();
}
}


const ArticleId = searchParams.get("a_id");
const ArticleTitle = searchParams.get("edit")
const token = document.getElementById("token")

const title = document.getElementById("title")
const corresponsfinAuthor = document.getElementById("corresponding_author")
const AuthorsArray = document.getElementById("authorsArray")



if(ArticleId && ArticleTitle){
openModal()
    // Find the Article to edit  
    fetch(`${EndPoint}/retrieveArticle.php?q=${ArticleId}&title=${ArticleTitle}`, {
        method: "GET"
    }).then(res => res.json())
    .then(data => {
        if (data.articleData) {
            const Article = data.articleData

            if (Article.length > 0) {
                const ArticleTitle = Article[0].manuscript_full_title
                const ManuscriptFile = Article[0].manuscript_file
                const unstructuredAbstract = Article[0].unstructured_abstract
                const correspondingAuthorsEmail = Article[0].corresponding_authors_email
                const DateUploaded = formatTimestamp(Article[0].date_uploaded)
            
                const buffer = Article[0].buffer

                corresponsfinAuthor.value = correspondingAuthorsEmail
                title.value = ArticleTitle
                token.value = buffer
        

                // gEt the authors 
                fetch(`${EndPoint}/allAuthors.php?articleID=${buffer}`, {
                    method: "GET"
                }).then(res => res.json())
                    .then(data => {
                        if (data) {
                            const AllAuthors = data.authorsList
                            let AuthorsName = ""

                            AllAuthors.forEach(author => {
                                // const AuthorsFullname = `${author.authors_prefix} ${author.authors_firstname} ${author.authors_middlename} ${author.authors_lastname}, `
                                const AuthorsFullname = `${author.authors_fullname},`
                                AuthorsName += AuthorsFullname

                            })

                           AuthorsArray.value = AuthorsName

                        } else {
                            console.log("Server Error")
                        }
                    })

                // Parse the Quill content from the JSON data
                const quillContent = JSON.parse(unstructuredAbstract);

                function renderQuillAsHTML(deltaContent) {
           
                    quill.setContents(deltaContent)
                }

                // Render the Quill content as HTML in the "content" div
                renderQuillAsHTML(quillContent);

            } else {
                alert("File Not found on server")
            }
        
        }else{
            alert(data.message)
        }
    })
}



// Finally Submit and Edit the Article 
const EditArticleForm = document.getElementById('editArticle')
EditArticleForm.addEventListener("submit", function(e){
    e.preventDefault()
    const formData = new FormData(EditArticleForm);
    formData.append('article_content', JSON.stringify(quill.getContents().ops));

    const body = document.querySelector("body")

    body.removeAttribute("id")
    // formData.append('article_content', JSON.stringify(quill.getContents().ops));
    // console.log(JSON.stringify(quill.getContents().ops))

    fetch(`${EndPoint}/editManuscript.php`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log server response
        if(data.status === "success"){
            alert("Article Edited Successfully")
            window.location.href = "../manage"
        }else if(data.status === "error"){
            alert(data.message)
            body.setAttribute("id", "formNotSubmitted")
        }else{
            alert("Internal Server Error")
            body.setAttribute("id", "formNotSubmitted")
        }

    })
    .catch(error => {
        console.error('Error:', error);
    });
})