
import { EndPoint } from "./constants.js";
import { formatTimestamp } from "./formatDate.js";
import { CreateAuthorsOptions, CreateTypeOptions } from "./queries/filter.js";

const ArticleListContainer = document.getElementById("articleListContainer")
const ArticleListFront = document.getElementById("article_items_container")
const SliderListContainer = document.querySelector(".carousel-inner")
const indicators = document.querySelector(".carousel-indicators")

const authorsOptions = document.getElementById("authorsOption")



const authors = await CreateAuthorsOptions()

if(authorsOptions){
authors.forEach(author =>{
    authorsOptions.innerHTML += `<option value="${author}">${author}</option>`    
})
}

function UpdateTemporaryArticles(ArticleLst, currentPage, totalPages) {
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

            const maxLength = 50;

            var limitedText = ArticleTitle;
            
            // if (limitedText.length > maxLength) {
            //     limitedText = limitedText.substring(0, maxLength) + "...";
            // }

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
                            if(i < AllAuthors.length-1){
                                
                                AuthorsName += AuthorNM
                            }else{
                                AuthorsName += `${AllAuthors[i].authors_fullname}.`
                            }
                            
                
                        }

                        // let LimitedAuthorsName = AuthorsName
                        // if(LimitedAuthorsName.length > maxLength){
                        //     LimitedAuthorsName = LimitedAuthorsName.substring(0, maxLength) + "..."
                        // }

                        // var AutthorsNameLimited  = 

                        if (ArticleListContainer) {

                            ArticleListContainer.innerHTML += `
                            
                    <div class="article-wrapper wow fadeInLeft" data-wow-delay="200ms" )>
                    <div class="article-img" style="background-image: url(./useruploads/article_images/${CoverPhoto}); background-repeat: no-repeat; background-size: cover;">
                    </div>
                    <div class="dot-pattern"></div>
                    <div class='content article-content'>
                        <div class="article-content1">
                        <p class="article-type">${ArticleType}</p>
                        <a href="./content?sid=${ArticleId}" title="${ArticleTitle}" class="article-title" style="color: rgba(24, 24, 24, 0.918);">${ArticleTitle}</a>
                        <p class="article-authors" title="${AuthorsName}">${AuthorsName}</p>
                        <p style="color: #310357; font-style:italic;"><a style="color: #310357;"  href="./content?sid=${ArticleId}&title=${ArticleTitle}">Read more</a></p>

                        </div>
                        <div class="article-content2">
                        <p class="article-p-date">PUBLISHED <span>${date_uploaded}</span></p>

                        </div>
                    
                    </div>
                    </div>`
                    
                        }

                        if (ArticleListFront) {
                            ArticleListFront.innerHTML += `
                        <div class="article-wrapper-home wow fadeInLeft" data-wow-delay="200ms" title="${ArticleTitle}">
                            <div class="article-img" style="background-image: url(./useruploads/article_images/${CoverPhoto}); background-repeat: no-repeat; background-size: cover;">
                            </div>
                            <div class="dot-pattern"></div>
                            <div class='content article-content'>
                                <div class="article-content1">
                                <p class="article-type">${ArticleType}</p>
                                <a href="./content?sid=${ArticleId}" title="${ArticleTitle}" class="article-title" style="color: rgba(24, 24, 24, 0.918);">${ArticleTitle}</a>
                                <p class="article-authors" title="${AuthorsName}">${AuthorsName}</p>
                                <p style="color: #310357; font-style:italic;">
                                <a style="color: #310357;" href="./content?sid=${ArticleId}&title=${ArticleTitle}">Read more</a></p>

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


CreateTypeOptions();

export {
    UpdateTemporaryArticles,
}