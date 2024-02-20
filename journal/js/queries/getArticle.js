import { EndPoint } from "../constants"


let manu_title = document.getElementById("manu-title");

function GetArtice(articeID, title){
    fetch(`${EndPoint}/retrieveArticle.php?q=${articeID}&title=${title}`, {
        method : "GET"
    }).then(res => res.json())
    .then(data => {
        if(data.articleData){
            const Article = data.articleData

            if(Article.length > 0){
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
            const DateUploaded = Article[0].date_uploaded
            const buffer = Article[0].buffer

            var newManuTitle = document.createElement('span');
            newManuTitle.innerHTML = ArticleTitle `
                
            `;
        
            // Append the new author inputs to the container
            manu_title.appendChild(newManuTitle);


        }else{
            alert("File Not found on server")
        }
        }
    })
}

