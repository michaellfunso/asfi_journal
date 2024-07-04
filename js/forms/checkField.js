import { quill } from "./quill.js";


const article_type = document.getElementById("article-type")
const prefix = document.getElementById("article_type")
const article_type_nav = document.getElementById("article_type_nav")

const upload_manuscript_nav = document.getElementById("upload_manuscript_nav")
const title_nav = document.getElementById("title_nav")
const abstract_nav = document.getElementById("abstract_nav")
const author_information_nav = document.getElementById("author_information_nav")
const disclosures_nav = document.getElementById("disclosures_nav")
const review_submit_nav = document.getElementById("review_submit_nav")

prefix.addEventListener("change", function() {
if(prefix.value != "" && prefix.value){
const nextButton = article_type.querySelector(".submit-next")
nextButton.removeAttribute("disabled")
article_type_nav.setAttribute("onclick","showNext('article-type', 'upload-manuscript', 'article_type_nav')")
}
})
const headerMessageContainer = document.getElementById("headerMessage")


headerMessageContainer.innerHTML = headerMessages[0]


const upload_manuscript = document.getElementById("upload-manuscript")
const FIleFIelds = upload_manuscript.querySelectorAll("input[type=file]")

FIleFIelds.forEach(field =>{
    field.addEventListener("change", function(){
        const FileSize = field.files[0].size
        const FileType = field.files[0].type
        if(field.files[0]){
        if(FileSize > 50000000){
            alert("File is too large")
        }
        if (!(FileType === "application/msword" || FileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || FileType === "application/pdf")){

            alert("Invalid file type. Please upload a Word document (.doc, .docx) or a PDF file (.pdf).");
            field.value = ''; // Clear the file input

        }

        if(field.value != "" && field.value){
            const nextButton = upload_manuscript.querySelector(".submit-next")
            nextButton.removeAttribute("disabled")
            upload_manuscript_nav.setAttribute("onclick","showNext('upload-manuscript', 'title', 'upload_manuscript_nav')")

        }
    }
    })

})



const Title = document.getElementById("title")
const Titles = Title.querySelectorAll("input[type=text]")

Titles.forEach(titles =>{
    titles.addEventListener("change", function(){
    if(titles.value != "" && titles.value){
    const nextButton = Title.querySelector(".submit-next")
    nextButton.removeAttribute("disabled")
    title_nav.setAttribute("onclick","showNext('title', 'abstract', 'title_nav')")
    }
})
})

const Abstract = document.getElementById("abstract")

quill.on('text-change', function(delta, oldDelta, source) {
        const nextButton = Abstract.querySelector(".submit-next")
        nextButton.removeAttribute("disabled")
        abstract_nav.setAttribute("onclick","showNext('abstract', 'author-information', 'abstract_nav')")
  });



const Author_information = document.getElementById("author-information")
const author_field = Author_information.querySelector(".hd")
const userEmailContainer = document.getElementById("logged_email")

// Author_information.addEventListener("change", function() {
    // if(userEmailContainer.value != "" && userEmailContainer.value){
    const nextButton = Author_information.querySelector(".submit-next")
    nextButton.removeAttribute("disabled")
    author_information_nav.setAttribute("onclick","showNext('author-information', 'affiliation', 'author_information_nav')")
    // }else{
    //     console.log(userEmailContainer.value)
    // }
    // })