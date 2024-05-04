import { EndPoint } from "./constants.js";
import { formatTimestamp } from "./formatDate.js";

const ArticleListContainer = document.getElementById("articleListContainer")
const ArticleListFront = document.getElementById("article_items_container")

function UpdateTemporaryArticles(ArticleLst) {
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

                        AllAuthors.forEach(author => {
                            const AuthorsFullname = `${author.authors_prefix} ${author.authors_firstname} ${author.authors_middlename} ${author.authors_lastname}, `
                            AuthorsName += AuthorsFullname
                        })
                        if (ArticleListContainer) {

                            ArticleListContainer.innerHTML += `
                    <div class="article-wrapper wow fadeInLeft" data-wow-delay="200ms">
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
                        <p class="article-p-date">PUBLISHED <span>${date_uploaded}</span></p>
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
                                <p class="article-p-date">PUBLISHED <span>${date_uploaded}</span></p>
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
    UpdateTemporaryArticles
}