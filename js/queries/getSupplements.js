import { EndPoint } from "../constants.js"
import { formatTimestamp } from "../formatDate.js";
import { DownloadItem } from "./downloadCount.js";


const manu_title = document.getElementById("manu_title");
const published_date = document.getElementById("published_date")
const authorsContainerTop = document.getElementById("authorsContainerTop")
const authorsListBottom = document.getElementById("authorsListBottom")
const downloadLinks = document.querySelectorAll(".downloadLink")
const viewCountContainer = document.getElementById("viewCountContainer")
const downloadsCountContainer = document.getElementById("downloadsCountContainer")
function getSupplement(articeID, title) {
    fetch(`${EndPoint}/retrieveArticle.php?q=${articeID}&title=${title}`, {
        method: "GET"
    }).then(res => res.json())
        .then(data => {
            if (data.articleData) {
                const Article = data.articleData

                if (Article.length > 0) {
                    const ArticleTitle = Article[0].manuscript_full_title
                    const ArticleRunningTitle = Article[0].manuscript_running_title
                    const Tables = Article[0].manuscript_tables
                    const Figures = Article[0].figures
                    const CoverLetter = Article[0].cover_letter
                    const ManuscriptFile = Article[0].manuscript_file
                    const SuppluimentaryMaterials = Article[0].supplimentary_materials
                    const GraphicAbstract = Article[0].graphic_abstract
                    const AbstractBackground = Article[0].abstract_background
                    const AbstractObjective = Article[0].absteact_objectives
                    const ABstractMethod = Article[0].abstract_method
                    const AbstractResult = Article[0].abstract_results
                    const AbstractDiscussoin = Article[0].abstract_discussion
                    const unstructuredAbstract = Article[0].unstructured_abstract
                    const status = Article[0].status
                    const viewsCount = Article[0].views_count
                    const correspondingAuthorsEmail = Article[0].corresponding_authors_email
                    const DownloadsCount = Article[0].downloads_count
                    const DateUploaded = formatTimestamp(Article[0].date_uploaded)
                    
                    const buffer = Article[0].buffer

                    const correspondingAuthorsEmailContainer = document.getElementById("correspondingAuthorsEmail")
                    correspondingAuthorsEmailContainer.innerHTML +=  ` <a style="color:#333;" href="mailto:${correspondingAuthorsEmail}">${correspondingAuthorsEmail}</a>`

                    viewCountContainer.innerText = `${viewsCount} Views`
                    downloadsCountContainer.innerText = `${DownloadsCount} Downloads`
                    // Set the download links for the articles 
                    downloadLinks.forEach(link =>{
                        link.setAttribute("href", `../useruploads/manuscripts/${ManuscriptFile}`)
                        link.setAttribute("download", `${ArticleTitle}.pdf`)

                        link.addEventListener("click", function(){
                            DownloadItem(buffer)
                        })
                    })

                    // Add the HTML content to the page 
                    manu_title.innerText = ArticleTitle
                    published_date.innerText = `${DateUploaded}`

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
                                    const AuthorsFullname = `${author.authors_fullname} `
                                    AuthorsName += AuthorsFullname
                                    authorsListBottom.innerHTML += `<li> ${AuthorsFullname} </li>`

                                })

                                authorsContainerTop.innerText = AuthorsName

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
