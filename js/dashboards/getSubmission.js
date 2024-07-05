import { GetParameters, submissionsEndpoint } from "../constants.js";
import { formatTimestamp } from "../formatDate.js";
// import { quill } from "../forms/quill.js";
const manu_title = document.getElementById("manu_title");
const published_date = document.getElementById("published_date")
// const authorsContainerTop = document.getElementById("authorsContainerTop")
const authorsListBottom = document.getElementById("authorsListBottom")
const filesContainer = document.getElementById("filesContainer")
const ArticleTypeContainer = document.getElementById("articleTypeContainer")
const DiscisplineContainer =  document.getElementById("disciplineContainer")
const statusContainer = document.getElementById("status")
const ArticleIdQuery = GetParameters(window.location.href).get("a")
const ActionsContainer = document.getElementById("action_container")

if(ArticleIdQuery){
    getSupplement(ArticleIdQuery)
}else{
    window.location.href = "../../dashboard/authordash/manuscripts"
}


function getSupplement(articeID) {
    fetch(`${submissionsEndpoint}/backend/accounts/getArticleInfo.php`, {
        method:"POST",
        body:JSON.stringify({id:articeID}),
        headers:{
            "Content-type" : "application/JSON"
        }
    }).then(res => res.json())
        .then(data => {
            if (data.articles) {
                const Article = data.articles

                if (Article) {
                    const ArticleTitle = Article.title
                    const ArticleType = Article.article_type
                    const coverLetter = Article.cover_letter_file
                    const discipline = Article.discipline
                    const ManuscriptFile = Article.manuscript_file
                    const Status = Article.status

                    
                
                    const unstructuredAbstract = Article.abstract
                    const status = Article.status
                    const correspondingAuthorsEmail = Article.corresponding_authors_email
                    const DateUploaded = formatTimestamp(Article.date_submitted)
                    
                    const ArticleID = Article.article_id
                    filesContainer.innerHTML += `<a href="https://cp.asfirj.org/uploadedFiles/${coverLetter}" style="color:#333; text-decoration: underline;" target=_blank>View Cover Letter</a><br>
                            <b>Manuscript File </b><i>a combination of all files submitted, (i.e tables, figues, supplementary materials)</i>: <a href="https://cp.asfirj.org/uploadedFiles/${ManuscriptFile}" style="color:#333; text-decoration: underline;" target=_blank>View Manuscript File</a>`
                    const correspondingAuthorsEmailContainer = document.getElementById("correspondingAuthorsEmail")
                    correspondingAuthorsEmailContainer.innerHTML +=  ` <a style="color:#333;" href="mailto:${correspondingAuthorsEmail}">${correspondingAuthorsEmail}</a>`
                    ArticleTypeContainer.innerText  = ArticleType
                    DiscisplineContainer.innerText = discipline
                    statusContainer.innerText = status
                    // Add the HTML content to the page 
                    manu_title.innerText = ArticleTitle
                    published_date.innerText = `${DateUploaded}`

                    if(Status === "review_submitted"){
                        ActionsContainer.innerHTML += ` <br> <a href="../reviews?a=${articeID}" style="color: #333; text-decoration: underline; font-style: italic;">View Reviews</a> <br>`
                    }else{
                        ActionsContainer.innerHTML = `
                        <h4>Actions</h4>
                        <i>There are not actions available yet, an Action will be available once a decision is made or a review is submitted</i>`
                    }
                 
                    // gEt the authors 
                    fetch(`${submissionsEndpoint}/backend/accounts/articleAuthors.php?articleID=${ArticleID}`, {
                        method: "GET"
                    }).then(res => res.json())
                        .then(data => {
                            if (data) {
                                const AllAuthors = data.authorsList
                                let AuthorsName = ""

                                // AllAuthors.forEach(author => {
                                 
                                //     const AuthorsFullname = `${author.authors_fullname} `
                                //     authorsListBottom.innerHTML += `<li style="padding:8px"> ${AuthorsFullname} </li>`

                                // })

                                for(var i=0; i < AllAuthors.length; i++){
                                    if(i < AllAuthors.length - 1){
                                        AuthorsName += `${AllAuthors[i].authors_fullname}, `

                                    }else{
                                        AuthorsName += `${AllAuthors[i].authors_fullname}.`
                                    }
                                }

                                 authorsListBottom.innerText = AuthorsName

                            } else {
                                console.log("Server Error")
                            }
                        })

                    // Parse the Quill content from the JSON data
                    const quillContent = JSON.parse(unstructuredAbstract);

                    // Create a Quill instance in "read-only" mode to render the content as HTML
                    const contentDiv = document.getElementById('content');

                    function renderQuillAsHTML(divId, deltaContent) {
                        // Create a Quill instance in a temporary div
                        const tempDiv = document.createElement('div');
                        const quill = new Quill(tempDiv, {
                            theme: 'snow',
                            modules: { toolbar: false },
                            readOnly: true,
                        });

                        // Set the content as Quill Delta and extract the HTML
                        quill.setContents(deltaContent);

                        // Get the innerHTML from the Quill editor
                        const htmlContent = tempDiv.innerHTML;

                        // Render the extracted HTML into the specified div
                        contentDiv.innerHTML = htmlContent;
                    }

                    // Render the Quill content as HTML in the "content" div
                    renderQuillAsHTML('content', quillContent);

                } else {
                    alert("File Not found on server")
                }
            }
        })
}


export {
    getSupplement
}
