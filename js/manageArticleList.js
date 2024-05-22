
import { EndPoint } from "./constants.js";
import { formatTimestamp } from "./formatDate.js";

const ArticleListContainer = document.getElementById("articleListContainer")
const ArticleListFront = document.getElementById("article_items_container")
const SliderListContainer = document.querySelector(".carousel-inner")
const indicators = document.querySelector(".carousel-indicators")


function UpdateManageArticles(ArticleLst) {
    if (ArticleListContainer) {
        ArticleListContainer.innerHTML = ""
    }

    if (ArticleListFront) {
        ArticleListFront.innerHTML = ""
    }
    if (ArticleLst.length > 0) {
        ArticleLst.forEach(article => {
            const ArticleTitle = article.manuscript_full_title
            const RunningTitle = article.manuscript_running_title
            const ArticleFile = article.manuscript_file
            const CoverPhoto = article.manuscriptPhoto
            const ArticleId = article.buffer
            const date_uploaded = formatTimestamp(article.date_uploaded)
            const ArticleType = article.article_type


            fetch(`${EndPoint}/allAuthors.php?articleID=${ArticleId}`, {
                method: "GET"
            }).then(res => res.json())
                .then(data => {
                    if (data) {
                        const AllAuthors = data.authorsList
                        let AuthorsName = ""

                        // AllAuthors.forEach(author => {
                        //     const AuthorsFullname = `${author.authors_fullname}, `
                        //     AuthorsName += AuthorsFullname
                        // })
                        for(let i=0; i < AllAuthors.length; i++){
                            let AuthorNM = `${AllAuthors[i].authors_fullname}, `
                            if(i < AllAuthors.length){
                                AuthorsName += AuthorNM
                            }else{
                                AuthorsName +=  `${AllAuthors[i].authors_fullname}.`
                            }
                        }
                        if (ArticleListContainer) {

                            ArticleListContainer.innerHTML += `
                            
                    <div class="article-wrapper wow fadeInLeft" data-wow-delay="200ms" )>
                    <div class="article-img" style="background-image: url(../../useruploads/article_images/${CoverPhoto}); background-repeat: no-repeat; background-size: cover;">
                    </div>
                    <div class="dot-pattern"></div>
                    <div class='content article-content'>
                        <div class="article-content1">
                        <p class="article-type">${ArticleType}</p>
                        <a href="./content?sid=${ArticleId}&title=${ArticleTitle}" class="article-title" style="color: rgba(24, 24, 24, 0.918);">${ArticleTitle}</a>
                        <p class="article-authors">${AuthorsName}</p>
                        </div>
                        <div class="article-content2" style="display:flex; flex-direction:row; align-items:center; justift-content:space-between; width:100%;">
                        <p class="article-p-date" style="width:50%; display:flex; align-items:center;">PUBLISHED: <span style="padding:2px;">${date_uploaded}</span></p>

                        <div style="display:flex; width 50%; justify-content:space-between; bakground:red;">
                        <a href="?edit=${ArticleTitle}&a_id=${ArticleId}" class="btn btn-warning">Edit</a>
                        
                        <form action="../../actions/deleteArticle/" method="POST">
                        <input value="${ArticleId}" name="article_id" type='hidden'/>
                        <button class="btn btn-danger" style="margin-left:10px;">Delete</button>
                        </form>
                        </div>
                        </div>
                    
                    </div>
                    </div>`
                    
                        }

                        if (ArticleListFront) {
                            ArticleListFront.innerHTML += `
                        <div class="article-wrapper-home wow fadeInLeft" data-wow-delay="200ms">
                            <div class="article-img" style="background-image: url(./useruploads/article_images/${CoverPhoto}); background-repeat: no-repeat; background-size: cover;">
                            </div>
                            <div class="dot-pattern"></div>
                            <div class='content article-content'>
                                <div class="article-content1">
                                <p class="article-type">${ArticleType}</p>
                                <a href="./content?sid=${ArticleId}&title=${ArticleTitle}" class="article-title" style="color: rgba(24, 24, 24, 0.918);">${ArticleTitle}</a>
                                <p class="article-authors">${AuthorsName}</p>
                                </div>
                                <div class="article-content2">
                                <p class="article-p-date">PUBLISHED:  <span> ${date_uploaded}</span></p>
                             
                                </div>
                            </div>
                        </div>`
                        }
                    } else {
                        console.log("Server Error")
                    }
                })
        });
    } else {
        if (ArticleListContainer) {

            ArticleListContainer.innerHTML = `     
        <div class="article-wrapper wow fadeInLeft" data-wow-delay="200ms">
            <h4>Nothing to show yet</h4>

        </div>
        `
        }

        if (ArticleListFront) {
            ArticleListFront.innerHTML = `      
        <div class="article-wrapper wow fadeInLeft" data-wow-delay="200ms">
            <h4>Nothing to show yet</h4>

        </div>

        `
        }
    }
}




export {
    UpdateManageArticles,
}