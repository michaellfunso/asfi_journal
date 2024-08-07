
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
                            
                    <div class="issue-item wow fadeInLeft" data-wow-delay="200ms">
				<div class="doi-access-wrapper"><span class="item-category">${ArticleType}</span></div>
				<a href="./content?sid=${ArticleId}" class="issue-item__title visitable">
					<h3 lang="en" class="issue-item__title issue-item__title__en">${ArticleTitle}</h3></a>
					<div class="loa comma">
					<p class="article-authors" title="${AuthorsName}">${AuthorsName}</p>
					</div>
						<ul class="rlist--inline separator issue-item__details">
							<li><label>First Published:</label><span class="bold"> &nbsp;${date_uploaded}</span></li>
						</ul>
						<div class="content-item-format-links">
							<ul class="rlist--inline separator">
							<li><a href="./content?sid=${ArticleId}&title=${ArticleTitle}#content" title="Abstract" aria-label="Abstract for ${ArticleTitle}">Abstract</a></li>
							<li><a href="./content?sid=${ArticleId}&title=${ArticleTitle}#fulltext" title="Full text" aria-label="Full text for ${ArticleTitle}">Full text</a></li>
							<li><a href="../useruploads/manuscripts/${ArticleFile}" target="_blank" title="ePDF" class="downloadLink" aria-label="PDF for ${ArticleTitle}">PDF</a></li>
							<li><a href="" title="References" aria-label="References for ${ArticleTitle}">References</a></li>
						</ul>
					</div>
			</div>`
                    
                        }

                        if (ArticleListFront) {
                            ArticleListFront.innerHTML += `
                        <div class="issue-item wow fadeInLeft" data-wow-delay="200ms">
				<div class="doi-access-wrapper"><span class="item-category">${ArticleType}</span></div>
				<a href="./content?sid=${ArticleId}" class="issue-item__title visitable">
					<h3 lang="en" class="issue-item__title issue-item__title__en">${ArticleTitle}</h3></a>
					<div class="loa comma">
					<p class="article-authors" title="${AuthorsName}">${AuthorsName}</p>
					</div>
						<ul class="rlist--inline separator issue-item__details">
							<li><label>First Published:</label><span class="bold"> &nbsp;${date_uploaded}</span></li>
						</ul>
						<div class="content-item-format-links">
							<ul class="rlist--inline separator">
							<li><a href="./content?sid=${ArticleId}&title=${ArticleTitle}#content" title="Abstract" aria-label="Abstract for ${ArticleTitle}">Abstract</a></li>
							<li><a href="./content?sid=${ArticleId}&title=${ArticleTitle}#fulltext" title="Full text" aria-label="Full text for ${ArticleTitle}">Full text</a></li>
							<li><a href="../useruploads/manuscripts/${ArticleFile}" target="_blank" title="ePDF" class="downloadLink" aria-label="PDF for ${ArticleTitle}">PDF</a></li>
							<li><a href="" title="References" aria-label="References for ${ArticleTitle}">References</a></li>
						</ul>
					</div>
			</div>`
                        }
                        // const downloadLinks = document.querySelectorAll(".downloadLink");
                        // downloadLinks.forEach(link =>{
                        //     link.setAttribute("href", `../useruploads/manuscripts/${ArticleFile}`)
                        //     link.setAttribute("download", `${ArticleTitle}.pdf`)
                        
                        //     link.addEventListener("click", function(){
                        //         DownloadItem(buffer)
                        //     })
                        // })
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