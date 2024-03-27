import { EndPoint } from "./constants.js";
import { formatTimestamp } from "./formatDate.js";

const ArticleListContainer = document.getElementById("articleListContainer")

function UpdateArticleList(ArticleLst){
    ArticleListContainer.innerHTML = ""

    if(ArticleLst.length > 0){
        ArticleLst.forEach(article => {
            const ArticleTitle = article.manuscript_full_title
            const RunningTitle = article.manuscript_running_title
            const ArticleId = article.buffer
            const date_uploaded = formatTimestamp(article.date_uploaded)
            const ArticleType = article.article_type
            

            fetch(`${EndPoint}/allAuthors.php?articleID=${ArticleId}`, {
                method : "GET"
            }).then(res => res.json())
            .then(data =>{
                if(data){
                    const AllAuthors = data.authorsList
                    let AuthorsName = ""

                    AllAuthors.forEach(author =>{
                        const AuthorsFullname = `${author.authors_prefix} ${author.authors_firstname} ${author.authors_middlename} ${author.authors_lastname}, `
                        AuthorsName += AuthorsFullname
                    })

                    ArticleListContainer.innerHTML += `
                    <div class="article-container">
                    <div class="article-info1">
                        <h4>${ArticleType}</h4>
                        <a href="" class="article-title"><h2>${ArticleTitle}</h2></a>
                        <p>
                            ${AuthorsName}
                        </p>
                    </div>
                    <div class="article-info2">
                      
                        <h3 class="p-date">PUBLISHED ${date_uploaded}</h3>
                    </div>
                </div>`
                }else{
                    console.log("Server Error")
                }
            })
        });
    }else{
        ArticleListContainer.innerHTML = ""
    }
}


export {
    UpdateArticleList
}