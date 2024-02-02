import { EndPoint } from "../constants"

function GetArtice(articeID, title){
    fetch(`${EndPoint}/retrieveArtice.php?q=${articeID}&title=${title}`, {
        method : "GET"
    }).then(res => res.json())
    .then(data => {
        if(data.article){
            const Article = data.article
            const ArticleTitle = Article[0].manuscript_full_title
            const ArticleRunningTitle = Article[0].manuscript_running_title
            const ArticleName = Article[0]
        }
    })
}

